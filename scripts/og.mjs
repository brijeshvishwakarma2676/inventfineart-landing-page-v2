// Link-preview images: 1200×630 JPGs in public/og/, cropped from the original photos in media-src/.
// WhatsApp and most chat apps want a JPG/PNG of about this size. Run after changing a photo: `npm run og`.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'media-src/gallery');
const OUT = path.join(ROOT, 'public/og');

// key (used by <Seo og="…">) → source photo and the crop focus (sharp position or gravity)
const PREVIEWS = {
  home: ['planters/3', 'centre'],
  sculptures: ['sculptures/15', 'north'],
  'designer-planters': ['planters/2', 'centre'],
  'grc-products': ['grc_products/1', 'centre'],
  'grc-grilles': ['wall_murals/12', 'centre'],
  'frp-products': ['other_products/6', 'centre'],
  projects: ['wall_murals/9', 'centre'],
  about: ['sculptures/78', 'north'],
};

const find = async (id) => {
  for (const ext of ['.jpg', '.jpeg', '.png']) {
    const f = path.join(SRC, id + ext);
    try {
      await fs.access(f);
      return f;
    } catch {}
  }
  throw new Error(`og: no source photo for ${id}`);
};

await fs.mkdir(OUT, { recursive: true });
for (const [key, [id, position]] of Object.entries(PREVIEWS)) {
  const out = path.join(OUT, `${key}.jpg`);
  await sharp(await find(id))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position })
    .modulate({ brightness: 1.03, saturation: 1.05 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  const { size } = await fs.stat(out);
  console.log(`og: ${key}.jpg ← ${id} (${Math.round(size / 1024)} KB)`);
}
