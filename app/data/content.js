// Copy used across pages. Facts come from ../old data (About and Home pages) and ../new-design.md.
// FAQ answers are PROVISIONAL (spec §7 row 17): general, built only from those facts.
import { site } from './site';

export const intro = {
  eyebrow: `Since ${site.foundedYear}`,
  title: 'A community of artists, making art for real spaces.',
  body: [
    'Invent Fine Art is a team of sculptors, painters and product designers. We work across interior and architectural design, at indoor and outdoor sites.',
    'From a single statement sculpture to façade elements for a large project, we take each piece from concept to installation.',
  ],
};

// Spec §4.1-7. Source: old About page (conceptualisation to execution, QC unit, R&D, packing, fixing).
export const process = [
  { title: 'Concept', text: 'Share a sketch, a reference photo or a drawing, with the size and the site.' },
  { title: 'Design & approval', text: 'We suggest the design, material and finish, and confirm every detail with you.' },
  { title: 'Mould & manufacturing', text: 'Made in our own workshop by our artisans, using our own moulds and tools.' },
  { title: 'Quality check', text: 'Every piece is examined by our quality control team before it leaves.' },
  { title: 'Delivery & installation', text: 'Packed for safe transport and installed on site where required.' },
];

// Spec §4.1-6. Descriptions are general; finish swatch photos still needed (CONTENT-GAPS.md).
export const materials = [
  { name: 'GRC', full: 'Glassfibre Reinforced Concrete', text: 'Façade elements, grilles, mouldings and planters with the look of concrete and stone.' },
  { name: 'FRP', full: 'Fibre-Reinforced Plastic', text: 'Custom forms for decorative and architectural pieces, made to your design.' },
  { name: 'Fibre', full: 'Fibre composites', text: 'Sculptures and planters for indoor and outdoor spaces.' },
  { name: 'Metal', full: 'Metal sculpture', text: 'Statement pieces and installations for lobbies, gardens and public spaces.' },
  { name: 'Stone', full: 'Stone and stone finish', text: 'Carved and stone-finish pieces with a natural, timeless surface.' },
];

export const about = {
  story: [
    'Invent Fine Art was established to bring outstanding art to homes, businesses and public spaces. We are a team of artisans and product designers who create pieces with an artistic eye for designers, architects and their clients.',
    'We provide start-to-end solutions, from the first concept to the complete execution on site. Every product is made in a range of sizes and specifications to suit the project.',
  ],
  whatWeMake: [
    'Sculptures in fibre, metal, stone and mixed media',
    'Designer planters',
    'GRC façade elements, grilles, railings, pergolas and gazebos',
    'FRP products made to your requirements',
    'Murals and relief art',
    '3D wall façades and acoustic wall panels',
    'Rockery work and water features',
  ],
  facility: [
    { name: 'Manufacturing', text: 'Moulding, casting and finishing, with the latest tools and machinery.' },
    { name: 'Quality control', text: 'Each piece is checked on several factors before delivery.' },
    { name: 'Research & development', text: 'New forms, materials and finishes tested before they reach a project.' },
    { name: 'Warehousing & packaging', text: 'Premium packing so every piece arrives as it left the workshop.' },
  ],
};

const common = [
  {
    q: 'Can you make a design to my size?',
    a: 'Yes. Share the dimensions, the site and a reference or drawing, and we will suggest the right design, material and finish.',
  },
  {
    q: 'Do you deliver and install?',
    a: 'Yes. We work from concept to installation, and every piece is packed for safe transport.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use Get a Quote on any page, or send photos and drawings on WhatsApp. Include the size, quantity and location.',
  },
];

export const faqs = {
  sculptures: [
    { q: 'Do you make sculptures for outdoor sites?', a: 'Yes. We make sculptures for indoor and outdoor sites, including gardens, lobbies and public spaces. Tell us where the piece will stand.' },
    ...common,
  ],
  'designer-planters': [
    { q: 'Which materials are your planters made in?', a: 'Our planters are made in GRC, FRP and fibre. We will recommend one based on the size, the plant and where it will be placed.' },
    { q: 'What sizes are available?', a: 'Small (12–18 in), medium (18–30 in) and large (30–48 in), and custom sizes to your drawing.' },
    ...common,
  ],
  'grc-products': [
    { q: 'What is GRC?', a: 'Glassfibre Reinforced Concrete: concrete reinforced with glass fibres. It is used for façade elements, ornamental features, cornices, columns, mouldings and cladding.' },
    ...common,
  ],
  'grc-grilles': [
    { q: 'Can you make a grille to my own pattern?', a: 'Yes. Patterns range from traditional ornamental to contemporary geometric, and we can develop one to your drawing.' },
    { q: 'Where are GRC grilles used?', a: 'On building façades, balconies, partitions and other architectural features.' },
    ...common,
  ],
  'frp-products': [
    { q: 'What is FRP?', a: 'Fibre-Reinforced Plastic: a composite used for decorative, architectural and project-specific pieces.' },
    { q: 'What do you need from me to start?', a: 'The intended use, a design or reference, the dimensions and the finish you have in mind.' },
    ...common,
  ],
};
