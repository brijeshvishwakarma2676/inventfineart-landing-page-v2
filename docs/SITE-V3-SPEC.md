# Invent Fine Art — Website v3 Spec

As of 2026-10-17. This is the **single source of truth** for the v3 build. If another document disagrees with this one, this one wins. Product copy comes from `new-design.md`, and company facts come from `old data/`.

Companion files:
- `SITE-V3-STACK-AND-PLUGINS.md` holds the **locked** stack: hard-coded React (JS) + Tailwind CSS v4, prerendered with React Router v7, plus the libraries and AI tooling.
- `SITE-V3-BUILD-PROMPTS.md` holds the prompts to paste, in order, into the AI coding agent.

---

## 1. Why v1 and v2 missed the client's expectations

Sources: `frontend/` (v1), `frontend-demo/` (v2), `frontend/src/docs/` and `new-design.md`.

| # | What went wrong | Evidence | What v3 does differently |
|---|---|---|---|
| 1 | **The site was organised around the old site, not the client's five product lines.** | v1 routes are `/gallery/{sculptures, wall-murals, water-fountains, grc-products, planters, other}`. GRC Grilles and FRP Products have no pages. v2 added `/grc-grilles` and `/frp-products` on one generic `ServicePage`, but kept the old gallery as a second, competing navigation. | The five product lines are the backbone: the menu, the home page and the URLs are all built on them. Old work goes under **Projects**. |
| 2 | **Wrong mood.** | The `tokens.css` background is `#0e0d0c` (near-black), with a terracotta accent and Fraunces. That reads as a dark art gallery. All three reference sites are **light**, photo-led manufacturer sites. | A light palette in warm stone, cream and charcoal, with a bronze accent (§3). |
| 3 | **Rules removed the energy the references have.** | Doc 10 bans shadows, parallax, count-up stats, hover lift, and hover zoom above 1.02. Bonasila uses GSAP, ScrollTrigger and Lenis. Metals Sculpture has stats bands and many CTAs. | Purposeful motion is allowed and specified (§3.5). The ban list is short and targets cheap effects only. |
| 4 | **Effort went into features nobody asked for.** | An AI chatbot with API, evals and a knowledge build; a Three.js 3D gallery; an intro overlay; a newsletter; awards; a marquee. That is 32 components. | None of these are in v3 scope. The effort goes into what the references do well: category presentation, enquiry flow and trust. |
| 5 | **Weak conversion path.** | The form handed off to WhatsApp, there was no "Get a Quote" in the header, and there was no enquiry per design. | There's a "Get a Quote" button in the header, an "Enquire" button on every design, a floating WhatsApp button, and a form with an enquiry-type field and file upload (§5). |
| 6 | **Too many docs, decided too late.** | 14 docs, about 1,900 lines, and a 315-line build prompt. Doc 10 admits that the stack and page count were never locked and contradictions were patched afterwards. | Three short docs and one `CLAUDE.md`. Decisions are locked before code, and the client signs off on a home-page mock-up before other pages are built (§8). |
| 7 | **Photos too small for a premium layout.** | Measured: hero slides have a median width of 784 px, home-page photos about 555 px, and service photos about 270 px. There are 4 planter photos, 15 GRC photos with grilles mixed in, and **0 FRP photos**. | Client photo and video requirements are listed in §7. Small images are never used full-bleed. |

---

## 2. Design direction: what to borrow from each reference

| Take from | What to borrow | What to avoid |
|---|---|---|
| **Bonasila** (look and feel) | Warm cream and stone palette; refined type; a fixed header that is transparent over a full-screen video hero; collection storytelling with a **sticky text column and scrolling product cards**; smooth GSAP, ScrollTrigger and Lenis motion; a product page with gallery, finish swatches, size table and dimension drawing | No enquiry path; made-up brand words |
| **Ferrocon** (category impact) | **Full-bleed category banners** with a bold label strip; a short, punchy material-led headline; **client and architect logo walls** | No form, phone or WhatsApp; thin pages |
| **Metals Sculpture** (conversion and depth) | Top info bar (phone, email, WhatsApp); "Get a Quote" everywhere; **enquiry form with type dropdown and file upload**; floating WhatsApp; browsing **by application** as well as by product; finishes section; "How We Work" process; stats band; installation photos; catalogue download | A 19-section home page; cluttered, dated corporate styling |

**In one line:** Bonasila's calm luxury, Ferrocon's bold category banners, and Metals Sculpture's enquiry machinery.

---

## 3. Design system (locked)

### 3.1 Colour

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F7F4EE` | Page background (limestone) |
| `surface` | `#EFEAE1` | Alternate section background (stone) |
| `surface-2` | `#E4DDD0` | Cards, image placeholders (sand) |
| `line` | `#D6CEC0` | Borders and dividers |
| `ink` | `#1F1D1A` | Headings and body text (charcoal) |
| `ink-muted` | `#5E5850` | Secondary text |
| `accent` | `#8A6A3F` | Bronze: primary buttons, links, highlights. White text on it is about 5:1 |
| `accent-hover` | `#6F542F` | Button hover |
| `olive` | `#6B6A4B` | Second accent, used sparingly (tags, eyebrows) |
| `dark` | `#1F1D1A` | Dark bands: stats, footer, CTA band. Text on these is `#F2EDE4` |
| `whatsapp` | `#25D366` | The floating WhatsApp button **only** (it should be instantly recognisable) |

The page is **light** overall. Dark bands appear at most 2–3 times on a page, for rhythm.

### 3.2 Typography (Google Fonts, self-hosted through Fontsource)
- **Display:** *Cormorant Garamond* 500/600. Used for hero and section headlines (fine-art character). Italic for taglines, such as "Where Nature Meets Design".
- **UI and body:** *Manrope* 400–800. Category labels in Manrope 800, **UPPERCASE**, letter-spacing 0.08em. This is the Ferrocon punch.
- Scale (desktop / mobile): H1 72/44, H2 48/34, H3 28/24, body 17/16, small 14. Line-height 1.1 for headings, 1.65 for body.

### 3.3 Layout
- Container max-width 1320 px. Gutter 24 px on desktop and 16 px on mobile.
- Section padding 120 px on desktop and 72 px on mobile. Spacing follows an 8 px scale.
- Image radius 4 px. Button radius 2 px (sharp and architectural, not pills).
- Breakpoints: 360, 768, 1024, 1440. Every page is checked at each one.

### 3.4 Components
- **Buttons.** Primary is a bronze fill. Secondary is a charcoal outline. On dark sections, use a cream outline. Arrows animate 4 px on hover.
- **Category banner.** Full-bleed photo, a 55% charcoal label strip, the label in Manrope 800 uppercase, the tagline in Cormorant italic, and a "View range →" link.
- **Design card.** Image at 4:5, design code (for example `IFA-SC-012`) and name. On hover the image zooms to 1.05 and an **Enquire** button appears. It's always visible on touch screens.
- **Stats band.** Dark background, 3–4 numbers that count up once. **Real figures only** (§7).
- **Logo wall.** Greyscale logos that turn colour on hover. Two rows: Clients and Architects.

### 3.5 Motion (with GSAP, ScrollTrigger and Lenis)
- Lenis smooth scroll across the whole site.
- Section reveal: fade up 24 px over 0.8 s with `power3.out`, staggering children by 0.08 s.
- Images reveal with a clip-path wipe and a scale from 1.08 to 1.
- Home "Collections" section: sticky left column with pinned scroll.
- Hero: slow video. If there's no video, a crossfade slider with gentle Ken Burns movement (scale to at most 1.06).
- Header: transparent over the hero, solid `bg` after 80 px of scroll, and hidden on scroll-down / shown on scroll-up.
- **Not allowed:** bounce, spin, rotating text, cursor trails, loading-screen intros, gradient text, or autoplay audio.
- Everything respects `prefers-reduced-motion` (no animation; content shown at once).

---

## 4. Site map and page specs

```
/                        Home
/products                Products hub (5 category tiles + browse by application)
  /sculptures
  /designer-planters
  /grc-products
  /grc-grilles
  /frp-products
/projects                Installations and past work (includes old murals, fountains, rockery)
/about                   Story, ISO 9001, facility, how we work
/clients                 Client and architect logo walls (+ testimonials if supplied)
/contact                 Enquiry form, phones, email, office and factory, map
/catalogue               Catalogue PDF download (gated by name and phone, optional)
/privacy, /404
```
Old `.html` URLs redirect with a 301 to the matching new page.

**Header** (every page)
- Top bar (desktop only): phones · email · WhatsApp · "ISO 9001 Certified".
- Main row: logo · **Products** (mega menu with 5 thumbnails and taglines) · Projects · About · Clients · Contact · **[Get a Quote]** button.
- Mobile: full-screen menu, with the "Get a Quote" and "Call" buttons pinned at the bottom.

**Footer:** logo and one-line pitch · product links · company links · office and factory addresses · phones and email · social links · "© Invent Fine Art".

**Floating, on every page:** WhatsApp button (bottom right) with a pre-filled message that names the current page.

### 4.1 Home (11 sections, in this order)
1. **Hero.** Full-screen video (or slider). Eyebrow: "Sculptures · Planters · GRC · FRP". H1, a draft for the client to approve: *"Art that gives your space an identity."* Sub: *"Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop."* Buttons: [Explore Products] [Get a Quote].
2. **Category banners** (Ferrocon). Five banners in this order: Sculptures, Designer Planters, GRC Products, GRC Grilles, FRP Products. Each shows its tagline from `new-design.md`.
   - *As built (2026-10-17):* on desktop these are five tall panels in a row, each with the Ferrocon label strip. The panel under the pointer widens and shows its tagline. Below 1,024 px they become cards.
   - Why: several category photos are portrait or under 1,600 px wide, so full-width stacked banners would look blurry.
   - Revisit once the client's new photos arrive.
3. **Intro and stats.** Two lines of brand story ("a community of artists… since 20XX", see §7), then a dark stats band.
4. **Collections** (Bonasila). A sticky left column (category name, tagline, two lines of copy, link) next to 4–6 scrolling design cards per category, for 3 categories (Sculptures, Planters, GRC Grilles).
5. **Browse by application** (Metals Sculpture). Six tiles: Residences · Gardens & Landscapes · Hotels & Hospitality · Commercial Spaces · Façades & Architecture · Public & Large-scale Projects. Each links to `/products?use=…`.
6. **Materials and finishes.** GRC, FRP, Fibre, Metal, Stone-finish, Painted and textured. A swatch row with one line per material. This needs swatch photos from the client.
7. **How we work.** Five steps on a horizontal line: Concept → Design & approval → Mould & manufacturing → Quality check → Delivery & installation. The steps come from the old About page: "conceptualisation to complete execution", QC unit, R&D unit, packaging.
8. **Featured projects.** A masonry grid of 6 installations, then "View all projects".
9. **Trusted by.** Client logo wall. Add the architect logo wall if the client supplies it.
10. **Testimonials.** **Only if the client supplies real quotes.** Otherwise leave the section out. Never invent them.
11. **Enquiry.** Split section: short pitch with phone and WhatsApp on the left, the enquiry form on the right (§5).

### 4.2 Category page template (all 5 categories use it)
1. Banner: photo, breadcrumb, H1 (category name), tagline in italic.
2. Intro: the category copy from `new-design.md`, word for word, plus a "Suitable for" line.
3. Application filter: text tabs (All · Residences · Gardens · Hotels · Commercial · Façades). The filter works on the client side.
4. **Design grid**: 3 columns on desktop, 2 on tablet, 1 on mobile. Each card has a design code and **Enquire** (which opens the form pre-filled with the code). Clicking the image opens a lightbox gallery.
5. **Customisation block**: sizes, finishes and materials, as a small table plus swatches. Plus the line "Share your concept; we make to your drawing."
6. Related projects (3).
7. Category FAQ (4–6 questions) with FAQ schema.
8. Enquiry CTA band, with the form pre-filled with this category.

Per-category notes:

| Page | Photos on hand | Extra content to show | Gap |
|---|---|---|---|
| Sculptures | 77 (median width 1,552 px) | Materials: fibre, metal, stone, bronze, mixed media | Sizes and finish names |
| Designer Planters | **4** | Shapes, sizes, finishes (a Bonasila-style swatch grid) | **Needs 20+ photos**, a size range and a finish list |
| GRC Products | 15 (grilles mixed in) | Façade elements, cornices, columns, mouldings, cladding | Separate the grille photos; add project photos |
| GRC Grilles | Shared with GRC | Pattern library: traditional and geometric, with pattern codes | **Needs a pattern sheet** (one image per pattern) |
| FRP Products | **0** | Applications and the "made to your requirement" process | **Needs 10+ photos** |

**Phase 2** (after launch, once the client supplies specs): an individual product page for each design at `/{category}/{code}`. It follows Bonasila's layout: gallery slider, size table, finish swatches, dimension drawing, **Enquire** tab and related designs.

### 4.3 Other pages
- **Products hub:** the five category tiles, then the six application tiles.
- **Projects:** a filterable masonry grid (by category and application) with a lightbox. Old wall murals, water fountains, rockery and "other" photos live here.
- **About:** story · ISO 9001 · facility units (Manufacturing, Warehousing & Packaging, Quality Control, R&D) · How we work · CTA.
- **Clients:** 30 logos from `old data/media/clients/`, plus architects and testimonials if supplied.
- **Contact:** the full form, three phone numbers, email, the Kandivali East office, the Vasai/Virar factory, and a Google Map that loads on click (privacy and speed).

---

## 5. Enquiry system (the most important feature)

**Form fields:** Name* · Phone* (India format) · Email · City · I am a (Homeowner / Architect / Interior Designer / Builder or Developer / Hotel or Hospitality / Other) · Product interest (the 5 categories, choose several) · Design code (pre-filled) · Approx. quantity or size · Message · **Upload drawing or reference** (JPG, PNG or PDF, up to 10 MB) · Consent checkbox.

**Behaviour:**
- Submissions email the client and send an auto-reply to the customer.
- After a successful submit, the visitor goes to `/thank-you`, which carries the conversion event.
- If the submit fails, the form shows a message and offers a WhatsApp button. The visitor's input is kept.
- Spam protection: honeypot field plus Cloudflare Turnstile.
- Every "Enquire" or "Get a Quote" button opens the **same** form as a slide-over panel, so there's no page change.
- WhatsApp links use `wa.me/91XXXXXXXXXX?text=` with a pre-filled message: "Hi, I'm interested in {design code / page}".

---

## 6. SEO and performance targets
- Every page is prerendered static HTML. That means no client-side-only rendering, so the product pages can rank.
- Unique title and meta description for each page. Draft titles:
  - "GRC Jali & Grilles Manufacturer in Mumbai | Invent Fine Art"
  - "Designer Planters for Homes, Hotels & Landscapes | Invent Fine Art"
  - "FRP Products, Custom Made | Invent Fine Art"
  - and so on for the other pages.
- Structured data: `LocalBusiness` (with both addresses), `Product`/`CollectionPage` on category pages, `FAQPage`, and `BreadcrumbList`.
- Images are AVIF or WebP with `srcset`, lazy-loaded below the fold. The hero image is preloaded.
- Lighthouse targets on mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100. LCP under 2.5 s. Every image has descriptive alt text.
- Ship a sitemap and robots.txt, plus 301s from the old `.html` URLs.

---

## 7. Client inputs: provisional values (build with these now, change later)

The owner decided on 2026-10-17 to **build with the provisional values below** and replace them once the client confirms. Rules:
- Every provisional value lives in **one place**: `app/data/site.js`, or the named data file. Each is marked `// PROVISIONAL – confirm with client`, so changing one is a one-line edit.
- `CONTENT-GAPS.md` lists each value with its file and line.
- Before launch, each row needs either client confirmation or a replacement.

| # | Question for the client | Provisional value used now | Lives in |
|---|---|---|---|
| 1 | Founding year: 2008 (old Home) or 2009 (old About)? | **2008**. Copy reads "Since 2008". | `site.js` → `foundedYear` |
| 2 | Stats to show | **18+ Years of craft** (computed as current year minus `foundedYear`) · **160+ Designs crafted** (166 photos in the old gallery) · **30+ Corporate clients** (30 logos on file). Three stats only. | `site.js` → `stats` |
| 3 | ISO certificate still valid? (ISO 9001:2008 was withdrawn in 2018) | Show **"ISO 9001 Certified"** with no version or year | `site.js` → `certification` |
| 4 | WhatsApp number | **+91 93232 10327** (the first number listed on the old site) | `site.js` → `whatsapp` |
| 5 | Enquiry inbox | **inventfineart.mum@gmail.com** | Env `ENQUIRY_TO` |
| 6 | Hero headline | **"Art that gives your space an identity."** plus the sub-line from §4.1, as drafted | `site.js` → `hero` |
| 7 | Hero video | **None yet.** Use the crossfade slider (§3.5) with the 3 highest-resolution photos of at least 2,400 px | `site.js` → `hero.video: null` |
| 8 | Planter photos (only 4 on hand) | Use the **4 existing photos**, plus the "Made to your design" panel (§4.2 rule for fewer than 6 designs) | `designs.js` |
| 9 | FRP photos (none on hand) | Banner = the best large photo from `other_products`. Page = the "Made to your design" panel plus 3 sculpture or other-product photos that look fibre-made, each tagged `provisional: true` | `designs.js` |
| 10 | GRC grille pattern sheet | Claude splits the 15 `grc_products` photos: jali, grille or screen-pattern photos become **IFA-GRL** and the rest stay **IFA-GRC**. The split goes in `CONTENT-GAPS.md` for review | `designs.js` |
| 11 | Sizes | Planters: **Small 12–18 in · Medium 18–30 in · Large 30–48 in · Custom**. Sculptures, GRC and FRP: **"Made to your size and drawing"** | `categories.js` → `sizes` |
| 12 | Finishes and materials | **Materials:** GRC, FRP, Fibre, Metal, Stone. **Finishes:** Natural concrete grey, Sandstone texture, Matte colour, Metallic bronze, Custom colour. Swatches are flat token-toned tiles until photos arrive | `categories.js` → `finishes` |
| 13 | Architect logos | **None.** Show only the client logo wall | `clients.js` → `architects: []` |
| 14 | Testimonials | **None.** The section is hidden (renders only when there are entries) | `testimonials.js` → `[]` |
| 15 | Catalogue PDF | **None.** `/catalogue` is left out of the nav and the build | `site.js` → `catalogueUrl: null` |
| 16 | Keep murals, fountains and rockery? | **Yes, under Projects only** (not in the Products menu) | `projects.js` |
| 17 | Category FAQ answers | Short, general answers built only from facts in `new-design.md` and `old data/` (custom sizes, indoor and outdoor use, delivery and installation) | `categories.js` → `faq` |

Still needed from the client for a polished launch (these don't block the build):
- 20+ planter photos and 10+ FRP photos.
- 10+ installation photos.
- A hero video: 15–30 s, at least 1080p.
- Real finish swatch photos.

---

## 8. Process: how we avoid a third miss

1. **Lock decisions:** this spec, the stack (already locked) and the client inputs in §7.
2. **Mock-up first.** Build only the header, hero, category banners and collections section, with real photos. Show it to the client on desktop **and** phone. **Get written sign-off on the look before building anything else.**
3. Build the remaining pages from the approved look.
4. QA against §9, then the client reviews the staging URL, then launch.

## 9. Acceptance checklist (client sign-off)
- [ ] Menu, home and URLs are built on the 5 product lines. GRC Grilles and FRP each have their own page.
- [ ] Light, warm palette and fonts exactly as in §3. No off-token colours.
- [ ] Every design card has Enquire. The header has Get a Quote. WhatsApp shows on every page.
- [ ] A test enquiry with an upload reaches the client's inbox, and the auto-reply arrives.
- [ ] Checked at 360, 768, 1024 and 1440 px with no horizontal scroll. The mobile menu works.
- [ ] Reduced motion is respected. Lighthouse targets in §6 are met.
- [ ] No invented stats, clients, testimonials or certifications. No placeholder or lorem text.
- [ ] Every `// PROVISIONAL` value in §7 is confirmed by the client or replaced (`grep -rn PROVISIONAL app` shows nothing).
- [ ] Old URLs redirect. The sitemap is submitted to Search Console. Analytics records the enquiry conversion.
