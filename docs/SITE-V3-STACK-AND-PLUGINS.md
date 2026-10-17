# Website v3 — Stack and plugins (LOCKED)

As of 2026-10-17. The owner's decision: **hard-coded React (JavaScript) + Tailwind CSS**. There's no CMS, no WordPress and no TypeScript. Everything else below was chosen to fit that.

## 1. Core stack

| Layer | Choice | Why |
|---|---|---|
| UI | **React 19** (JavaScript, `.jsx`) | Owner's choice |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Owner's choice. All tokens live in one `@theme` block. |
| Build | **Vite** | Fast; the team used it in v1 and v2 |
| Routing + SEO | **React Router (v8.4 as built), framework mode, `ssr: false` + `prerender`** | Each page is built to its own **static HTML file** at build time, then hydrates as React. v1 and v2 were browser-rendered SPAs, which search engines index poorly. This fixes that without leaving React. Per-page `<title>`, meta and JSON-LD come from the route `meta` export. |
| Content | **Hard-coded JS data files** in `src/data/` (`site.js`, `categories.js`, `designs.js`, `projects.js`, `applications.js`, `clients.js`) | No CMS, as decided. Adding a design means adding one object. |
| Hosting | **Vercel** | Static output, plus one serverless function for the form (`/api/enquiry.js`, the same pattern v1 used for `api/`). Every change gets a preview URL for client review. |

## 2. Libraries (all free)

| Need | Package | Notes |
|---|---|---|
| Scroll motion | `gsap` + `@gsap/react` (`useGSAP`) | ScrollTrigger reveals and the pinned "Collections" section. All GSAP plugins have been free since 2025. |
| Smooth scroll | `lenis` (`lenis/react`) | Synced to the ScrollTrigger ticker |
| Sliders | none (as built) | The hero crossfade and the mobile swipe rows use plain React and CSS scroll-snap. Add `swiper` only if a later step needs it. |
| Lightbox | `yet-another-react-lightbox` | React-native, touch zoom, keyboard support |
| Images | `sharp` via `scripts/images.mjs` (as built) | Builds WebP at 480, 960, 1600 and 2400 px with `srcset`, plus a manifest. It runs once per photo change rather than every build, so builds stay fast. Originals stay untouched in `media-src/`. |
| Fonts | `@fontsource-variable/manrope`, `@fontsource/cormorant-garamond` | Self-hosted |
| Icons | `lucide-react` | |
| Forms | `react-hook-form` | Validation, file field |
| Email | `resend` (in `/api/enquiry.js`) | Free tier, attachments, auto-reply |
| Spam | Cloudflare Turnstile (`@marsidev/react-turnstile`) + honeypot | Invisible |
| Analytics | GA4 + Microsoft Clarity (script tags, after consent) | Conversion tracking, plus heatmaps to show the client |
| Lint | `oxlint` | Same as v1 |
| Sitemap | Small build script `scripts/sitemap.mjs` from the route list | |

**Not used:** Three.js, framer-motion, chatbot or AI APIs, newsletter tools, or any CSS framework or UI kit besides Tailwind.

## 3. AI build tooling (install before Prompt 0)

These "rules and configuration" are what make a prompt-built site look designed rather than generic.

1. **`site-v3/CLAUDE.md`.** Prompt 0 creates it. It holds the locked tokens, rules and commands. Claude Code reads it on every request, which stops the drift seen in v1 and v2.
2. **Anthropic's `frontend-design` plugin for Claude Code.** It steers the model away from generic "AI-looking" UI:
   ```
   /plugin marketplace add anthropics/claude-code
   /plugin install frontend-design@claude-code-plugins
   ```
   Check the exact name in `/plugin` if the install fails.
3. **Playwright MCP.** Claude screenshots the site at 360, 768, 1024 and 1440 px and fixes what it sees:
   ```
   claude mcp add playwright -- npx @playwright/mcp@latest
   ```
4. **Context7 MCP.** It gives Claude current docs for React Router v7, Tailwind v4 and GSAP, so it doesn't write outdated APIs:
   ```
   claude mcp add context7 -- npx -y @upstash/context7-mcp
   ```

## 4. Still needed before Prompt 0
- [ ] Vercel account or team, and domain access for `inventfineart.com`
- [ ] Resend account, with a verified sending domain (or the client's Gmail as reply-to for now)
- [ ] Turnstile site key, plus GA4 and Clarity IDs (the client's Google account, so they own the data)
- [x] Enquiry inbox email and WhatsApp number: provisional values set in spec §7 (rows 4–5)
- [ ] Folder: `site-v3/` in this root. `frontend/` (v1) and `frontend-demo/` (v2) stay untouched for reference.
