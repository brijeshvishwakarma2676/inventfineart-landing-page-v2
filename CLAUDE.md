# Invent Fine Art — website v3

A marketing and catalogue site for Invent Fine Art, which makes sculptures, designer planters, GRC products, GRC grilles and FRP products in Mumbai.

**Source of truth: `docs/SITE-V3-SPEC.md`.** If this file and the spec disagree, the spec wins. Change the spec first, then the code. The stack is in `docs/SITE-V3-STACK-AND-PLUGINS.md`, and the step-by-step prompts are in `docs/SITE-V3-BUILD-PROMPTS.md`.

## Stack (locked)
- React 19, **JavaScript only** (`.jsx`/`.js`, no TypeScript).
- Tailwind CSS v4 (`@tailwindcss/vite`), with no config file.
- React Router v8 framework mode with `ssr: false` and `prerender: true`. Every route is built to static HTML.
- Other libraries: GSAP + `@gsap/react`, Lenis, yet-another-react-lightbox, lucide-react, react-hook-form, and Fontsource (Manrope, Cormorant Garamond).
- Images: `scripts/images.mjs` (sharp) turns `media-src/` into `public/img/*.webp` plus `app/data/images.generated.js`.
- Do **not** add other UI or CSS libraries, a CMS, Three.js, framer-motion, a chatbot or AI APIs.

## Design tokens (locked; they live ONLY in `app/styles/global.css` `@theme`)
The default Tailwind palette is switched off (`--color-*: initial`), so only these colours exist:

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F7F4EE` | Page background (limestone) |
| `surface` | `#EFEAE1` | Alternate section background (stone) |
| `surface-2` | `#E4DDD0` | Cards, image placeholders (sand) |
| `line` | `#D6CEC0` | Borders, dividers |
| `ink` | `#1F1D1A` | Headings and body text (charcoal) |
| `ink-muted` | `#5E5850` | Secondary text |
| `accent` | `#8A6A3F` | Bronze: primary buttons, links |
| `accent-hover` | `#6F542F` | Button hover |
| `olive` | `#6B6A4B` | Second accent, used sparingly |
| `dark` | `#1F1D1A` | Dark bands (stats, footer, CTA band) |
| `cream` | `#F2EDE4` | Text on dark bands and on photos |
| `whatsapp` | `#25D366` | The floating WhatsApp button only |
| `error` | `#A23B2A` | Form error messages only |

- **Type:** `font-display` = Cormorant Garamond 500/600 (italic for taglines). `font-sans` = Manrope.
  - Category labels: `font-sans font-extrabold uppercase tracking-label`.
  - Sizes: `text-h1` (44→72), `text-h2` (34→48), `text-h3` (24→28), body 16→17.
- **Layout:** container 1320 px, 24 px gutter (16 px on mobile). Section padding `py-section` (72→120).
- **Radius:** images 4 px (`rounded-image`), buttons 2 px (`rounded-button`). The pill shape is only for the floating WhatsApp button.

## Rules
1. Light theme. Use token colours only. No arbitrary hex in classes.
2. Motion follows spec §3.5 only, through `app/motion/` (`useReveal`, Lenis provider).
   - Reveals: fade up 24 px over 0.8 s with `power3.out`, stagger 0.08 s. Image clip reveal. Ken Burns of 1.06 or less.
   - Not allowed: bounce, spin, rotating text, cursor effects, intro or loading screens, gradient text.
   - Every animation must respect `prefers-reduced-motion`.
3. Never invent stats, clients, testimonials, certifications or specs. Use only the provisional values in spec §7.
   - Each one lives in its data file, marked `// PROVISIONAL – confirm with client`.
   - Each one is listed in `CONTENT-GAPS.md`.
4. Every route renders `<Seo>` with a unique title and description, plus JSON-LD where the spec says.
5. Images only through `<Img id="…">`. Never use a source under 1,600 px wide full-bleed (check `images.generated.js`).
6. Browser APIs (`window`, `document`) only inside effects, because pages are prerendered in Node.
7. After any visual change, run `npm run shots` and look at the screenshots (360, 768, 1024, 1440) before calling it done.
8. No features outside the spec. Ideas go in `BACKLOG.md`.
9. Don't modify `../frontend`, `../frontend-demo` or `../old data`. They're read-only references.

## Commands
- `npm run dev`: dev server (http://localhost:5173)
- `npm run build`: prerendered static build into `build/client`, plus the sitemap
- `npm run preview`: serve the build (http://localhost:4173)
- `npm run lint`: oxlint
- `npm run check`: lint + build
- `npm run images`: rebuild images after adding photos to `media-src/` (`-- --force` rebuilds all)
- `npm run shots`: Playwright screenshots of key routes at 4 widths into `shots/` (needs `npm run preview` running)

## Folder map
```
app/
  root.jsx            document shell, providers, header/footer
  routes.js           route list (every entry is prerendered)
  routes/             one file per page
  components/ui/      Button, Container, Section, SectionHeading, Img, Logo, Seo…
  components/layout/  Header, MegaMenu, MobileMenu, Footer, FloatingWhatsApp
  components/sections/ page sections (Hero, CategoryPanels, Collections…)
  enquiry/            EnquiryProvider + panel (the stub until Prompt 7)
  motion/             Lenis provider, reveal hook
  data/               hard-coded content (site, categories, designs, projects…)
  styles/global.css   tokens + base styles
media-src/            original photos (input to scripts/images.mjs)
public/img/           generated WebP (commit these)
scripts/              images, sitemap, shots
```
