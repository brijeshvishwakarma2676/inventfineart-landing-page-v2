// Full-page screenshots of key routes at 360 / 768 / 1024 / 1440 into shots/.
// Needs the site running: `npm run preview` (default http://localhost:4173) or pass BASE=http://…
// Usage: node scripts/shots.mjs [/path ...]
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4173';
const WIDTHS = [360, 768, 1024, 1440];
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/sculptures', '/designer-planters', '/products', '/contact'];

await fs.mkdir('shots', { recursive: true });
const browser = await chromium.launch();
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 780 : 900 } });
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    // Scroll through so lazy images load and scroll reveals play, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    await page.waitForLoadState('networkidle');
    const name = (route === '/' ? 'home' : route.slice(1).replace(/\//g, '_')) + `-${width}.png`;
    await page.screenshot({ path: `shots/${name}`, fullPage: true });
    console.log(`shots/${name}`);
  }
  await page.close();
}
await browser.close();
