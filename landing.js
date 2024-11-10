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
class Day extends HTMLElement {
	static get observedAttributes() { return ['day','text','color'] }
	constructor() {
		super()
        this.color = this.getAttribute('color') || 'white'

        let header = document.createElement('div')
        let h4 = document.createElement('h4')
		this.day = document.createElement('h1')

        h4.textContent = 'ABRIL'
        header.appendChild(this.day)
        header.appendChild(h4)

        this.text = document.createElement('ul')

		let style = document.createElement('style')
        style.textContent = `
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                list-style: none;
                text-decoration: none
            }

            :host {
                display: flex;
                align-items: center;
                gap: 8rem;
                width: 100%;
                font-family: 'GaboDrive', sans-serif;
                font-size: 2rem;
            }

            div {
                color: #${this.color};
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                line-height: 5rem; 
            }

            h1 {
                font-size: 6rem;
            }
            
            h4 {
                font-size: 4rem;
            }

            ul{
                display: grid;
                grid-template-columns: repeat(2,1fr);
                grid-template-rows: repeat(2,1fr);
                gap: 2rem;
                align-items: start;   
                width: 100%; 
            }

            li{
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            li:before {
                content: '/';
                margin-right: 0.5rem;
                color: #${this.color};
            }

            @media screen and (max-width: 1000px){
                :host{
                    gap: 4rem;
                }
            }

            @media screen and (max-width: 768px){
                :host{
                    flex-direction: column;
                    gap: 4rem;
                }

                ul{
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(4,1fr);
                }
            }
            `

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(header)
        this.shadowRoot.appendChild(this.text)
        this.shadowRoot.appendChild(style)
	}

	attributeChangedCallback(attr, _, value) {
		if (attr == 'day')
			this.day.textContent = value
        else if (attr == 'text'){
            this.text.innerHTML = ''
            value.split(',').forEach(item => {
                let li = document.createElement('li')
                li.textContent = item
                this.text.appendChild(li)
            })
        } else if (attr == 'color')
            this.color = value;

	}
}

customElements.define('day-card', Day)