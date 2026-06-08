# Guia de desenvolvimento

Documentação técnica do site **Emocionário**: como rodar, publicar e regenerar os dados a partir do livro.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173/emocionario/](http://localhost:5173/emocionario/) no navegador.

## Build e preview

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

1. Faça push para a branch `main`.
2. Em **Settings → Pages**, selecione **GitHub Actions** como source.
3. O workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) publica automaticamente a pasta `dist/`.

URL esperada: `https://gabrieldep.github.io/emocionario/`

## Estrutura do repositório

| Pasta | Descrição |
|-------|-----------|
| [`data/emocoes.json`](../data/emocoes.json) | Conteúdo das 42 emoções |
| [`img/`](../img/) | Ilustrações (`{id}.jpg`) |
| [`src/`](../src/) | Aplicação frontend (Vite + JavaScript) |
| [`scripts/`](../scripts/) | Geração de dados e extração de imagens do PDF |

## Regenerar dados a partir do PDF

Requer o arquivo `Emocionário.pdf` e as ferramentas `pdftotext` / `pdfimages`:

```bash
python3 scripts/gerar_emocoes.py
python3 scripts/extrair_imagens.py
```

## Licença do código

O código deste repositório está sob [MIT](../LICENSE). Os textos e ilustrações do livro permanecem protegidos por direitos autorais dos autores e artistas originais.
