import { index, route } from '@react-router/dev/routes';
import { categories } from './data/categories';

// Every static path here is prerendered to its own HTML file (react-router.config.js).
export default [
  index('routes/home.jsx'),
  route('products', 'routes/products.jsx'),
  ...categories.map((c) => route(c.slug, 'routes/category.jsx', { id: `category-${c.slug}` })),
  route('projects', 'routes/projects.jsx'),
  route('about', 'routes/about.jsx'),
  route('clients', 'routes/clients.jsx'),
  route('contact', 'routes/contact.jsx'),
  route('privacy', 'routes/privacy.jsx'),
  route('thank-you', 'routes/thank-you.jsx'),
  route('styleguide', 'routes/styleguide.jsx'),
  route('*', 'routes/not-found.jsx'),
];
