import { renderHome } from "./pages/home.js";
import { renderEmocao } from "./pages/emocao.js";
import { getById } from "./data/emocoes.js";

const routes = {
  home: renderHome,
  emocao: renderEmocao,
};

function parseHash() {
  const hash = window.location.hash.slice(1) || "/";
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { name: "home", params: {} };
  }

  if (parts[0] === "emocao" && parts[1]) {
    return { name: "emocao", params: { id: parts[1] } };
  }

  return { name: "home", params: {} };
}

export function navigateTo(path) {
  window.location.hash = path;
}

export function emocaoPath(id) {
  return `#/emocao/${id}`;
}

export function homePath() {
  return "#/";
}

export function initRouter(app) {
  let isInitialLoad = true;

  async function handleRoute() {
    const route = parseHash();
    const render = routes[route.name];

    if (route.name === "emocao" && !getById(route.params.id)) {
      navigateTo("/");
      return;
    }

    app.innerHTML = "";
    await render(app, route.params);
    document.title =
      route.name === "emocao"
        ? `${getById(route.params.id).nome} — Emocionário`
        : "Emocionário";

    const conteudo = app.querySelector("#conteudo");
    if (conteudo && !isInitialLoad) {
      conteudo.focus({ preventScroll: true });
    }
    isInitialLoad = false;
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();

  return handleRoute;
}
