const BASE = import.meta.env.BASE_URL;

let emocoesList = [];
let emocoesMap = new Map();

export function imgUrl(id) {
  return `${BASE}img/${id}.jpg`;
}

export function dataUrl(path) {
  return `${BASE}${path.replace(/^\//, "")}`;
}

export async function loadEmocoes() {
  if (emocoesList.length > 0) {
    return emocoesList;
  }

  const response = await fetch(dataUrl("data/emocoes.json"));
  if (!response.ok) {
    throw new Error("Não foi possível carregar as emoções.");
  }

  emocoesList = await response.json();
  emocoesMap = new Map(emocoesList.map((e) => [e.id, e]));
  return emocoesList;
}

export function getAll() {
  return emocoesList;
}

export function getById(id) {
  return emocoesMap.get(id) ?? null;
}

export function getProxima(id) {
  const emocao = getById(id);
  if (!emocao?.proxima_emocao) {
    return null;
  }
  return getById(emocao.proxima_emocao);
}

export function getAntagonista(id) {
  const emocao = getById(id);
  if (!emocao?.antagonista) {
    return null;
  }
  return getById(emocao.antagonista);
}

export function splitParagraphs(text) {
  return text.split("\n").filter((p) => p.trim().length > 0);
}
