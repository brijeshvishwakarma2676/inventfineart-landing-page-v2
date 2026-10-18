# Content gaps and provisional values

As of 2026-10-17. Every value below is a **stand-in** chosen under spec §7. It can be built and shown, but it must be confirmed by the client, or replaced, before launch.

To find all of them: `grep -rn PROVISIONAL app`. Launch is blocked until that command shows nothing (spec §9).

## Provisional values (file:line)

| # | What | Value used now | Where |
|---|---|---|---|
| 1 | Founding year | 2008 (old Home page: 2008; old About page: 2009) | `app/data/site.js:6` |
| 2 | Stats | 18+ years · 160+ designs · 30+ clients | `app/data/site.js:44` |
| 3 | Certification | "ISO 9001 Certified" (ISO 9001:2008 was withdrawn in 2018; ask for the current certificate) | `app/data/site.js:13` |
| 4 | Enquiry inbox | inventfineart.mum@gmail.com | `app/data/site.js:20` |
| 5 | WhatsApp number | +91 93232 10327 | `app/data/site.js:21` |
| 6 | Hero headline | "Art that gives your space an identity." | `app/data/site.js:31` |
| 7 | Hero video | none; the hero shows the line drawings with a photo of the real piece | `app/data/site.js` (`hero.video`) |
| 8 | Catalogue PDF | none (`/catalogue` is not built) | `app/data/site.js:51` |
| 9 | Sizes | Planters S/M/L/Custom; the rest "Made to your size and drawing" | `app/data/categories.js:17, 37, 59, 79, 100` |
| 10 | Finishes | 5 names; swatches are flat token colours | `app/data/categories.js:110` |
| 11 | FRP banner and designs | photos from `other_products` that look fibre-made (6, 3, 8, 9, 11, 12, 13, 14) | `app/data/categories.js:101`, `app/data/designs.js:53` |
| 12 | GRC Grilles split | `grc_products` 4, 5, 6, 10 = grilles; the other 11 = GRC Products; plus `wall_murals` 12, 13 (jali gates) | `app/data/designs.js:27–28` |
| 13 | Testimonials | none (section hidden) | `app/data/testimonials.js:2` |
| 14 | Architect logos | none (section hidden) | `app/data/clients.js:9` |
| 15 | Logo | wordmark redrawn from the 120 px pebble logo; the vector logo is needed | `app/components/ui/Logo.jsx` |
| 16 | FAQ answers | short general answers from known facts only | `app/data/content.js` (`faqs`) |

## Design titles
- Only these designs have descriptive titles: 9 sculptures, 4 planters, all 15 GRC/GRL photos, and the 8 FRP picks. Those are the photos where the subject is unambiguous.
- The remaining 67 sculptures show "Sculpture design" with their code.
- **Ask the client for names** (and, ideally, size and material) per code. The list is in `app/data/designs.js`.

## Photos still needed for a polished launch
- [ ] Designer planters: 20+ photos (4 on hand)
- [ ] FRP products: 10+ real photos (0 on hand; stand-ins used)
- [ ] GRC grilles: a pattern sheet, one image per pattern (4 photos on hand)
- [ ] 10+ installation or site photos for Projects
- [ ] Hero video: 15–30 s, landscape, at least 1080p, no audio
- [ ] Finish swatch photos (concrete grey, sandstone, matte colour, metallic bronze)
- [ ] Vector logo (SVG/AI/PDF)

## Image quality notes
- 71 source photos are under 1,200 px wide. They're fine in grids but are never used full-bleed.
- Client logos are 142 px wide. They're usable small on the logo wall; ask for larger files.
- Excluded from the catalogue:
  - `sculptures/22`: a concept drawing, not a finished piece.
  - `other_products/10`: an exhibition poster.
