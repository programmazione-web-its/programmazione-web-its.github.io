const quiz1 = document.getElementById('quiz01')
if (quiz1) {
  const radios = quiz1.querySelectorAll('input')
  const result = quiz1.querySelector('.result')

  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (radio.value === 'c') {
        result.textContent = '✅ Corretto!🎉 '
        result.style.color = 'green'
      } else {
        result.textContent = '❌ Sbagliato! Riprova.'
        result.style.color = 'red'
      }
    })
  })
}
