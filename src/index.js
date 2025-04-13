import { AnimeCard } from './components/anime-card.js';
import { AnimeList } from './components/anime-list.js';
import { AnimeDetail } from './components/anime-detail.js';

customElements.define('anime-card', AnimeCard);
customElements.define('anime-list', AnimeList);
customElements.define('anime-detail', AnimeDetail);

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        document.querySelector('anime-list').searchAnime(query);
    }
});

async function loadRandomAnimes() {
    try {
        const animes = [];
        for (let i = 0; i < 10; i++) {
            const response = await fetch('https://api.jikan.moe/v4/random/anime');
            const data = await response.json();
            animes.push(data.data);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        document.querySelector('anime-list').setInitialAnimes(animes);
    } catch (error) {
        console.error('Error al cargar animes random:', error);
    }
}

loadRandomAnimes();