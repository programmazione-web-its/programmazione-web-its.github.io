const fs = require('fs')
const path = require('path')
const express = require('express')
const puppeteer = require('puppeteer')
const { PDFDocument } = require('pdf-lib')

const inputDir = './_site/lezioni'
const outputDir = './pdf/lezioni'
const mergedPdfPath = './pdf/lezioni-completo.pdf'
const customCssPath = './pdf-style.css'

;(async () => {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  // 🔹 Avvia un piccolo server che serve la cartella _site
  const app = express()
  app.use(express.static('_site'))
  const server = app.listen(4000, () =>
    console.log('🌍 Server attivo su http://localhost:4000')
  )

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  async function convertDir(dir) {
    const files = fs.readdirSync(dir)
    const pdfFiles = []

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        const nestedPdfs = await convertDir(filePath)
        pdfFiles.push(...nestedPdfs)
      } else if (file.endsWith('.html')) {
        const relPath = path.relative(inputDir, filePath)
        const htmlUrl = `http://localhost:4000/lezioni/${relPath.replace(
          /\\/g,
          '/'
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
    }

    return pdfFiles
  }

  const allPdfFiles = await convertDir(inputDir)
  await browser.close()
  server.close() // 🔹 Chiude il server Express

  // 🔹 UNISCE TUTTI I PDF IN UNO SOLO
  console.log('📚 Creo PDF unificato...')

  const mergedPdf = await PDFDocument.create()
  for (const pdfFile of allPdfFiles) {
    const pdfBytes = fs.readFileSync(pdfFile)
    const pdf = await PDFDocument.load(pdfBytes)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  const mergedPdfBytes = await mergedPdf.save()
  fs.writeFileSync(mergedPdfPath, mergedPdfBytes)

  console.log(`🎉 Tutto pronto! File finale: ${mergedPdfPath}`)
})()
