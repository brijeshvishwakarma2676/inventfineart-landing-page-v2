import { SITE_URL, site } from './site';
import { categories } from './categories';

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  url: SITE_URL,
  description: site.pitch,
  email: site.email,
  telephone: site.phones.map((p) => p.tel),
  foundingDate: String(site.foundedYear),
  image: `${SITE_URL}/img/gallery/grc_products/1-1600.webp`,
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Kandivali East, Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressLocality: 'Vasai–Virar', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  ],
  geo: { '@type': 'GeoCoordinates', latitude: 19.4196725, longitude: 72.7856904 },
  makesOffer: categories.map((c) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name: c.name, url: `${SITE_URL}/${c.slug}` },
  })),
};

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}
