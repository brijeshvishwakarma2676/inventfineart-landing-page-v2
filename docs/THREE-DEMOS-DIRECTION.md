# Three demos, three directions

As of 2026-10-19. Written after the client's WhatsApp reply on 18 Oct about the three demo links:

- v4: https://inventfineart-landing-page-v4.vercel.app/ (`site-v4/`)
- v2: https://inventfineart-landing-page-v2.vercel.app/ (`site-v3/`, built in session `9843487b-f6d5-4f62-86cb-6cdd17bb4455`)
- Demo 3: https://inventfineart.vercel.app/

The client: **"All are in same style. Only background color is different."**

## 1. Why they said it

They are right. The three demos share everything except the palette and the fonts:

| | v4 | v2 | Demo 3 |
|---|---|---|---|
| Hero | Dark band, headline left, line drawing right, 01–05 strip | Same | Same (the drawings started here) |
| Home order | Product lines, trust band, selected works, materials, process, clients, FAQ, enquiry | Same order | Same order |
| Navigation | Products ▾ · Projects · About · Clients · Contact · Get a Quote, dark header, floating WhatsApp | Same | Same |
| Copy | Same headings, taglines, intros and stats | Same | Same |
| Photos | Same photos in the same places | Same | Same |
| Link preview in WhatsApp | Title and description nearly identical; **no picture** | Same | Same |
| What differs | Graphite and oxide, condensed capitals | Brown-black and bronze, serif | Black and bronze |

How it happened:
- All three grew from the same plan, code and content. Each version reused the last one's components, data and section order.
- Restyling changed colours and fonts, not structure. A client judges a site at a glance: the hero, the rhythm of the page, the photos. So a new palette reads as the same site re-skinned.
- The line drawings were then copied into v2 and v4 as well, which made all three heroes identical.

**Why there is no picture in the WhatsApp previews.** Each demo's `og:image` points at `https://www.inventfineart.com/img/…`. That domain still serves the old site, so the image never loads. Each demo needs a preview image on its own Vercel URL until the domain moves.

## 2. What the client's three inspiration sites actually do

These come from `new-design.md`. They were checked on 2026-10-19 at 1440 px and 390 px.

### Ferrocon (ferrocon.co.in): minimal, architectural
- **Hero:** black, one short statement headline ("Let's Play With Concrete"), beside a white line drawing of their products with one person for scale.
- **Product categories:** straight after the hero, as big rounded photo tiles with a label bar: Planters, Jaali Screens, Wall Panels, Veneer, Bespoke.
- **Products menu:** lists named collections under each category (Gothra, Silpika, Bodhi…).
- **What's New:** three story cards (project stories and news).
- **Logo walls:** "Client Collaborations", then "Architecture Collaborations".
- **Overall:** a short page (about 3 screens) on a white page, with very little text.

### Metals Sculpture / YouFine (metalssculpture.com): catalogue-first manufacturer
- **Header:** a top bar with email, WhatsApp and social icons.
- **Navigation:** by **Application** (garden, hotel, square, pool…) and by **Theme/Style**.
- **Hero:** a full-width photo with the title centred on it, plus a one-line "one-stop solution: design → fabrication → transport and installation".
- **Hot products:** a large grid of product photos, each titled with its model code (e.g. "CSS-14").
- **Finishes:** shown as big circular photo swatches (Mirror, Corten, Matted, Painted, Coated).
- **Why choose us:** six icon cards, then a factory video with an about text.
- **Applications:** a grid by place (public parks, commercial plazas, hotels and resorts, malls, villas, landmarks).
- **Further down:** the fabrication process in steps, buying guides, and latest products.
- **Overall:** a white, very long page, built for search.

### Bonasila (bonasila.com): brand-led and lifestyle
- **Hero:** a full-bleed lifestyle photo with a huge bold headline in white, plus one "Explore the range" link.
- **Statements:** large typographic lines ("You're planting, and also decorating."), with a handwritten script word.
- **Collections:** each collection is an editorial split block: name, one-line pitch, short text, "Explore the … collection", and studio shots on tinted backgrounds. A fixed side index of collection initials follows the scroll.
- **Other blocks:** quality "up close" with a photo, a video, "Sizes, shapes, colours and textures for all", "We do everything from scratch" (process), and "You may have seen us in" (press).
- **Overall:** a warm cream page, one earthy accent, a playful voice.

## 3. One direction per demo

Each demo follows one inspiration site, so the client compares three real options. **The line drawings belong to Demo 3 only. v4 and v2 remove them.**

| | v4 | v2 | Demo 3 |
|---|---|---|---|
| Follows | Metals Sculpture: the catalogue | Bonasila: the brand story | Ferrocon: architectural minimal |
| Hero | Full-width photo slideshow, title centred on a scrim | Full-bleed lifestyle photo, huge bold headline | Black line-art hero, one statement, no slideshow strip |
| Page colour | White, charcoal text, oxide accent | Warm cream, one earthy accent (olive or terracotta), no black bands | White page, black hero, no accent colour |
| Signature | Product grid with design codes, finishes as circles, applications by place | One editorial split block per product line, side index | Rounded category tiles, logo walls, very little text |
| Type | Archivo, normal width, sentence case (no condensed capitals) | Big bold sans statements, one script or serif accent | Small geometric sans, light weights |
| Navigation | Products ▾ · Applications ▾ · Projects · About · Contact | Three menus (Collections · Business · About), plus the side index | Home · Products ▾ (categories with collections) · About · FAQ · Get in touch |
| Length | Long, built for search | Medium, editorial | Short (3–4 screens) |

## 4. Changes per demo

### v4 (`site-v4/`): towards Metals Sculpture
1. **Remove:** the graphite sketch hero, the Sketchbook band and the line drawings in the card hover views (keep the second photo on hover).
2. **Theme:** white page and light-grey bands, charcoal text, oxide as the only accent. Headlines in Archivo at normal width, sentence case.
3. **Top bar:** phones, email and WhatsApp above the header.
4. **Hero:** full-width photo slideshow (photos at least 2,400 px) with the H1 centred on a scrim. The one-stop line is the old site's own words: "start to end solutions, from conceptualization to the complete execution". Buttons: Explore products, Get a Quote. This changes plan rule 14 (no text on photos): update the plan first.
5. **Featured designs:** a grid of 8–12 designs with their IFA codes, each with Enquire. This uses the catalogue we already have.
6. **Product lines:** five large tiles.
7. **Finishes:** circular swatches (the finish values stay PROVISIONAL).
8. **Why choose us:** icon cards built only from sourced facts: own manufacturing unit (the 4 facility units), made as per your design and requirement, start-to-end solutions, turnkey projects, packing and fixing. No "40 years", 3D/CAD, R&D or shipping claims: those are YouFine's.
9. **Rest of Home:** a factory and about block with facility photos, applications by place (`data/applications.js`), process steps, latest projects, a clients wall, FAQ, enquiry.
10. **Navigation:** an Applications menu next to Products.

### v2 (`site-v3/`, session `9843487b-f6d5-4f62-86cb-6cdd17bb4455`): towards Bonasila
1. **Remove:** the line-art hero, the "Fig. 0N" sketch panel and the 01–05 strip (the strip stays in v4 only, if anywhere).
2. **Theme:** light and warm. Cream page, one earthy accent, no black hero and no black bands. Keep the serif only as an accent.
3. **Hero:** a full-bleed lifestyle photo (at least 2,400 px, e.g. a planter or garden sculpture in place) with one huge bold headline and "Explore the range". Keep the text readable with a soft gradient at the bottom-left, and test the contrast.
4. **Statement block:** a big typographic statement under the hero, from the brief's own lines (e.g. "Art That Gives Your Space a Distinctive Identity"), with one accent word in script or serif italic.
5. **Product lines as collections:** one editorial split block per line, alternating left and right. Each has the name, the brief's tagline, the brief's intro word for word, "Explore …", and 2–3 photos on tinted panels. Add a fixed side index (S · P · G · G · F) that follows the scroll.
6. **"Up close" block:** the old About page's "stringently examined on numerous factors" with a facility photo.
7. **"Made from scratch" block:** the 5 process steps from the old About page.
8. **"You may have seen us in":** the client logos.
9. **End of page:** enquiry, then the footer.
10. **Link preview:** its own title, description and a 1200 × 630 JPG preview image on its own Vercel URL.

### Demo 3 (inventfineart.vercel.app): towards Ferrocon
1. **Hero:** keep the black line-art hero (it is this demo's signature) as one scene with one statement headline. Drop the progress strip.
2. **Product tiles:** straight after the hero, five rounded photo tiles with label bars, plus a "Made to your design" tile.
3. **Collections:** the products menu lists collections under each line. This needs the client's real design names (open gap).
4. **What's New:** three project stories.
5. **Logo walls:** a clients wall, and an architects wall only if the client names real architects.
6. **Overall:** a white, short page with little text.
7. **Link preview:** its own title, description and preview image. Its current description copies v2's word for word.

## 5. Rules for all three

- **No invented facts.** The inspiration sites' claims (years, countries, SKU counts, 3D/CAD, R&D, certificates) are theirs. Use only the brief, the old site, or values marked PROVISIONAL in `site-v4/CONTENT-GAPS.md`.
- **Own home order.** No two demos use the same section order, hero type or navigation.
- **Own link preview.** Each demo has its own preview title, description and image, served from its own Vercel URL until the domain moves.
- **Compare before sending.** Screenshot the three homes side by side at 1440 px and 390 px. If two could pass for the same site, change the one that is closest.
