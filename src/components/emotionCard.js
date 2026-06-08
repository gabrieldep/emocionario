import { imgUrl } from "../data/emocoes.js";
import { emocaoPath } from "../router.js";

export function emotionCard(emocao) {
  const article = document.createElement("article");
  article.className = "emotion-card";

  const link = document.createElement("a");
  link.className = "emotion-card__link";
  link.href = emocaoPath(emocao.id);
  link.setAttribute("aria-label", `Ler sobre ${emocao.nome}`);

  const img = document.createElement("img");
  img.className = "emotion-card__img";
  img.src = imgUrl(emocao.id);
  img.alt = `Ilustração representando ${emocao.nome}`;
  img.loading = "lazy";
  img.decoding = "async";

  const body = document.createElement("div");
  body.className = "emotion-card__body";

  const title = document.createElement("h2");
  title.className = "emotion-card__title";
  title.textContent = emocao.nome;

  const credit = document.createElement("p");
  credit.className = "emotion-card__credit";
  credit.textContent = emocao.ilustrador;

  body.append(title, credit);
  link.append(img, body);
  article.append(link);

  return article;
}
