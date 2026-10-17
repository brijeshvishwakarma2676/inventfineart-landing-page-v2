import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { applications } from '../../data/applications';
import { categoryBySlug } from '../../data/categories';

/** Browse by application (spec §4.1-5): six places, each with the product lines that suit it. */
export function Applications() {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
      {applications.map((a) => (
        <li key={a.slug} className="group flex flex-col gap-4">
          <Link to={`/${a.products[0]}`} className="block aspect-[4/3] overflow-hidden rounded-image bg-surface-2" tabIndex={-1} aria-hidden="true">
            <Img
              id={a.image}
              alt=""
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              className="size-full object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-105"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-h3">{a.name}</h3>
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-small">
              {a.products.map((slug, i) => (
                <span key={slug} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="text-line" aria-hidden="true">/</span>}
                  <Link to={`/${slug}`} className="font-semibold text-accent hover:text-accent-hover">
                    {categoryBySlug[slug].name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
