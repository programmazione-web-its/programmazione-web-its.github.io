const fs = require('fs')
const path = require('path')
const express = require('express')
const puppeteer = require('puppeteer')
const { PDFDocument } = require('pdf-lib')

const inputDir = './_site/lezioni'
const outputDir = './pdf/lezioni'
const mergedPdfPath = './pdf/lezioni-completo.pdf'
const customCssPath = './pdf-style.css'

/* -----------------------------------------------------
   🔧 CONFIGURAZIONE RANGE PAGINE
   Imposta qui da quale pagina iniziare e finire.
   Le pagine sono 1-based (es: 1 = prima pagina).
----------------------------------------------------- */
const RANGE_START = 1 // Cambia qui (es: 5)
const RANGE_END = 999 // Cambia qui (es: 20) - oppure molto grande se vuoi "fino alla fine"
/* ----------------------------------------------------- */

;(async () => {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  const app = express()
  app.use(express.static('_site'))
  const server = app.listen(4000, () =>
    console.log('🌍 Server attivo su http://localhost:4000'),
  )

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  async function convertDir(dir, startIndex = 0, endIndex = Infinity) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'))
    const pdfFiles = []

    for (let i = startIndex; i < files.length && i <= endIndex; i++) {
      const file = files[i]
      const filePath = path.join(dir, file)
      const relPath = path.relative(inputDir, filePath)
      const htmlUrl = `http://localhost:4000/lezioni/${relPath.replace(
        /\\/g,
        '/',
      )}`
      const pdfPath = path.join(outputDir, relPath.replace(/\.html$/, '.pdf'))
      const pdfDir = path.dirname(pdfPath)
      fs.mkdirSync(pdfDir, { recursive: true })

      console.log(`📄 Converto: ${htmlUrl}...`)
      await page.goto(htmlUrl, { waitUntil: 'networkidle0' })

      // Inietta CSS aggiuntivo per la stampa
      if (fs.existsSync(customCssPath)) {
        const cssContent = fs.readFileSync(customCssPath, 'utf8')
        await page.addStyleTag({ content: cssContent })
      }

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      })

      console.log(`✅ Salvato: ${pdfPath}`)
      pdfFiles.push(pdfPath)
    }

    return pdfFiles
  }

  // Converti solo i file dall'indice 0 all'indice 8 (inclusi):
  const allPdfFiles = await convertDir(inputDir, 0, 8) // 0-based, 0 = primo file, 8 = file 9

  await browser.close()
  server.close()

  /* -----------------------------------------------------
     📚 UNISCE I PDF CON RANGE DI PAGINE
  ----------------------------------------------------- */

  console.log('📚 Creo PDF unificato SOLO per il range selezionato...')

  const mergedPdf = await PDFDocument.create()
  let globalPageIndex = 0

  for (const pdfFile of allPdfFiles) {
    const pdfBytes = fs.readFileSync(pdfFile)
    const pdf = await PDFDocument.load(pdfBytes)

    const totalPages = pdf.getPageCount()

    for (let i = 0; i < totalPages; i++) {
      const pageNumber = globalPageIndex + 1 // pagina reale (1-based)

      if (pageNumber >= RANGE_START && pageNumber <= RANGE_END) {
        const [copiedPage] = await mergedPdf.copyPages(pdf, [i])
        mergedPdf.addPage(copiedPage)
      }

      globalPageIndex++
    }
  }

  const mergedPdfBytes = await mergedPdf.save()
  fs.writeFileSync(mergedPdfPath, mergedPdfBytes)

  console.log(
    `🎉 PDF finale generato con pagine da ${RANGE_START} a ${RANGE_END}: ${mergedPdfPath}`,
  )
})()
