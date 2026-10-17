# Website v3 — Build prompts (paste in order)

Use these with Claude Code, opened in the project root (`inventfineart/`). Run **one prompt at a time**, review the screenshots, then move on.

Before you start:
- The stack is locked in `SITE-V3-STACK-AND-PLUGINS.md`: React (JS) + Tailwind v4 + React Router v7 prerender, on Vercel.
- The tooling in §3 of that file is installed.
- The items in §4 of that file are ready.

**Rules for using these prompts**
- Don't add features that aren't in the spec. Ideas go in `site-v3/BACKLOG.md`.
- If the spec needs to change, change `SITE-V3-SPEC.md` **first**, then prompt.
- **Gate:** after Prompt 4, stop and get the client's written sign-off on the look.

---

## Prompt 0 — Project setup and CLAUDE.md

```
Read SITE-V3-SPEC.md and SITE-V3-STACK-AND-PLUGINS.md in full.

Create ./site-v3: React Router v7 in framework mode (JavaScript, .jsx, NO TypeScript), Vite,
Tailwind CSS v4 via @tailwindcss/vite, react-router.config.js with ssr:false and prerender listing
every route from spec §4. Install exactly the libraries in the stack doc §2 and nothing else.
Do not touch ./frontend, ./frontend-demo or ./old data (read-only references).

Create site-v3/CLAUDE.md containing:
1. Purpose: marketing + catalogue site for Invent Fine Art; source of truth = ../SITE-V3-SPEC.md.
2. Stack (locked): React 19 JS + Tailwind v4 + React Router v7 prerender + the libraries in the stack
   doc §2. No TypeScript, no other UI/CSS libraries, no CMS. Content is hard-coded in src/data/*.js.
3. Locked design tokens: copy spec §3.1–3.3 verbatim; they live ONLY in app/styles/global.css @theme.
4. Rules:
   - Light theme; only token colours (no default Tailwind palette, no arbitrary hex in classes).
   - Cormorant Garamond for display, Manrope for UI/body; category labels are Manrope 800 uppercase, tracking 0.08em.
   - Motion only per spec §3.5, through app/motion/ (useGSAP hooks + Lenis provider); respect
     prefers-reduced-motion.
   - Never invent stats, clients, testimonials, certifications or specs. Use ONLY the provisional
     values in spec §7, each kept in the data file it names and marked
     `// PROVISIONAL – confirm with client`; list every one in site-v3/CONTENT-GAPS.md (file + line).
   - Every route has a meta export (unique title, description, OG, JSON-LD where the spec says).
   - Images only through the <Img> component (vite-imagetools, AVIF/WebP srcset); never full-bleed under 1600px wide.
   - Screenshot every new page/section with Playwright at 360, 768, 1024 and 1440 px and check it before saying it is done.
   - No features outside the spec; ideas go to BACKLOG.md.
5. Commands: dev, build, preview, lint (oxlint), and check (lint + build).
6. Folder map: app/routes, app/components/{layout,ui,sections}, app/motion, app/data, app/assets, api/.

Finish by running the build, confirming each route produced its own .html in the build output, and
listing the installed packages with versions.
```

## Prompt 1 — Tokens, base styles and style guide

```
Implement SITE-V3-SPEC.md §3 in site-v3:
- app/styles/global.css: one @theme block with every token from §3.1, the font families and the type
  scale from §3.2 (clamp() between the mobile and desktop sizes), and the container and radius from §3.3.
  Base styles: body bg/ink, headings in Cormorant, links in accent, focus-visible ring in accent.
- app/components/ui: Button (primary / secondary / onDark, optional arrow), Eyebrow,
  SectionHeading (eyebrow + H2 + italic tagline), Container, Section (tone: bg | surface | dark), Img
  (wraps the vite-imagetools picture output, with width/height to avoid layout shift).
- app/motion: LenisProvider (synced to the GSAP ticker), a useReveal(ref, variant) hook for
  "up" | "clip" | "stagger" with exactly the §3.5 values, and a reduced-motion guard.
- Route /styleguide (noindex) showing every token, type size, button and reveal.
Screenshot /styleguide at 4 widths with Playwright and fix anything off-spec.
```

## Prompt 2 — Layout: header, mega menu, footer, floating WhatsApp

```
Build the root layout per SITE-V3-SPEC.md §4 "Header", "Footer" and "Floating":
- app/data/site.js: phones, email, addresses, map link, socials (from ../old data/pages/12_contact_us.md),
  plus every site.js value in spec §7 (foundedYear, stats, certification, whatsapp, hero,
  catalogueUrl), each marked // PROVISIONAL. Compute the years stat from foundedYear.
- Top info bar (desktop only). Main header: logo (../old data/media/branding), Products mega menu
  with 5 category thumbnails + taglines (from ../new-design.md), Projects, About, Clients, Contact,
  and a "Get a Quote" button.
  Transparent over hero routes (route handle flag), solid after 80px, hide on scroll down / show on scroll up.
- Mobile: full-screen menu with focus trap; Esc closes; "Get a Quote" + "Call" pinned at the bottom.
- Footer per spec. Floating WhatsApp button (whatsapp token colour) with a pre-filled message
  that names the current page.
- An EnquiryPanel context stub (open(prefill) / close), to be built for real in Prompt 7.
Fully keyboard-accessible. Screenshot at 4 widths: header transparent and solid, mega menu open, mobile menu open.
```

## Prompt 3 — Data and images

```
Create the hard-coded data in site-v3/app/data:
- categories.js (5): slug, name, tagline, intro (VERBATIM from ../new-design.md), suitableFor,
  applications[], materials[], sizes, finishes, seo {title, description} (drafts from spec §6),
  faq[] (4–6 each). Sizes, finishes and FAQ use the provisional values in spec §7 rows 11, 12 and 17.
- designs.js: { code, category, title, applications[], image, featured, provisional? }. Codes are
  IFA-SC-001…, IFA-PL-…, IFA-GRC-…, IFA-GRL-…, IFA-FRP-…. Seed from ../old data/media/gallery
  (sculptures → SC, planters → PL). Look at each grc_products photo: jali/grille/screen patterns → GRL,
  the rest → GRC (spec §7 row 10). FRP per spec §7 row 9. Record the GRL/GRC split and the FRP picks
  in CONTENT-GAPS.md for review.
- testimonials.js = [] and clients.js architects = [] (spec §7 rows 13–14).
- projects.js from wall_murals, water_fountains, other_products and homepage images; applications.js (6, spec §4.1-5);
  clients.js (30 logos).
Copy the images into app/assets (originals untouched). Write scripts/image-report.mjs that lists every
image under 1600px wide and under 1200px wide. Create CONTENT-GAPS.md from spec §7 plus what you found.
```

## Prompt 4 — Home mock-up (the client gate)

```
Build ONLY these Home sections, per SITE-V3-SPEC.md §4.1 items 1, 2 and 4, at production quality:
1. Hero: full-screen; <video> if app/assets/hero.mp4 exists, otherwise a Swiper crossfade with
   Ken Burns (≤1.06) on the 3 highest-resolution images; eyebrow, H1, sub, two buttons; the
   transparent header sits over it.
2. Category banners: 5 full-bleed banners (Ferrocon style); 55% charcoal label strip; Manrope 800
   uppercase label; Cormorant italic tagline; "View range →"; clip-reveal on scroll.
4. Collections: Bonasila-style sticky left column with scrolling design cards for Sculptures,
   Designer Planters and GRC Grilles (GSAP pin on ≥1024px; plain stacked list on mobile).
   DesignCard = 4:5 image, code, name, hover zoom 1.05, Enquire button (calls the panel stub).
Match the feel of https://www.bonasila.com/ (calm, premium, smooth) and https://ferrocon.co.in/
(bold category banners), using our tokens. Do not copy their assets or text.
Screenshot at 4 widths plus a scroll sequence. Self-review against spec §3 and §9, list anything
that looks generic or template-like, and fix it. Then deploy a Vercel preview and give me the URL.
```
**STOP:** send the preview link to the client (desktop and phone) and get written approval of the look before Prompt 5.

## Prompt 5 — The rest of Home

```
Client feedback on the mock-up: <paste>. Apply it first. Then build Home sections 3, 5, 6, 7, 8, 9,
10 and 11 per SITE-V3-SPEC.md §4.1, in that exact order:
- Stats band: count up once on enter, using the three provisional stats in site.js (spec §7 row 2).
- Testimonials: render only if app/data/testimonials.js has entries.
- Enquiry section: a placeholder for now (Prompt 7 builds the real form).
Screenshot at 4 widths.
```

## Prompt 6 — Products hub and the five category pages

```
Build /products and ONE CategoryPage component per SITE-V3-SPEC.md §4.2, used by the 5 routes
(/sculptures, /designer-planters, /grc-products, /grc-grilles, /frp-products), all prerendered:
- Banner + breadcrumb, verbatim intro, "Suitable for".
- Application filter as text tabs (client-side, synced to ?use= so the view is shareable).
- Design grid + yet-another-react-lightbox; Enquire on every card (always visible on touch screens),
  opening the panel pre-filled with category + code.
- Customisation block, 3 related projects, FAQ (+ FAQPage JSON-LD), CTA band.
- meta export: title/description from categories.js, BreadcrumbList + CollectionPage JSON-LD.
If a category has fewer than 6 designs (Planters, FRP), show a "Made to your design" panel (process
steps + strong enquiry CTA) instead of a thin grid.
Screenshot each category at 360 and 1440.
```

## Prompt 7 — The enquiry system

```
Implement SITE-V3-SPEC.md §5 end to end:
- EnquiryForm (react-hook-form), used inside EnquiryPanel (a slide-over opened by every Get a Quote /
  Enquire, pre-filled with category and design code) and inline on /contact and on Home.
- Fields and validation exactly as in §5. Upload: jpg/png/pdf, ≤10MB, show the file name, allow removal.
- Vercel function site-v3/api/enquiry.js: verify Turnstile, check the honeypot, validate again, then
  send with Resend to ENQUIRY_TO (attachment included) plus an auto-reply to the customer. Return JSON errors.
- On success, navigate to /thank-you and fire the GA4 'generate_lead' event. On failure, show an inline
  error, keep the input, and offer a WhatsApp fallback with the details pre-filled.
- Env: RESEND_API_KEY, ENQUIRY_TO, TURNSTILE_SECRET, VITE_TURNSTILE_SITE_KEY. Add .env.example.
Test: with and without an attachment, invalid phone, oversize file, network failure. Show me the results.
```

## Prompt 8 — Projects, About, Clients, Contact, legal pages

```
Build the pages in SITE-V3-SPEC.md §4.3 plus /catalogue (only if a PDF exists; otherwise leave it out of
nav and prerender), /privacy, /thank-you and the 404:
- Projects: masonry, filter by category and application, lightbox.
- About: tighten ../old data/pages/02_about_us.md using the same facts only; facility units;
  reuse the How We Work section.
- Clients: the 30 logos as a greyscale→colour wall.
- Contact: inline form, phones, email, both addresses, and a Google Map that loads only on click.
- vercel.json: 301 redirects for every old .html URL (see ../old data/pages/00_sitemap_and_navigation.md).
- scripts/sitemap.mjs writes public/sitemap.xml from the prerender route list; add robots.txt.
Screenshot every page at 360 and 1440.
```

## Prompt 9 — Motion and polish pass

```
Do a motion and polish pass across the whole site against SITE-V3-SPEC.md §3.5:
- Consistent reveals on every section, no element animating twice, no layout shift, ScrollTrigger
  refreshed after images load and on route change, and triggers cleaned up on unmount.
- Header behaviour on every route; Lenis with anchor links, the mega menu and the enquiry panel (scroll lock).
- Reduced motion: everything visible with no animation.
- Hover and focus states on every interactive element.
Before/after screenshots at 1440 and 360 for Home and one category page.
```

## Prompt 10 — SEO, performance and accessibility

```
Audit and fix per SITE-V3-SPEC.md §6:
- Lighthouse (mobile) on Home, one category page, Projects and Contact. Targets: Perf ≥90,
  A11y ≥95, SEO 100, LCP < 2.5s. Fix until met and report the scores.
- View-source check: every route's prerendered HTML already contains its H1, title, description and JSON-LD.
- One H1 per page, alt text on every image, canonical URLs, OG images, sitemap, robots, and 301s.
- GSAP and Lenis must not block LCP (load them after first paint).
- Keyboard-only walk-through of the menu, the enquiry panel and the lightbox.
```

## Prompt 11 — Final QA against the acceptance checklist

```
Go through SITE-V3-SPEC.md §9 item by item on the deployed preview. For each item, report pass/fail
with evidence (screenshot path, test output or command output). Fix the failures, then report again.
Finally, list everything still in CONTENT-GAPS.md that blocks launch.
```
