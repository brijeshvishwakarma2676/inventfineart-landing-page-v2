import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { categories } from '../../data/categories';
import { useEnquiry } from '../../enquiry/EnquiryContext';

// Lead-in and photo for the two link menus (wording from the old About page).
const SIDE = {
  business: { lead: 'For designers, architects and their projects.', image: 'gallery/wall_murals/9', position: '50% 50%' },
  about: { lead: 'A team of artisans and product designers.', image: 'gallery/sculptures/78', position: '50% 30%' },
};

/**
 * One full-width header panel (Bonasila-style): Collections shows the five product lines with a photo each;
 * Business and About are short link lists with a photo. Closes on Esc, on a press outside its menu, or on a link.
 */
export function NavPanel({ menu, open, onClose }) {
  const { open: openEnquiry } = useEnquiry();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const onPress = (e) => {
      if (!e.target.closest(`[data-menu-root="${menu.id}"]`)) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPress);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPress);
    };
  }, [open, onClose, menu.id]);

  const side = SIDE[menu.id];

  return (
    <div
      id={`menu-${menu.id}`}
      inert={!open}
      className={`absolute inset-x-0 top-full hidden border-b border-line bg-bg text-ink shadow-[0_24px_48px_-24px_rgb(35_33_28/0.22)] transition-all duration-400 ease-out-soft lg:block ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      {menu.id === 'collections' ? (
        <div className="container-site grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3 flex flex-col justify-between gap-6 pr-4">
            <div className="flex flex-col gap-3">
              <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Collections</p>
              <p className="text-h3 font-extrabold leading-snug">
                Five collections, <em>one workshop.</em>
              </p>
            </div>
            <Link
              to="/products"
              onClick={onClose}
              className="group inline-flex items-center gap-2 text-small font-semibold text-accent hover:text-accent-hover"
            >
              All products side by side
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
                  <span className="text-micro font-bold uppercase tracking-label text-olive">{c.code}</span>
                  <span className="-mt-2 text-small font-extrabold">{c.name}</span>
                  <span className="-mt-2 font-display text-base italic leading-snug text-ink-muted">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container-site grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3 flex flex-col gap-3 pr-4">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">{menu.label}</p>
            <p className="text-h3 font-extrabold leading-snug">{side.lead}</p>
          </div>
          <ul className="col-span-6 flex flex-col divide-y divide-line border-y border-line">
            {menu.items.map((item) => {
              const inner = (
                <>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-body font-extrabold">{item.label}</span>
                    <span className="text-small text-ink-muted">{item.text}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                </>
              );
              const cls = 'group flex w-full items-center justify-between gap-6 py-4 text-left';
              return (
                <li key={item.label}>
                  {item.action === 'enquiry' ? (
                    <button
                      type="button"
                      className={cls}
                      onClick={() => {
                        onClose();
                        openEnquiry();
                      }}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link to={item.to} onClick={onClose} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="col-span-3 overflow-hidden rounded-image bg-tint-sand p-3">
            <Img
              id={side.image}
              alt=""
              sizes="300px"
              className="aspect-[4/3] size-full rounded-image object-cover"
              style={{ objectPosition: side.position }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
