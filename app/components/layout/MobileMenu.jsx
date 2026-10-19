import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { X, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useFocusTrap } from '../ui/useFocusTrap';
import { useScrollLock } from '../ui/useScrollLock';
import { categories } from '../../data/categories';
import { menus, site } from '../../data/site';
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

      <nav aria-label="Mobile" className="container-site flex flex-1 flex-col gap-9 overflow-y-auto py-8">
        {menus.map((m) => (
          <div key={m.id}>
            <p className="mb-2 text-micro font-bold uppercase tracking-eyebrow text-olive">{m.label}</p>
            <ul className="flex flex-col">
              {(m.id === 'collections'
                ? categories.map((c) => ({ label: c.name, to: `/${c.slug}`, code: c.code }))
                : m.items
              ).map((item) => (
                <li key={item.label}>
                  {item.action === 'enquiry' ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openEnquiry();
                      }}
                      className="flex w-full items-baseline gap-3 border-b border-line py-3 text-left text-h3 font-extrabold"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-baseline gap-3 border-b border-line py-3 text-h3 font-extrabold ${isActive ? 'text-accent' : ''}`
                      }
                    >
                      {item.code && <span className="w-9 text-micro font-bold tracking-label text-olive">{item.code}</span>}
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
