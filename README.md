# Invent Fine Art — website v3

Static, prerendered React site: React 19 (JS) + Tailwind CSS v4 + React Router v8 (`ssr: false`, `prerender: true`).

- Spec: `docs/SITE-V3-SPEC.md` (source of truth)
- Rules for AI-assisted work: `CLAUDE.md`
- Provisional content and what the client still has to send: `CONTENT-GAPS.md`

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in build/client (+ sitemap.xml)
npm run preview    # serve the build at http://localhost:4173
npm run shots      # screenshots at 360/768/1024/1440 into shots/ (preview must be running)
npm run images     # after adding photos to media-src/
```

Deploy: Vercel, with `vercel.json` included and the output in `build/client`.
