import "./styles/tokens.css";
import "./styles/layout.css";
import "./styles/components.css";
import { loadEmocoes } from "./data/emocoes.js";
import { initRouter } from "./router.js";

const app = document.getElementById("app");

async function bootstrap() {
  try {
    await loadEmocoes();
    initRouter(app);
  } catch (error) {
    app.innerHTML = `
      <main class="page page--error" id="conteudo">
        <h1>Não foi possível carregar o Emocionário</h1>
        <p>${error.message}</p>
      </main>
    `;
  }
}

bootstrap();
