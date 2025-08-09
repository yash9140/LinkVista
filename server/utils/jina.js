const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fallbackScrape(url) {
  try {
    const res = await fetch(url, { timeout: 15000 });
    if (!res.ok) return { title: '', content: '' };

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').first().text().trim();
    let description = $('meta[name="description"]').attr('content') || '';
    description = description.trim();

    // If no meta description, try first paragraph
    if (!description) {
      const firstP = $('p').first().text().trim();
      description = firstP.slice(0, 300); // limit length
    }

    return { title, content: description };
  } catch (err) {
    console.error('Fallback scrape failed:', err);
    return { title: '', content: '' };
  }
}

exports.fetchJinaContent = async function(url) {
  try {
    const encoded = encodeURIComponent(url);
    const api = `https://r.jina.ai/${encoded}`;
    const resp = await fetch(api, { timeout: 15000 });

    if (!resp.ok) {
      console.warn('Jina API error:', resp.status, resp.statusText);
      return fallbackScrape(url);
    }

    const text = await resp.text();

    // Try JSON
    try {
      const json = JSON.parse(text);
      if (json.content && json.content.trim()) {
        return { title: json.title || '', content: json.content };
      }
    } catch {
      // Try plain text if JSON parse fails
      if (text.trim()) {
        const lines = text.split('\n').filter(l => l.trim());
        const titleLine = lines.length > 0 ? lines[0] : '';
        const bodyText = lines.slice(1).join(' ');
        if (bodyText.trim()) {
          return { title: titleLine.trim(), content: bodyText.trim() };
        }
      }
    }

    // If we reach here, Jina gave nothing → fallback
    return fallbackScrape(url);
  } catch (err) {
    console.error('Jina fetch failed:', err);
    return fallbackScrape(url);
  }
};
