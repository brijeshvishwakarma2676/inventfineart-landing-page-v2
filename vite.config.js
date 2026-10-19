import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Where this build is served, for link previews (og:image, og:url). Same value in the prerender and the browser
// bundle. VITE_PREVIEW_ORIGIN wins; on Vercel: the project's domain for production, the branch URL for previews.
const env = process.env;
const previewOrigin =
  env.VITE_PREVIEW_ORIGIN ||
  (env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (env.VERCEL_BRANCH_URL && `https://${env.VERCEL_BRANCH_URL}`) ||
  'https://inventfineart-landing-page-v2.vercel.app';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: { __PREVIEW_ORIGIN__: JSON.stringify(previewOrigin.replace(/\/$/, '')) },
});
