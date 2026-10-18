// Past work that is not one of the five product lines (spec §7 row 16: kept under Projects only).
import { images } from './images.generated';

const num = (id) => parseInt(id.split('/').pop(), 10);
const fromFolder = (folder, exclude = []) =>
  Object.keys(images)
    .filter((id) => id.startsWith(`gallery/${folder}/`) && !exclude.includes(num(id)))
    .sort((a, b) => num(a) - num(b));

const OUTDOOR_STRUCTURES = [1, 2, 4, 5, 7, 15, 16, 17]; // pergolas, gazebos, rockery from other_products
const MURALS_EXCLUDE = [1, 12, 13]; // 1 is a drawing; 12–13 are jali gates, shown under GRC Grilles

export const projectGroups = [
  { slug: 'wall-murals', name: 'Murals & relief art' },
  { slug: 'water-features', name: 'Water features & rockery' },
  { slug: 'outdoor-structures', name: 'Pergolas, gazebos & landscape' },
];

const groupName = Object.fromEntries(projectGroups.map((g) => [g.slug, g.name]));
// Two photos of the same fountain: hovering one shows the other (checked by eye).
const SAME_PIECE = [
  ['water_fountains/16', 'water_fountains/17'], // sphere fountain
  ['water_fountains/3', 'water_fountains/5'], // lit fountain, side and top
].map((g) => g.map((id) => `gallery/${id}`));
const secondImageOf = Object.fromEntries(SAME_PIECE.flatMap((g) => g.map((id, i) => [id, g[(i + 1) % g.length]])));

const make = (group) => (image) => ({
  image,
  group,
  secondImage: secondImageOf[image],
  views: secondImageOf[image] ? 2 : 1,
  alt: `${groupName[group]} by Invent Fine Art`,
});

export const projects = [
  ...fromFolder('wall_murals', MURALS_EXCLUDE).map(make('wall-murals')),
  ...fromFolder('water_fountains').map(make('water-features')),
  ...fromFolder('other_products')
    .filter((id) => OUTDOOR_STRUCTURES.includes(num(id)))
    .map(make('outdoor-structures')),
];

// Home "Featured projects" (spec §4.1-8), in display order.
export const featuredProjects = [
  'gallery/wall_murals/9',
  'gallery/wall_murals/32',
  'gallery/water_fountains/20',
  'gallery/wall_murals/35',
  'gallery/other_products/16',
  'gallery/wall_murals/21',
].map((image) => projects.find((p) => p.image === image));

// Category page "Related projects" (spec §4.2-6): three from the group closest to each product line.
const related = {
  sculptures: ['gallery/wall_murals/21', 'gallery/wall_murals/28', 'gallery/water_fountains/16'],
  'designer-planters': ['gallery/other_products/16', 'gallery/water_fountains/6', 'gallery/other_products/17'],
  'grc-products': ['gallery/wall_murals/32', 'gallery/wall_murals/34', 'gallery/wall_murals/26'],
  'grc-grilles': ['gallery/other_products/17', 'gallery/wall_murals/26', 'gallery/wall_murals/3'],
  'frp-products': ['gallery/wall_murals/35', 'gallery/wall_murals/16', 'gallery/water_fountains/20'],
};
export const relatedProjects = (slug) =>
  (related[slug] ?? []).map((image) => projects.find((p) => p.image === image)).filter(Boolean);
