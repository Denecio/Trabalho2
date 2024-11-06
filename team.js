class Pelouro extends HTMLElement {
	static get observedAttributes() { return ['title','text','img'] }
	constructor() {
		super()
        this.color = this.getAttribute('color') || 'white'
        this.div = document.createElement('div')
		this.cardTitle = document.createElement('h3')
        this.text = document.createElement('p')
        this.img = document.createElement('img')

        this.div.appendChild(this.cardTitle)
        this.div.appendChild(this.text)

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
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }

            :host:nth-child(even) {
                flex-direction: row-reverse;
            }

            div {
                display: flex;
                flex-direction: column;
                gap: 0.5rem
            }
            
            h3 {
                font-size: 1.5rem;
                color: #${this.color};
            }

            li:before {
                content: '/';
                margin-right: 0.5rem;
                color: #${this.color};
            }`

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(this.div)
        this.shadowRoot.appendChild(this.img)
        this.shadowRoot.appendChild(style)
	}

	attributeChangedCallback(attr, _, value) {
		if (attr == 'title')
			this.cardTitle.textContent = value
        else if (attr == 'text')
            this.text.textContent = value
        else if (attr == 'color')
            this.color = value;
        else if (attr == 'img')
            this.img.src = value;

	}
}

customElements.define('team-card', Pelouro)