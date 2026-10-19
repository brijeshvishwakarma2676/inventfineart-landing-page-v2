// Company facts. Sources: ../old data/pages/12_contact_us.md and 00_sitemap_and_navigation.md.
// Every value marked PROVISIONAL comes from SITE-V3-SPEC.md §7 and must be confirmed by the client.

export const SITE_URL = 'https://www.inventfineart.com';
// Where this build is actually served (set in vite.config.js from Vercel's environment, or VITE_PREVIEW_ORIGIN).
// Link previews (og:image, og:url) must load from here: inventfineart.com still serves the old site.
// PROVISIONAL – switch to SITE_URL when the domain moves.
// eslint-disable-next-line no-undef
export const PREVIEW_ORIGIN = __PREVIEW_ORIGIN__;

const foundedYear = 2008; // PROVISIONAL – confirm with client (old Home said 2008, old About said 2009)

export const site = {
  name: 'Invent Fine Art',
  pitch:
    'Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop for homes, hotels, landscapes and architecture.',
  foundedYear,
  certification: 'ISO 9001 Certified', // PROVISIONAL – confirm with client (current certificate & version)

  phones: [
    { label: '+91 93232 10327', tel: '+919323210327' },
    { label: '+91 96196 60089', tel: '+919619660089' },
    { label: '+91 89767 77123', tel: '+918976777123' },
  ],
  email: 'inventfineart.mum@gmail.com', // PROVISIONAL – confirm with client (enquiry inbox)
  whatsapp: '919323210327', // PROVISIONAL – confirm with client (which number has WhatsApp)

  office: { label: 'Head office', lines: ['Kandivali East', 'Mumbai, Maharashtra'] },
  factory: {
    label: 'Factory & workshop',
    lines: ['Near Jag Mata Mandir', 'Vasai–Virar, Maharashtra'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=19.4196725,72.7856904',
  },

  hero: {
    // Headline: the old site's own tagline ("Reinventing spaces through Innovations in Art").
    // PROVISIONAL – confirm with client (headline approval)
    eyebrow: 'Sculptures · Planters · GRC · FRP',
    title: 'Reinventing spaces through innovations in',
    titleItalic: 'art.',
    sub: 'Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop.',
    // Full-bleed lifestyle photo (≥ 2,400 px wide; this one is 3,264 px). A proper lifestyle shoot would serve better.
    photo: {
      image: 'gallery/planters/3',
      alt: 'An elephant planter holding a fan of leaves, on a stone plinth beside a garden',
      position: '50% 62%',
      category: 'designer-planters',
      code: 'IFA-PL-003',
      caption: 'Elephant planter',
    },
    video: null, // PROVISIONAL – confirm with client (no hero video yet)
  },

  // PROVISIONAL – confirm with client (spec §7 row 2). Years is computed from foundedYear.
  stats: [
    { value: new Date().getFullYear() - foundedYear, suffix: '+', label: 'Years of craft' },
    { value: 160, suffix: '+', label: 'Designs crafted' },
    { value: 30, suffix: '+', label: 'Corporate clients' },
  ],

  catalogueUrl: null, // PROVISIONAL – confirm with client (no catalogue PDF yet)
};

// Three menus, Bonasila-style (THREE-DEMOS-DIRECTION.md §4 v2.7). Collections lists the five product lines;
// the others are short link lists. `action: 'enquiry'` opens the quote panel instead of a page.
export const menus = [
  { id: 'collections', label: 'Collections' },
  {
    id: 'business',
    label: 'Business',
    items: [
      { label: 'Projects', to: '/projects', text: 'Murals, water features, pergolas and installations' },
      { label: 'Clients', to: '/clients', text: 'Corporate and architectural clients' },
      { label: 'All products', to: '/products', text: 'The five product lines side by side' },
      { label: 'Get a quote', action: 'enquiry', text: 'Share your concept, size and location' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    items: [
      { label: 'About us', to: '/about', text: 'A community of artists and makers' },
      { label: 'How we work', to: '/about#how-we-work', text: 'From conceptualisation to the complete execution' },
      { label: 'Contact', to: '/contact', text: 'Office, workshop, phone and email' },
    ],
  },
];

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
