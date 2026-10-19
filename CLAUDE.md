# Invent Fine Art — website v3

A marketing and catalogue site for Invent Fine Art, which makes sculptures, designer planters, GRC products, GRC grilles and FRP products in Mumbai.

**Design direction (from 2026-10-19): `docs/THREE-DEMOS-DIRECTION.md` §4 "v2".** This demo follows Bonasila: brand-led, light and warm, a full-bleed photo hero, editorial collections, three menus. It must not share its hero, home order or navigation with v4 or Demo 3. The line drawings belong to Demo 3 only.

**Source of truth for content and pages: `docs/SITE-V3-SPEC.md`.** If this file and the spec disagree, the spec wins (except for the design direction above). Change the spec first, then the code. The stack is in `docs/SITE-V3-STACK-AND-PLUGINS.md`, and the step-by-step prompts are in `docs/SITE-V3-BUILD-PROMPTS.md`.

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
| `bg` | `#FAF6EE` | Page background (warm cream) |
| `surface` | `#F2ECE0` | Alternate section background |
| `surface-2` | `#E8E0D0` | Footer, image placeholders |
| `line` | `#DDD3C2` | Borders, dividers |
| `ink` | `#23211C` | Headings and body text |
| `ink-muted` | `#5F5A4F` | Secondary text |
| `accent` | `#5E5F3E` | Olive, the one accent: buttons, links, accent words |
| `accent-hover` | `#4A4B30` | Button hover |
| `accent-light` | `#DEDBB8` | Pale olive for words on photos |
| `olive` | `#6B6A4B` | Eyebrow labels |
| `tint-sage` / `tint-sand` / `tint-clay` | `#E4E3CF` / `#ECE1CC` / `#EAD9C9` | Panels behind photos |
| `dark` | `#23211C` | Scrims over photos only. **Never a band.** |
| `cream` | `#F8F4EC` | Text on photos |
| `whatsapp` | `#25D366` | The floating WhatsApp button only |
| `error` | `#A23B2A` | Form error messages only |

- **Type:** headings are bold sans (Manrope 800, tight tracking). Cormorant Garamond is an **accent only**: one italic word or phrase in a headline (`<em>` inside h1–h3 or `.statement`), taglines, and small italic numbers.
  - Sizes: `text-hero` (48→108), `text-statement` (36→80), `text-h1` (40→68), `text-h2` (32→48), `text-h3` (22→26), body 16→17.
- **Layout:** container 1320 px, 24 px gutter (16 px on mobile). Section padding `py-section` (72→120).
- **Radius:** images 4 px (`rounded-image`), buttons 2 px (`rounded-button`). The pill shape is only for the floating WhatsApp button.

## Rules
1. Light and warm. No dark bands (hero, sections or footer); dark only as a scrim over a photo. Use token colours only, no arbitrary hex in classes.
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
- `npm run og`: rebuild the 1200×630 link-preview JPGs in `public/og/` (served from `PREVIEW_ORIGIN` in `app/data/site.js`)
- `npm run shots`: Playwright screenshots of key routes at 4 widths into `shots/` (needs `npm run preview` running)

## Folder map
```
app/
  root.jsx            document shell, providers, header/footer
  routes.js           route list (every entry is prerendered)
  routes/             one file per page
  components/ui/      Button, Container, Section, SectionHeading, Img, Logo, Seo…
  components/layout/  Header (three menus), NavPanel, MobileMenu, Footer, FloatingWhatsApp
  components/sections/ page sections (Hero, CollectionStories, ProjectGrid…)
  enquiry/            EnquiryProvider + panel (the stub until Prompt 7)
  motion/             Lenis provider, reveal hook
  data/               hard-coded content (site, categories, designs, projects…)
  styles/global.css   tokens + base styles
media-src/            original photos (input to scripts/images.mjs)
public/img/           generated WebP (commit these)
scripts/              images, sitemap, shots
```
