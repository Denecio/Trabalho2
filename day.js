class Day extends HTMLElement {
	static get observedAttributes() { return ['title','text','price','color'] }
	constructor() {
		super()
        this.color = this.getAttribute('color') || 'white'
		this.cardTitle = document.createElement('h3')
        this.text = document.createElement('ul')
        this.price = document.createElement('p')
        let button = document.createElement('button')
        button.textContent = 'Selecionar Pack'

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
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem
            }
            
            h3 {
                font-size: 1.5rem;
                color: #${this.color};
            }

            li:before {
                content: '/';
                margin-right: 0.5rem;
                color: #${this.color};
            }

            button {
                background-color: transparent;
                color: white;
                padding: 0.5rem 1rem;
                border: 1px solid #${this.color};
                border-radius: 0.5rem;
                cursor: pointer;
                transition: 0.3s
            }

            button:hover {
                background-color: #${this.color};
                color: black
            }
            `

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(this.cardTitle)
        this.shadowRoot.appendChild(this.text)
        this.shadowRoot.appendChild(this.price)
        this.shadowRoot.appendChild(style)
        this.shadowRoot.appendChild(button)
	}

	attributeChangedCallback(attr, _, value) {
		if (attr == 'title')
			this.cardTitle.textContent = value
        else if (attr == 'text'){
            this.text.innerHTML = ''
            value.split(',').forEach(item => {
                let li = document.createElement('li')
                li.textContent = item
                this.text.appendChild(li)
            })
        } else if (attr == 'price')
            this.price.textContent = `${value}€`
        else if (attr == 'color')
            this.color = value;

	}
}

customElements.define('day-card', Day)