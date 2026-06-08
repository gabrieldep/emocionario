import { homePath, sobrePath } from "../router.js";

export function renderLayout({ active = "home" }) {
  const header = document.createElement("header");
  header.className = "site-header";

  const inner = document.createElement("div");
  inner.className = "site-header__inner";

  const brand = document.createElement("a");
  brand.className = "site-header__brand";
  brand.href = homePath();
  brand.innerHTML = `
    <span class="site-header__logo" aria-hidden="true">◐</span>
    <span class="site-header__text">
      <span class="site-header__title">Emocionário</span>
      <span class="site-header__subtitle">Aprender sobre emoções</span>
    </span>
  `;

  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Navegação principal");

  const emocoesLink = document.createElement("a");
  emocoesLink.href = homePath();
  emocoesLink.className = "site-nav__link";
  emocoesLink.textContent = "Emoções";
  if (active === "home") {
    emocoesLink.setAttribute("aria-current", "page");
  }

  const sobreLink = document.createElement("a");
  sobreLink.href = sobrePath();
  sobreLink.className = "site-nav__link";
  sobreLink.textContent = "Sobre o livro";
  if (active === "sobre") {
    sobreLink.setAttribute("aria-current", "page");
  }

  nav.append(emocoesLink, sobreLink);
  inner.append(brand, nav);
  header.append(inner);
  return header;
}

export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";

  footer.innerHTML = `
    <div class="site-footer__inner">
      <p>
        Textos baseados em <cite>Emocionário</cite>, de Cristina Núñez Pereira e Rafael R. Valcárcel
        (Sextante, 2018). Ilustrações © artistas indicados no sumário do livro.
      </p>
      <p class="site-footer__note">
        Site psicoeducativo de uso pessoal e educacional. Conteúdo e imagens protegidos por direitos autorais.
      </p>
    </div>
  `;

  return footer;
}
