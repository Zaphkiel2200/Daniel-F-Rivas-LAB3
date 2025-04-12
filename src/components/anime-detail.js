export class AnimeDetail extends HTMLElement {
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
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .back-button {
                    background: #333;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom: 20px;
                }
                .detail-container {
                    display: flex;
                    gap: 20px;
                }
                .poster {
                    flex: 1;
                }
                .poster img {
                    width: 100%;
                    border-radius: 15px;
                }
                .info {
                    flex: 2;
                }
                .title {
                    font-size: 26px;
                    margin: 0 0 10px 0;
                }
                .meta {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                }
                .meta span {
                    background: #eee;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 14px;
                }
            </style>
            <button class="back-button">← Volver</button>
            <div class="detail-container">
                <div class="poster">
                    <img src="${this._anime.images?.jpg?.large_image_url}" alt="${this._anime.title}">
                </div>
                <div class="info">
                    <h1 class="title">${this._anime.title}</h1>
                    <div class="meta">
                        <span>⭐ ${this._anime.score || 'N/A'}</span>
                        <span>📺 ${this._anime.episodes || '?'} eps</span>
                        <span>${this._anime.status || ''}</span>
                        <span>${this._anime.rating || ''}</span>
                    </div>
                    <p>${this._anime.synopsis || 'Sin sinopsis disponible.'}</p>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.back-button').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('back-to-list', { bubbles: true, composed: true }));
        });
    }
}