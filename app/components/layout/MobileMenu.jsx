import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { X, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useFocusTrap } from '../ui/useFocusTrap';
import { useScrollLock } from '../ui/useScrollLock';
import { categories } from '../../data/categories';
import { nav, site } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/** Full-screen menu below 1024px. Get a Quote and Call stay pinned at the bottom. */
export function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  const { open: openEnquiry } = useEnquiry();
  useFocusTrap(ref, open, onClose);
  useScrollLock(open);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      data-lenis-prevent
      className={`fixed inset-0 z-[60] flex flex-col bg-bg text-ink duration-400 lg:hidden ${
        // visibility animates only on close, so focus can move in as soon as it opens
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]'
      }`}
    >
      <div className="container-site flex h-[4.75rem] shrink-0 items-center justify-between border-b border-line">
        <Link to="/" onClick={onClose} aria-label="Invent Fine Art, home">
          <Logo />
        </Link>
        <button type="button" onClick={onClose} className="-mr-2 p-2.5" aria-label="Close menu">
          <X className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto py-8">
        <p className="mb-4 font-sans text-micro font-bold uppercase tracking-eyebrow text-olive">Products</p>
        <ul className="mb-8 flex flex-col">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/${c.slug}`}
                onClick={onClose}
                className="flex items-baseline justify-between border-b border-line py-3.5 text-small font-extrabold uppercase tracking-label"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `font-display text-h2 leading-tight ${isActive ? 'italic text-accent' : ''}`}
              >
                {item.mega ? 'All products' : item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-site grid shrink-0 grid-cols-2 gap-3 border-t border-line py-4">
        <button
          type="button"
          onClick={() => {
            onClose();
            openEnquiry();
          }}
          className="rounded-button bg-accent px-4 py-3.5 text-small font-semibold text-white"
        >
          Get a Quote
        </button>
        <a
          href={`tel:${site.phones[0].tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-button border border-ink px-4 py-3.5 text-small font-semibold"
        >
          <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
