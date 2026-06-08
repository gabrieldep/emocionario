#!/usr/bin/env python3
"""Extrai ilustrações do PDF do Emocionário para img/{id}.jpg."""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

PDF = Path("/home/gabriel/Documents/Emocionário.pdf")
ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "img"
EMOCOES_JSON = ROOT / "data" / "emocoes.json"

# Página do PDF onde começa o texto de cada emoção (mapeamento manual).
PAGINA_TEXTO: dict[str, int] = {
    "ternura": 15,
    "amor": 16,
    "odio": 17,
    "raiva": 18,
    "irritacao": 20,
    "tensao": 21,
    "alivio": 23,
    "serenidade": 24,
    "felicidade": 25,
    "alegria": 26,
    "tristeza": 27,
    "compaixao": 28,
    "remorso": 29,
    "culpa": 30,
    "vergonha": 32,
    "inseguranca": 33,
    "timidez": 34,
    "confusao": 35,
    "medo": 36,
    "perplexidade": 37,
    "aversao": 38,
    "hostilidade": 40,
    "aceitacao": 41,
    "incompreensao": 42,
    "desamparo": 43,
    "solidao": 44,
    "saudade": 45,
    "melancolia": 46,
    "tedio": 47,
    "expectativa": 48,
    "entusiasmo": 49,
    "euforia": 50,
    "desalento": 51,
    "decepcao": 52,
    "frustracao": 54,
    "admiracao": 55,
    "inveja": 57,
    "desejo": 58,
    "satisfacao": 59,
    "orgulho": 60,
    "prazer": 61,
    "gratidao": 62,
}

MIN_WIDTH = 900


def paginas_com_imagens_grandes() -> dict[int, list[tuple[int, int, int]]]:
    """Retorna {pagina: [(num, width, height), ...]} para imagens largas."""
    result = subprocess.run(
        ["pdfimages", "-list", str(PDF)],
        check=True,
        capture_output=True,
        text=True,
    )
    por_pagina: dict[int, list[tuple[int, int, int]]] = {}
    for line in result.stdout.splitlines()[2:]:
        parts = line.split()
        if len(parts) < 5 or parts[2] != "image":
            continue
        page = int(parts[0])
        width = int(parts[3])
        height = int(parts[4])
        if width < MIN_WIDTH:
            continue
        num = int(parts[1])
        por_pagina.setdefault(page, []).append((num, width, height))
    return por_pagina


def pagina_ilustracao(texto: int, imagens: dict[int, list[tuple[int, int, int]]]) -> int:
    """Encontra a página com a ilustração principal (mesma página ou spread seguinte)."""
    if texto in imagens:
        return texto
    for offset in (1, 2):
        candidata = texto + offset
        if candidata in imagens:
            return candidata
    raise RuntimeError(f"Ilustração não encontrada para página de texto {texto}")


def extrair_pagina(pagina: int, destino: Path) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        prefix = Path(tmp) / "img"
        subprocess.run(
            [
                "pdfimages",
                "-f",
                str(pagina),
                "-l",
                str(pagina),
                "-j",
                str(PDF),
                str(prefix),
            ],
            check=True,
            capture_output=True,
        )
        arquivos = sorted(prefix.parent.glob("img-*.jpg"))
        if not arquivos:
            arquivos = sorted(prefix.parent.glob("img-*.jpeg"))
        if not arquivos:
            raise RuntimeError(f"Nenhuma imagem extraída da página {pagina}")
        # Pega a maior imagem da página (ignora ícones pequenos).
        melhor = max(arquivos, key=lambda p: p.stat().st_size)
        shutil.copy2(melhor, destino)


def main() -> None:
    if not PDF.exists():
        raise SystemExit(f"PDF não encontrado: {PDF}")

    emocoes = json.loads(EMOCOES_JSON.read_text(encoding="utf-8"))
    ids = [e["id"] for e in emocoes]
    faltando = [eid for eid in ids if eid not in PAGINA_TEXTO]
    if faltando:
        raise SystemExit(f"Páginas não mapeadas: {faltando}")

    imagens = paginas_com_imagens_grandes()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for eid in ids:
        texto = PAGINA_TEXTO[eid]
        ilust = pagina_ilustracao(texto, imagens)
        destino = OUT_DIR / f"{eid}.jpg"
        extrair_pagina(ilust, destino)
        print(f"{eid}.jpg  <- página {ilust} (texto p{texto})")

    print(f"\n{len(ids)} imagens salvas em {OUT_DIR}")


if __name__ == "__main__":
    main()
