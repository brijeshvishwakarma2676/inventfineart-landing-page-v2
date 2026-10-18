// Company facts. Sources: ../old data/pages/12_contact_us.md and 00_sitemap_and_navigation.md.
// Every value marked PROVISIONAL comes from SITE-V3-SPEC.md §7 and must be confirmed by the client.

export const SITE_URL = 'https://www.inventfineart.com';

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
    // PROVISIONAL – confirm with client (headline approval)
    eyebrow: 'Sculptures · Planters · GRC · FRP',
    title: 'Art that gives your space an',
    titleItalic: 'identity.',
    sub: 'Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop.',
    // The hero is the sketch hero (Hero.jsx): line drawings + the real piece. A hero video could replace it later.
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

export const nav = [
  { label: 'Products', to: '/products', mega: true },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Contact', to: '/contact' },
];

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
