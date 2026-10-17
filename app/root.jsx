import { useEffect, useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLocation } from 'react-router';
import { useLenis } from 'lenis/react';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import './styles/global.css';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { EnquiryProvider } from './enquiry/EnquiryContext';
import { EnquiryPanel } from './enquiry/EnquiryPanel';
import { LenisProvider } from './motion/LenisProvider';
import { useReveal } from './motion/useReveal';

export const links = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
];

export function Layout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f7f4ee" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/** Jump to the top on page change (Lenis would otherwise keep its old target). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, hash, lenis]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const scope = useRef(null);
  useReveal(scope, pathname);

  return (
    <LenisProvider>
      <EnquiryProvider>
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only z-[80] rounded-button bg-ink px-4 py-3 text-small text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <div ref={scope}>
          <main id="main">
            <Outlet />
          </main>
          <Footer />
        </div>
        <FloatingWhatsApp />
        <EnquiryPanel />
      </EnquiryProvider>
    </LenisProvider>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="container-site flex min-h-[70vh] flex-col items-start justify-center gap-4 py-section">
      <title>{notFound ? 'Page not found | Invent Fine Art' : 'Something went wrong | Invent Fine Art'}</title>
      <h1 className="text-h1">{notFound ? 'Page not found' : 'Something went wrong'}</h1>
      <a href="/" className="font-semibold text-accent">Back to the home page</a>
    </main>
  );
}
