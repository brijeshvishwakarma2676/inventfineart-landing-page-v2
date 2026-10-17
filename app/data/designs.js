// Design catalogue, seeded from ../old data/media/gallery (copied into media-src/).
// Codes: IFA-<category code>-<nnn>, numbered in source-file order within each category.
// Titles are descriptive only where the photo is unambiguous; the rest use a generic title until
// the client names them (CONTENT-GAPS.md). The GRC/GRL split and the FRP picks are PROVISIONAL (spec §7 rows 9–10).
import { images } from './images.generated';
import { categoryBySlug } from './categories';

const num = (id) => parseInt(id.split('/').pop(), 10);
const fromFolder = (folder) =>
  Object.keys(images)
    .filter((id) => id.startsWith(`gallery/${folder}/`))
    .sort((a, b) => num(a) - num(b));

const SCULPTURE_TITLES = {
  2: 'Saraswati with veena',
  13: 'Equestrian statue',
  15: 'Seated Buddha, gold finish',
  20: 'Giant garden chess set',
  33: 'Couple on a boulder',
  36: 'Rhinoceros in metal mesh',
  75: 'Buddha head',
  80: 'Lion of machine parts',
  84: 'Twisted ribbon form',
};
const SCULPTURE_EXCLUDE = [22]; // a concept drawing, not a finished piece

const GRILLE_FILES = [4, 5, 6, 10]; // PROVISIONAL – confirm with client (jali/grille photos from the GRC folder)
const GRILLE_EXTRA = ['gallery/wall_murals/12', 'gallery/wall_murals/13']; // PROVISIONAL – confirm with client (jali gates filed under murals)
const GRC_TITLES = {
  1: '3D façade panels',
  2: '3D façade wall',
  3: '3D façade, corner detail',
  4: 'Geometric jali screen',
  5: 'Geometric jali cladding',
  6: 'Jali panel, geometric pattern',
  7: 'Façade cladding',
  8: 'Façade cladding, installation',
  9: 'Façade cladding, on site',
  10: 'Jali partition',
  11: 'Heritage-style façade',
  12: 'Relief frieze wall',
  13: 'Figurative relief panel',
  14: 'Botanical relief panel',
  15: 'Lotus relief wall',
};

const PLANTER_TITLES = {
  1: 'Faceted planters',
  2: 'Classical urn planters',
  3: 'Elephant planter',
  4: 'Stone-face planter',
};

// PROVISIONAL – confirm with client: no FRP photos were supplied; these other-product photos look fibre-made.
const FRP_PICKS = {
  6: 'Illuminated lobby installation',
  3: 'Wave wall sculpture',
  8: 'Sculptural table',
  9: 'Sculptural table, lounge view',
  11: 'Curved interior installation',
  12: 'Curved interior, detail',
  13: 'Sphere and curved wall',
  14: 'Anchor and eagle landmark',
};

function build(categorySlug, ids, titles = {}) {
  const cat = categoryBySlug[categorySlug];
  return ids.map((image, i) => {
    const n = num(image);
    const code = `IFA-${cat.code}-${String(i + 1).padStart(3, '0')}`;
    const title = titles[n] ?? `${cat.name.replace(/s$/, '')} design`;
    return {
      code,
      category: categorySlug,
      title,
      image,
      alt: `${title}, ${cat.name.toLowerCase()} by Invent Fine Art (${code})`,
    };
  });
}

const grcAll = fromFolder('grc_products');

export const designs = [
  ...build(
    'sculptures',
    fromFolder('sculptures').filter((id) => !SCULPTURE_EXCLUDE.includes(num(id))),
    SCULPTURE_TITLES,
  ),
  ...build('designer-planters', fromFolder('planters'), PLANTER_TITLES),
  ...build('grc-products', grcAll.filter((id) => !GRILLE_FILES.includes(num(id))), GRC_TITLES),
  ...build('grc-grilles', [...grcAll.filter((id) => GRILLE_FILES.includes(num(id))), ...GRILLE_EXTRA], {
    ...GRC_TITLES,
    12: 'Jali gate and boundary screen',
    13: 'Jali boundary screen',
  }),
  ...build(
    'frp-products',
    Object.keys(FRP_PICKS).map((n) => `gallery/other_products/${n}`),
    FRP_PICKS,
  ).map((d) => ({ ...d, provisional: true })),
];

export const designsFor = (slug) => designs.filter((d) => d.category === slug);
export const designByImage = (image) => designs.find((d) => d.image === image);

// Home "Collections" picks (spec §4.1-4), in display order.
export const collections = [
  {
    category: 'sculptures',
    picks: ['gallery/sculptures/15', 'gallery/sculptures/33', 'gallery/sculptures/2', 'gallery/sculptures/36', 'gallery/sculptures/13', 'gallery/sculptures/84'],
  },
  {
    category: 'designer-planters',
    picks: ['gallery/planters/3', 'gallery/planters/2', 'gallery/planters/4', 'gallery/planters/1'],
  },
  {
    category: 'grc-products',
    picks: ['gallery/grc_products/1', 'gallery/grc_products/11', 'gallery/grc_products/14', 'gallery/grc_products/3', 'gallery/grc_products/15', 'gallery/grc_products/13'],
  },
  {
    category: 'grc-grilles',
    picks: ['gallery/grc_products/5', 'gallery/wall_murals/12', 'gallery/grc_products/10', 'gallery/wall_murals/13', 'gallery/grc_products/6', 'gallery/grc_products/4'],
  },
  {
    category: 'frp-products',
    picks: ['gallery/other_products/6', 'gallery/other_products/3', 'gallery/other_products/11', 'gallery/other_products/8', 'gallery/other_products/13', 'gallery/other_products/14'],
  },
];
