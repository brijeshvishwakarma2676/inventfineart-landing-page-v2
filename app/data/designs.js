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

// Photos that show the same piece from another angle or stage (checked by eye; titles from site-v4's photo notes).
// Hovering a card shows the next photo of its group. Not grouped: sculptures/53 (a larger, different Liberty),
// 54 (Gandhi in clay, another stage), and anything only similar in style.
const SAME_PIECE = [
  ['sculptures/13', 'sculptures/14'], // equestrian statue
  ['sculptures/19', 'sculptures/20'], // giant garden chess set
  ['sculptures/24', 'sculptures/25'], // birds by the pool
  ['sculptures/32', 'sculptures/33'], // couple on a boulder
  ['sculptures/35', 'sculptures/36'], // rhinoceros in metal mesh
  ['sculptures/37', 'sculptures/39'], // Statue of Liberty replica
  ['sculptures/40', 'sculptures/41'], // Gandhi statue
  ['sculptures/44', 'sculptures/45'], // figure with kites
  ['sculptures/46', 'sculptures/47', 'sculptures/48', 'sculptures/49'], // figure at the spinning wheel
  ['sculptures/57', 'sculptures/58', 'sculptures/59'], // leaning figure with a silver mane
  ['sculptures/63', 'sculptures/64'], // spinning wheel, large
  ['sculptures/67', 'sculptures/68', 'sculptures/69'], // portrait statue, clay model
  ['sculptures/70', 'sculptures/71'], // portrait statue
  ['sculptures/78', 'sculptures/80'], // lion of machine parts
  ['grc_products/1', 'grc_products/2', 'grc_products/3'], // 3D façade panels
  ['grc_products/7', 'grc_products/8', 'grc_products/9'], // façade cladding
  ['wall_murals/12', 'wall_murals/13'], // jali gate and boundary screen
  ['other_products/8', 'other_products/9'], // sculptural table
  ['other_products/11', 'other_products/12', 'other_products/13'], // curved interior
].map((g) => g.map((id) => `gallery/${id}`));
export const secondImageOf = Object.fromEntries(
  SAME_PIECE.flatMap((g) => g.map((id, i) => [id, g[(i + 1) % g.length]])),
);
const viewCountOf = Object.fromEntries(SAME_PIECE.flatMap((g) => g.map((id) => [id, g.length])));

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
      secondImage: secondImageOf[image],
      views: viewCountOf[image] ?? 1,
      alt: `${title}, ${cat.name.toLowerCase()} by Invent Fine Art (${code})`,
    };
  });
}

const grcAll = fromFolder('grc_products');

const built = [
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

// Photos of the same piece share one name: an untitled photo takes the title of a titled photo in its group.
const generic = (d) => d.title === `${categoryBySlug[d.category].name.replace(/s$/, '')} design`;
const titleByImage = Object.fromEntries(built.filter((d) => !generic(d)).map((d) => [d.image, d.title]));
const groupTitle = (image) => SAME_PIECE.find((g) => g.includes(image))?.map((id) => titleByImage[id]).find(Boolean);

export const designs = built.map((d) => {
  const shared = generic(d) && groupTitle(d.image);
  if (!shared) return d;
  const cat = categoryBySlug[d.category];
  return { ...d, title: shared, alt: `${shared}, ${cat.name.toLowerCase()} by Invent Fine Art (${d.code})` };
});

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
