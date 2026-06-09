import { getTrendingGames, searchGames } from "./api.js";

// Navigation
const menuBtn = document.querySelector("#menuBtn");
const menuIcon = document.querySelector("#menuIcon");
const navList = document.querySelector("#navList");

// Create Menu text dynamically
const menuText = document.createElement("span");
menuText.id = "menuText";
menuText.textContent = "Menu";
menuBtn.appendChild(menuText);

// Hide navigation on page load
navList.classList.add("hide");

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("hide");

  if (navList.classList.contains("hide")) {
    menuIcon.textContent = "☰";
    menuText.textContent = "Menu";
    menuBtn.setAttribute("aria-label", "Open navigation menu");
  } else {
    menuIcon.textContent = "✕";
    menuText.textContent = "Close";
    menuBtn.setAttribute("aria-label", "Close navigation menu");
  }
});

// Game functionality
const gamesContainer = document.querySelector("#gamesContainer");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

// Load trending games when page opens
displayTrendingGames();

async function displayTrendingGames() {
  const games = await getTrendingGames();
  renderGames(games);
}

// Search button
searchBtn.addEventListener("click", async () => {
  const searchValue = searchInput.value.trim();

  if (!searchValue) return;

  const games = await searchGames(searchValue);
  renderGames(games);
});

// Optional: Search when Enter key is pressed
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const searchValue = searchInput.value.trim();

    if (!searchValue) return;

    const games = await searchGames(searchValue);
    renderGames(games);
  }
});

function renderGames(games) {
  gamesContainer.innerHTML = "";

  games.forEach((game) => {
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
