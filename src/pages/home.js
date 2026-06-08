import { getAll } from "../data/emocoes.js";
import { emotionCard } from "../components/emotionCard.js";
import { renderLayout, renderFooter } from "./layout.js";

export async function renderHome(container) {
  const emocoes = getAll();

  const main = document.createElement("main");
  main.id = "conteudo";
  main.className = "page page--home";
  main.tabIndex = -1;

  const intro = document.createElement("div");
  intro.className = "home-intro";
  intro.innerHTML = `
    <p class="home-intro__lead">
      Um dicionário de emoções para reconhecer o que sentimos, nomear sentimentos
      e explorar conexões entre eles — com base no livro <cite>Emocionário</cite>.
    </p>
  `;

  const searchWrap = document.createElement("div");
  searchWrap.className = "search-wrap";

  const searchLabel = document.createElement("label");
  searchLabel.className = "search-wrap__label";
  searchLabel.setAttribute("for", "busca-emocoes");
  searchLabel.textContent = "Buscar emoção";

  const search = document.createElement("input");
  search.type = "search";
  search.id = "busca-emocoes";
  search.className = "search-wrap__input";
  search.placeholder = "Ex.: tristeza, alegria, medo…";
  search.autocomplete = "off";

  const count = document.createElement("p");
  count.className = "search-wrap__count";
  count.setAttribute("aria-live", "polite");

  searchWrap.append(searchLabel, search, count);

  const grid = document.createElement("div");
  grid.className = "emotion-grid";

  function updateGrid(filter = "") {
    const term = filter.trim().toLowerCase();
    grid.innerHTML = "";

    const filtered = emocoes.filter(
      (e) =>
        e.nome.toLowerCase().includes(term) ||
        e.id.includes(term.replace(/\s+/g, ""))
    );

    filtered.forEach((emocao) => grid.append(emotionCard(emocao)));

    count.textContent =
      filtered.length === emocoes.length
        ? `${emocoes.length} emoções`
        : `${filtered.length} de ${emocoes.length} emoções`;
  }

  search.addEventListener("input", () => updateGrid(search.value));
  updateGrid();

  main.append(intro, searchWrap, grid);

  container.append(renderLayout({ active: "home", title: "Emocionário" }), main, renderFooter());
}
