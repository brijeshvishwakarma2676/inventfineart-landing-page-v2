import { useLocation } from 'react-router';
import { PREVIEW_ORIGIN, SITE_URL, site } from '../../data/site';

/**
 * Per-page head tags (React 19 hoists <title>/<meta>/<link> into <head>) plus optional JSON-LD.
 * `og` names a 1200×630 preview in public/og/ (scripts/og.mjs). Previews and og:url point at PREVIEW_ORIGIN,
 * where this demo is served; the canonical link stays on the client's domain.
 */
export function Seo({ title, description, og = 'home', noindex = false, jsonLd }) {
  const { pathname } = useLocation();
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const image = `${PREVIEW_ORIGIN}/og/${og}.jpg`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL + path} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={PREVIEW_ORIGIN + path} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      {ld.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </>
  );
}
