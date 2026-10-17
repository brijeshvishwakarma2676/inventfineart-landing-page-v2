import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { categories } from '../../data/categories';

/** Products mega menu: the five product lines with thumbnail and tagline. */
export function MegaMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    // Any press outside the Products trigger + panel closes it (logo, Get a Quote, the page…).
    const onClick = (e) => {
      if (!e.target.closest('[data-mega-root]')) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  return (
    <div
      id="mega-menu"
      inert={!open}
      className={`absolute inset-x-0 top-full hidden border-b border-line bg-bg text-ink shadow-[0_24px_48px_-24px_rgb(31_29_26/0.25)] transition-all duration-400 ease-out-soft lg:block ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="container-site grid grid-cols-12 gap-8 py-10">
        <div className="col-span-3 flex flex-col justify-between gap-6 pr-4">
          <div className="flex flex-col gap-3">
            <p className="font-sans text-micro font-bold uppercase tracking-eyebrow text-olive">Our products</p>
            <p className="font-display text-h3 leading-snug">
              Five product lines, <em>made to suit your space.</em>
            </p>
          </div>
          <Link
            to="/products"
            onClick={onClose}
            className="group inline-flex items-center gap-2 text-small font-semibold text-accent hover:text-accent-hover"
          >
            View all products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-5 gap-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/${c.slug}`} onClick={onClose} className="group flex flex-col gap-3">
                <span className="block aspect-[4/5] overflow-hidden rounded-image bg-surface-2">
                  <Img
                    id={c.banner.image}
                    alt=""
                    sizes="200px"
                    className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                    style={{ objectPosition: c.banner.position }}
                  />
                </span>
                <span className="text-micro font-extrabold uppercase tracking-label">{c.name}</span>
                <span className="-mt-1.5 font-display text-base italic leading-snug text-ink-muted">{c.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
