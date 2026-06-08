import { splitParagraphs } from "../data/emocoes.js";

export function qaAccordion(perguntas) {
  const section = document.createElement("section");
  section.className = "qa-section";
  section.setAttribute("aria-labelledby", "qa-heading");

  const heading = document.createElement("h2");
  heading.id = "qa-heading";
  heading.className = "qa-section__heading";
  heading.textContent = "Perguntas reflexivas";

  const list = document.createElement("div");
  list.className = "qa-section__list";

  perguntas.forEach((item, index) => {
    const details = document.createElement("details");
    details.className = "qa-item";

    const summary = document.createElement("summary");
    summary.className = "qa-item__question";
    summary.textContent = item.pergunta;

    const answer = document.createElement("div");
    answer.className = "qa-item__answer";

    splitParagraphs(item.resposta).forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      answer.append(p);
    });

    details.append(summary, answer);
    details.id = `qa-${index}`;
    list.append(details);
  });

  section.append(heading, list);
  return section;
}
