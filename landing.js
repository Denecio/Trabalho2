let button = document.querySelector('.about_button')
let text = document.querySelectorAll('.about_text > p')

button.addEventListener('click', () => {
    //add hiddent to half of the text
    text.forEach((p, index) => {
        if (index >= text.length / 2) {
            p.classList.toggle('hidden')
        }
    })
    button.textContent = button.textContent === 'Ler Mais' ? 'Ler Menos' : 'Ler Mais'
})