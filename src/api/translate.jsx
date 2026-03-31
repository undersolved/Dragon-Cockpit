const cache = new Map();

async function translateChunk(text) {
  if (!text.trim()) return text;

  
  const email = "bhupendra.hapawat@example.com"; // Use your actual email

  
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en&de=${email}&mt=1`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    
    if (json.responseStatus !== 200) {
      console.warn(`Z-COCKPIT API Alert: ${json.responseDetails}`);
      return text;
    }

    return json?.responseData?.translatedText ?? text;
  } catch (error) {
    console.error("Z-COCKPIT Link Failure:", error);
    return text;
  }
}


function splitIntoChunks(text, maxLen = 400) {
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
  const translatedChunks = [];

  
  for (const chunk of chunks) {
    const result = await translateChunk(chunk);
    translatedChunks.push(result);
    // Tiny 50ms delay to keep the connection stable
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const translated = translatedChunks.join(" ");
  cache.set(text, translated);
  return translated;
}
