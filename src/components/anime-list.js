import { AnimeCard } from './anime-card.js';

export class AnimeList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.animes = [];
    }

    connectedCallback() {
        this.render();
    }

    setInitialAnimes(animes) {
        this.animes = animes;
        this.render();
    }

    async searchAnime(query) {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=12`);
            const data = await response.json();
            this.animes = data.data;
            this.render();
        } catch (error) {
            console.error('Error:', error);
            this.shadowRoot.innerHTML = `<p>Error al buscar animes</p>`;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                }
                .container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 20px;
                    padding: 10px;
                }
            </style>
            <div class="container">
                ${this.animes.length > 0 
                    ? this.animes.map(anime => `
                        <anime-card></anime-card>
                    `).join('')
                    : '<p>No hay animes para mostrar</p>'
                }
            </div>
        `;

        this.shadowRoot.querySelectorAll('anime-card').forEach((card, index) => {
            card.anime = this.animes[index];
            card.addEventListener('click', () => this.showDetail(this.animes[index]));
        });
    }

    showDetail(anime) {
        const detail = document.createElement('anime-detail');
        detail.anime = anime;
        
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(detail);
        
        detail.addEventListener('back-to-list', () => {
            this.render();
        });
    }
}