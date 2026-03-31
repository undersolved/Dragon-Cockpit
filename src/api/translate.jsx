const cache = new Map();

async function translateChunk(text) {
  if (!text.trim()) return text;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`;
  try {
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    return json?.responseData?.translatedText ?? text;
  } catch {
    return text;
  }
}

// char input limit <500 hai, isme trial and error krna pdega

function splitIntoChunks(text, maxLen = 490) {
  const chunks = [];
  let remaining = text.trim();
  while (remaining.length > maxLen) {
    let cutAt = remaining.lastIndexOf(" ", maxLen);
    if (cutAt === -1) cutAt = maxLen;
    chunks.push(remaining.slice(0, cutAt).trim());
    remaining = remaining.slice(cutAt).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

export async function translateToEnglish(text) {
  if (!text) return text;
  if (cache.has(text)) return cache.get(text);
  const chunks = splitIntoChunks(text);
  const translated = (await Promise.all(chunks.map(translateChunk))).join(" ");
  cache.set(text, translated);
  return translated;
}
