async function getTeam() {
    let response = await fetch('https://picsum.photos/v2/list')
    let data = await response.json()
    return data
}

async function renderTeam() {
    let teams = await getTeam()
    let cards = document.querySelectorAll('team-card')
    cards.forEach((card, i) => {
        let img = document.createElement('img')
        img.src = teams[i].download_url
        if(window.innerWidth < 768) 
            img.style.width = '150px'
        else
            img.style.width = '400px'
        img.style.height = 'auto'
        card.shadowRoot.appendChild(img)
    })
}

renderTeam()

class Pelouro extends HTMLElement {
	static get observedAttributes() { return ['title','text','color'] }
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

	}
}

customElements.define('team-card', Pelouro)