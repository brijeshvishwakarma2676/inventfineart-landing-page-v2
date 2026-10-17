import { Link } from 'react-router';
import { ShieldCheck } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { categories } from '../../data/categories';
import { site, whatsappLink } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

const YEAR = new Date().getFullYear();

const company = [
  { label: 'All products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'About us', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Contact', to: '/contact' },
];

function Col({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-micro font-bold uppercase tracking-eyebrow text-cream/55">{title}</p>
      {children}
    </div>
  );
}

export function Footer() {
  const { open } = useEnquiry();
  return (
    <footer className="bg-dark text-cream">
      <div className="container-site border-b border-cream/12 py-section">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end" data-reveal="up">
          <h2 className="max-w-3xl text-h2 text-cream">
            Have a space in mind? <em className="text-cream/70">Let&rsquo;s give it an identity.</em>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => open()} arrow>
              Get a Quote
            </Button>
            <Button
              variant="onDark"
              href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </Button>
          </div>
        </div>
      </div>

      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-12 py-16 text-small text-cream/80 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-5 lg:col-span-3">
          <Logo className="text-cream" />
          <p className="max-w-xs">{site.pitch}</p>
          <p className="inline-flex items-center gap-2 text-cream/60">
            <ShieldCheck className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {site.certification}
          </p>
        </div>
        <div className="lg:col-span-2">
          <Col title="Products">
            <ul className="flex flex-col gap-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="hover:text-cream">{c.name}</Link>
                </li>
              ))}
            </ul>
          </Col>
        </div>
        <div className="lg:col-span-2">
          <Col title="Company">
            <ul className="flex flex-col gap-2.5">
              {company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-cream">{l.label}</Link>
                </li>
              ))}
            </ul>
          </Col>
        </div>
        <div className="col-span-2 lg:col-span-5">
          <Col title="Get in touch">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-cream">{p.label}</a>
                ))}
                <a href={`mailto:${site.email}`} className="hover:text-cream">{site.email}</a>
              </div>
              <div className="flex flex-col gap-4">
                <address className="not-italic">
                  <span className="block text-cream">{site.office.label}</span>
                  {site.office.lines.join(', ')}
                </address>
                <address className="not-italic">
                  <span className="block text-cream">{site.factory.label}</span>
                  {site.factory.lines.join(', ')}
                </address>
              </div>
            </div>
          </Col>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-cream/12 py-6 text-micro text-cream/55 sm:flex-row sm:justify-between">
        <p>© {YEAR} {site.name}. All rights reserved.</p>
        <Link to="/privacy" className="hover:text-cream">Privacy policy</Link>
      </div>
    </footer>
  );
}
