const cache = new Map();

async function translateChunk(text) {
  if (!text.trim()) return text;

  // 1. Documentation says 'de' is recommended for high volume (10k words/day)
  const email = "bhupendra.hapawat@example.com"; // Use your actual email

  // 2. Build the URL with the documented parameters
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en&de=${email}&mt=1`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    // 3. Documentation mentions responseStatus in the JSON body
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

/** * 4. Documentation specifies 500 BYTES, not characters.
 * Spanish UTF-8 characters can be 2 bytes.
 * We drop the limit to 400 to ensure we never hit the byte ceiling.
 */
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

  /**
   * 5. CRITICAL: Sequential over Concurrent.
   * Free APIs often block 'Promise.all' because it looks like a DDoS attack.
   * We process these one by one to stay under the radar.
   */
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
