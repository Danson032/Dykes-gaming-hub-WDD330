docimport { getTrendingGames, searchGames } from "./api.js";

const gamesContainer = document.querySelector("#gamesContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

displayTrendingGames();

async function displayTrendingGames() {

    const games = await getTrendingGames();

    renderGames(games);
}

searchBtn.addEventListener("click", async () => {

    const searchValue = searchInput.value.trim();

    if (!searchValue) return;

    const games = await searchGames(searchValue);

    renderGames(games);
});

function renderGames(games) {

    gamesContainer.innerHTML = "";

    games.forEach(game => {

        const card = document.createElement("div");

        card.classList.add("game-card");

        card.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">

            <div class="game-info">
                <h3>${game.name}</h3>

                <p>⭐ Rating: ${game.rating}</p>

                <p>📅 Released: ${game.released}</p>
            </div>
        `;

        gamesContainer.appendChild(card);
    });
}
