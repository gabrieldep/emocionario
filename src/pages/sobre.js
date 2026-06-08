import { homePath } from "../router.js";
import { renderLayout, renderFooter } from "./layout.js";

export async function renderSobre(container) {
  const main = document.createElement("main");
  main.id = "conteudo";
  main.className = "page page--sobre";
  main.tabIndex = -1;

  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "breadcrumb";
  breadcrumb.setAttribute("aria-label", "Trilha de navegação");
  breadcrumb.innerHTML = `
    <ol class="breadcrumb__list">
      <li><a href="${homePath()}">Início</a></li>
      <li aria-current="page">Sobre o livro</li>
    </ol>
  `;

  main.innerHTML = `
    <article class="sobre-article">
      <header class="sobre-article__header">
        <h1 class="sobre-article__title">Sobre o livro</h1>
        <p class="sobre-article__intro">
          Textos introdutórios do <cite>Emocionário</cite>, reproduzidos fielmente da edição Sextante (2018).
        </p>
      </header>

      <section class="sobre-section" aria-labelledby="proposta-heading">
        <h2 id="proposta-heading" class="sobre-section__title">Proposta de leitura</h2>
        <p>
          A jornada emocional que propomos a seguir tenta se aproximar ao máximo da ordem natural em que
          ocorrem os sentimentos. No entanto, você pode começar pela emoção que mais lhe agrada e depois ir
          para a página que quiser.
        </p>
      </section>

      <section class="sobre-section" aria-labelledby="prefacio-heading">
        <h2 id="prefacio-heading" class="sobre-section__title">Prefácio</h2>
        <p class="sobre-section__author">
          Rosa Collado Carrascosa<br />
          <span class="sobre-section__role">psicóloga e psicoterapeuta</span>
        </p>
        <p>Um dicionário de emoções… Que ideia fantástica para ajudar as pessoas a conhecerem o que se passa em seu interior!</p>
        <p>
          Este livro oferece até ao mais jovem leitor a oportunidade de reconhecer as próprias emoções e falar
          sobre seus sentimentos. Isso lhe dará a chance de canalizar de maneira adequada tudo o que sente e
          experimentar a vida em todo o seu potencial.
        </p>
        <p>
          EMOCIONÁRIO pode ser um material fundamental de apoio pedagógico. Ele permite aprimorar a inteligência
          emocional da criança, que é a chave da autoaceitação e do desenvolvimento psicoevolutivo saudável.
        </p>
        <p>
          Descobrir, identificar e diferenciar as emoções é uma forma de educar os pequenos para que
          experimentem seus sentimentos sem medo, descubram a si mesmos e se tornem adultos autoconscientes,
          com a sensibilidade e a sabedoria necessárias para enfrentar os desafios da vida.
        </p>
        <p>
          Sentir é um privilégio do ser humano, e aprender a expressar nossas emoções nos ajuda a estar mais
          perto das pessoas que amamos.
        </p>
      </section>

      <section class="sobre-section" aria-labelledby="definicoes-heading">
        <h2 id="definicoes-heading" class="sobre-section__title">Emoções e sentimentos</h2>
        <dl class="sobre-definicoes">
          <div class="sobre-definicoes__item">
            <dt>Emoções</dt>
            <dd>
              são estados afetivos inatos e automáticos que afetam nosso corpo, nossa mente e nosso
              comportamento. O propósito das emoções é nos ajudar a lidar com o que acontece à nossa volta.
            </dd>
          </div>
          <div class="sobre-definicoes__item">
            <dt>Sentimentos</dt>
            <dd>
              são a tomada de consciência dessas emoções. Eles servem para expressar nosso estado emocional de
              maneira mais racional para os outros e para nós mesmos.
            </dd>
          </div>
        </dl>
        <p class="sobre-section__note">* Informação para os adultos.</p>
      </section>

      <p class="sobre-article__cta">
        <a class="sobre-article__link" href="${homePath()}">Explorar as 42 emoções</a>
      </p>
    </article>
  `;

  container.append(renderLayout({ active: "sobre" }), main, renderFooter());
}
