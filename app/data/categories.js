// The five product lines (SITE-V3-SPEC.md §4.2). `intro` is VERBATIM from ../new-design.md.
// sizes / finishes / faq answers are PROVISIONAL (spec §7 rows 11, 12, 17).

export const categories = [
  {
    slug: 'sculptures',
    code: 'SC',
    name: 'Sculptures',
    tagline: 'Art That Gives Your Space a Distinctive Identity',
    intro: [
      'Discover sculptural creations that bring character, elegance, and artistic expression to your surroundings. From decorative sculptures to custom-designed statement pieces, we work to bring creative concepts to life.',
      'Suitable for residences, gardens, hotels, commercial spaces, and architectural projects.',
    ],
    summary: 'Decorative sculptures and custom statement pieces for homes, gardens, hotels and public spaces.',
    suitableFor: ['Residences', 'Gardens', 'Hotels', 'Commercial spaces', 'Architectural projects'],
    materials: ['Fibre', 'Metal', 'Stone', 'Bronze finish', 'Mixed media'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/sculptures/15', position: '50% 18%' },
    seo: {
      title: 'Sculptures for Homes, Gardens & Hotels | Invent Fine Art',
      description:
        'Decorative and custom statement sculptures for residences, gardens, hotels and commercial spaces, designed and made by Invent Fine Art, Mumbai.',
    },
  },
  {
    slug: 'designer-planters',
    code: 'PL',
    name: 'Designer Planters',
    tagline: 'Where Nature Meets Design',
    intro: [
      'Enhance your surroundings with decorative planters designed to complement contemporary and traditional environments. Our range can suit residential landscapes, balconies, gardens, hospitality spaces, and commercial properties.',
      'Explore different styles, shapes, sizes, and customization options to find the right fit for your space.',
    ],
    summary: 'Decorative planters for landscapes, balconies, gardens and hospitality spaces.',
    suitableFor: ['Residential landscapes', 'Balconies', 'Gardens', 'Hospitality spaces', 'Commercial properties'],
    materials: ['GRC', 'FRP', 'Fibre'],
    // PROVISIONAL – confirm with client
    sizes: 'Small 12–18 in · Medium 18–30 in · Large 30–48 in · Custom',
    banner: { image: 'gallery/planters/4', position: '50% 40%' },
    seo: {
      title: 'Designer Planters for Homes, Hotels & Landscapes | Invent Fine Art',
      description:
        'Decorative designer planters in contemporary and traditional styles for gardens, balconies, hotels and commercial properties. Custom sizes and finishes.',
    },
  },
  {
    slug: 'grc-products',
    code: 'GRC',
    name: 'GRC Products',
    tagline: 'Architectural Creativity Meets Modern Craftsmanship',
    intro: [
      'Discover Glassfibre Reinforced Concrete (GRC) products designed to add character, detail, and visual appeal to architectural spaces.',
      'GRC offers versatility for decorative and architectural applications, including façade elements, ornamental features, cornices, columns, mouldings, cladding elements, and customized architectural components, depending on the product range.',
      'Our focus is on bringing together design, functionality, and architectural aesthetics to meet the requirements of residential, commercial, and large-scale projects.',
    ],
    summary: 'Façade elements, cornices, columns, mouldings, cladding and custom architectural components.',
    suitableFor: ['Façades', 'Residential projects', 'Commercial buildings', 'Large-scale projects'],
    materials: ['GRC'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/grc_products/2', position: '50% 45%' },
    seo: {
      title: 'GRC Façade Elements & Architectural Products | Invent Fine Art',
      description:
        'Glassfibre Reinforced Concrete (GRC) façade elements, cornices, columns, mouldings and cladding for residential, commercial and large-scale projects.',
    },
  },
  {
    slug: 'grc-grilles',
    code: 'GRL',
    name: 'GRC Grilles',
    tagline: 'Distinctive Patterns. Timeless Architectural Appeal.',
    intro: [
      'Enhance building façades, balconies, partitions, and other architectural spaces with decorative GRC grilles.',
      'Available design possibilities can range from traditional ornamental patterns to contemporary geometric styles, helping create visually distinctive architectural features while addressing project-specific requirements.',
    ],
    summary: 'Decorative jali and grilles for façades, balconies and partitions, in traditional and geometric patterns.',
    suitableFor: ['Building façades', 'Balconies', 'Partitions', 'Architectural features'],
    materials: ['GRC'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/grc_products/5', position: '50% 50%' },
    seo: {
      title: 'GRC Jali & Grilles Manufacturer in Mumbai | Invent Fine Art',
      description:
        'Decorative GRC jali and grilles for façades, balconies and partitions, from traditional ornamental to contemporary geometric patterns.',
    },
  },
  {
    slug: 'frp-products',
    code: 'FRP',
    name: 'FRP Products',
    tagline: 'Creative Solutions. Customized to Your Requirements.',
    intro: [
      'Fibre-Reinforced Plastic (FRP) offers versatility for a variety of decorative, architectural, and project-specific applications.',
      'We develop product solutions based on the intended use, design, dimensions, finish, and project requirements, helping clients explore suitable options for their spaces.',
      'Share your concept with us to discuss the most appropriate design and finish.',
    ],
    summary: 'Custom FRP pieces for decorative, architectural and project-specific uses.',
    suitableFor: ['Decorative features', 'Architectural elements', 'Interiors', 'Project-specific pieces'],
    materials: ['FRP'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/other_products/6', position: '45% 50%' }, // PROVISIONAL – confirm with client (no FRP photos yet)
    seo: {
      title: 'FRP Products, Custom Made | Invent Fine Art',
      description:
        'Custom Fibre-Reinforced Plastic (FRP) products for decorative, architectural and project-specific applications, made to your design, size and finish.',
    },
  },
];

// PROVISIONAL – confirm with client (spec §7 row 12; swatch photos still needed)
export const finishes = [
  { name: 'Natural concrete grey', tone: 'surface-2' },
  { name: 'Sandstone texture', tone: 'surface' },
  { name: 'Matte colour', tone: 'olive' },
  { name: 'Metallic bronze', tone: 'accent' },
  { name: 'Custom colour', tone: 'line' },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
