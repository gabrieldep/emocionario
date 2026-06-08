# Emocionário

Site psicoeducativo para explorar 36 emoções com base no livro *Emocionário* (Cristina Núñez Pereira e Rafael R. Valcárcel). Conteúdo estático em Vite + JavaScript vanilla, publicado no GitHub Pages.

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
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica automaticamente a pasta `dist/`.

URL esperada: `https://<usuario>.github.io/emocionario/`

## Estrutura

| Pasta | Descrição |
|-------|-----------|
| [`data/emocoes.json`](data/emocoes.json) | Conteúdo das 36 emoções |
| [`img/`](img/) | Ilustrações (`{id}.jpg`) |
| [`src/`](src/) | Aplicação frontend |
| [`scripts/`](scripts/) | Geração de dados e extração de imagens do PDF |

## Regenerar dados a partir do PDF

```bash
python3 scripts/gerar_emocoes.py
python3 scripts/extrair_imagens.py
```

## Licença

Código sob MIT — ver [LICENSE](LICENSE). Textos e ilustrações do livro permanecem protegidos por direitos autorais dos autores e artistas originais.
