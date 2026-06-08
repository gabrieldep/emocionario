import {
  getById,
  getProxima,
  getAntagonista,
  imgUrl,
  splitParagraphs,
} from "../data/emocoes.js";
import { qaAccordion } from "../components/qaAccordion.js";
import { emotionNav } from "../components/emotionNav.js";
import { homePath } from "../router.js";
import { renderLayout, renderFooter } from "./layout.js";

export async function renderEmocao(container, { id }) {
  const emocao = getById(id);
  const proxima = getProxima(id);
  const antagonista = getAntagonista(id);

  const main = document.createElement("main");
  main.id = "conteudo";
  main.className = "page page--detail";
  main.tabIndex = -1;

  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "breadcrumb";
  breadcrumb.setAttribute("aria-label", "Trilha de navegação");
  breadcrumb.innerHTML = `
    <ol class="breadcrumb__list">
      <li><a href="${homePath()}">Início</a></li>
      <li aria-current="page">${emocao.nome}</li>
    </ol>
  `;

  const hero = document.createElement("figure");
  hero.className = "detail-hero";

  const img = document.createElement("img");
  img.className = "detail-hero__img";
  img.src = imgUrl(emocao.id);
  img.alt = `Ilustração de ${emocao.nome}`;
  img.loading="eager";
  img.decoding = "async";

  const caption = document.createElement("figcaption");
  caption.className = "detail-hero__caption";
  caption.textContent = `Ilustração: ${emocao.ilustrador}`;

  hero.append(img, caption);

  const header = document.createElement("header");
  header.className = "detail-header";

  const title = document.createElement("h1");
  title.className = "detail-header__title";
  title.textContent = emocao.nome;

  header.append(title);

  const definition = document.createElement("section");
  definition.className = "detail-definition";
  definition.setAttribute("aria-labelledby", "def-heading");

  const defHeading = document.createElement("h2");
  defHeading.id = "def-heading";
  defHeading.className = "visually-hidden";
  defHeading.textContent = "Definição";

  definition.append(defHeading);
  splitParagraphs(emocao.definicao).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    definition.append(p);
  });

  main.append(
    breadcrumb,
    hero,
    header,
    definition,
    qaAccordion(emocao.perguntas_reflexivas),
    emotionNav({ proxima, antagonista })
  );

  container.append(
    renderLayout({ active: "home", title: emocao.nome }),
    main,
    renderFooter()
  );
}
