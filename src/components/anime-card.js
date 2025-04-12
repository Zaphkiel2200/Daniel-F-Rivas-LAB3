export class AnimeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set anime(data) {
        this._anime = data;
        this.render();
    }

    render() {
        if (!this._anime) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 180px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                :host(:hover) {
                    transform: scale(1.05);
                }
                img {
                    width: 100%;
                    border-radius: 8px;
                    height: 250px;
                    object-fit: cover;
                }
                .title {
                    margin-top: 8px;
                    font-size: 14px;
                    text-align: center;
                    font-weight: bold;
                }
            </style>
            <div class="card">
                <img src="${this._anime.images?.jpg?.image_url}" 
                     alt="${this._anime.title}">
                <div class="title">${this._anime.title}</div>
            </div>
        `;
    }
}