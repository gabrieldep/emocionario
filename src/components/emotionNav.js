import { emocaoPath, homePath } from "../router.js";

export function emotionNav({ proxima, antagonista }) {
  const nav = document.createElement("nav");
  nav.className = "emotion-nav";
  nav.setAttribute("aria-label", "Navegação entre emoções");

  const links = document.createElement("div");
  links.className = "emotion-nav__links";

  if (proxima) {
    const next = document.createElement("a");
    next.className = "emotion-nav__link emotion-nav__link--next";
    next.href = emocaoPath(proxima.id);
    next.innerHTML = `<span class="emotion-nav__label">Próxima emoção</span><span class="emotion-nav__name">${proxima.nome}</span>`;
    links.append(next);
  }

  if (antagonista) {
    const opp = document.createElement("a");
    opp.className = "emotion-nav__link emotion-nav__link--opposite";
    opp.href = emocaoPath(antagonista.id);
    opp.innerHTML = `<span class="emotion-nav__label">Emoção oposta</span><span class="emotion-nav__name">${antagonista.nome}</span>`;
    links.append(opp);
  }

  const all = document.createElement("a");
  all.className = "emotion-nav__link emotion-nav__link--all";
  all.href = homePath();
  all.innerHTML = `<span class="emotion-nav__label">Explorar</span><span class="emotion-nav__name">Ver todas as emoções</span>`;

  links.append(all);
  nav.append(links);
  return nav;
}
