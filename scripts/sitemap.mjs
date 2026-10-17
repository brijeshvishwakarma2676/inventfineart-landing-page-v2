// Writes build/client/sitemap.xml from the prerendered HTML files (run after `react-router build`).
import fs from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://www.inventfineart.com';
const OUT = path.resolve(import.meta.dirname, '../build/client');
const EXCLUDE = ['/styleguide', '/__spa-fallback'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return out.flat();
}

const pages = [];
for (const f of (await walk(OUT)).filter((f) => f.endsWith('.html'))) {
  const html = await fs.readFile(f, 'utf8');
  if (html.includes('name="robots" content="noindex"')) continue;
  const route = '/' + path.relative(OUT, f).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  const clean = route.replace(/\/$/, '') || '/';
  if (!EXCLUDE.includes(clean)) pages.push(clean);
}
pages.sort();
const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';
await fs.writeFile(path.join(OUT, 'sitemap.xml'), xml);
console.log(`sitemap: ${pages.length} URLs → ${pages.join(', ')}`);
