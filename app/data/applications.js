// Browse by application (spec §4.1-5). Used from Prompt 5 on.
// `products`: the product lines suited to each, from the "Suitable for" lines in ../new-design.md.
export const applications = [
  { slug: 'residences', name: 'Residences', image: 'gallery/wall_murals/9', products: ['sculptures', 'designer-planters', 'grc-grilles'] },
  { slug: 'gardens', name: 'Gardens & Landscapes', image: 'gallery/sculptures/33', products: ['sculptures', 'designer-planters'] },
  { slug: 'hotels', name: 'Hotels & Hospitality', image: 'gallery/other_products/6', products: ['sculptures', 'designer-planters', 'frp-products'] },
  { slug: 'commercial', name: 'Commercial Spaces', image: 'gallery/other_products/11', products: ['grc-products', 'frp-products', 'designer-planters'] },
  { slug: 'facades', name: 'Façades & Architecture', image: 'gallery/grc_products/3', products: ['grc-products', 'grc-grilles'] },
  { slug: 'public', name: 'Public & Large-scale Projects', image: 'gallery/sculptures/13', products: ['sculptures', 'grc-products'] },
];
