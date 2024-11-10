class Slot extends HTMLElement {
	static get observedAttributes() { return ['title','description','start','finish','color'] }
	constructor() {
		super()
        this.color = this.getAttribute('color') || 'white'
		this.cardTitle = document.createElement('h3')
        this.description = document.createElement('p')
        let div = document.createElement('div')
        this.start = document.createElement('h4')
        this.finish = document.createElement('h4')

        div.appendChild(this.start)
        let span = document.createElement('span')
        span.textContent = '–'
        div.appendChild(span)
        div.appendChild(this.finish)

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
                gap: 1rem;
                background-color: #${this.color};
                border-radius: 0.5rem;
                width: 100%;
                min-width: 50%;
                color: black;
            }
            
            h3 {
                font-size: 1.5rem;
                font-family: 'GaboDrive';
            }

            h4 {
                font-size: 1rem;
                font-family: 'GaboDrive';
            }

            div {
                display: flex;
                gap: 0.5rem;
            }
            `

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(this.cardTitle)
        this.shadowRoot.appendChild(this.description)
        this.shadowRoot.appendChild(div)
        this.shadowRoot.appendChild(style)
	}

	attributeChangedCallback(attr, _, value) {
		if (attr == 'title')
			this.cardTitle.textContent = value
        else if (attr == 'description')
            this.description.textContent = value
        else if (attr == 'start')
            this.start.textContent = value
        else if (attr == 'finish')
            this.finish.textContent = value
        else if (attr == 'color')
            this.color = value;

	}
}

customElements.define('slot-card', Slot)