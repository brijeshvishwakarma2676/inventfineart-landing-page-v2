import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { categories } from '../../data/categories';

/**
 * The five product lines (spec §4.1-2). Ferrocon-style label strip over each photo.
 * Desktop: five tall panels in a row; the one under the pointer (or keyboard focus) widens and shows
 * its tagline. Below 1024px: a grid of cards with the tagline always shown.
 * (Panels instead of stacked full-bleed banners because several source photos are portrait or < 1600px.)
 */
export function CategoryPanels({ headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <ul
      className="grid gap-3 sm:grid-cols-2 lg:flex lg:h-[min(80vh,680px)] lg:gap-2.5"
      data-reveal="stagger"
    >
      {categories.map((c, i) => (
        <li
          key={c.slug}
          className="group/panel relative aspect-[5/4] overflow-hidden rounded-image bg-dark sm:aspect-[4/5] sm:first:col-span-2 sm:first:aspect-[16/9] lg:aspect-auto lg:flex-[1_1_0%] lg:transition-[flex-grow] lg:duration-700 lg:ease-out-soft lg:first:aspect-auto lg:focus-within:flex-[2.4_1_0%] lg:hover:flex-[2.4_1_0%]"
        >
          <Link to={`/${c.slug}`} className="absolute inset-0 block text-cream" aria-label={`${c.name}: ${c.tagline}`}>
            <Img
              id={c.banner.image}
              alt=""
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              className="size-full object-cover transition-transform duration-[1200ms] ease-out-soft group-hover/panel:scale-105"
              style={{ objectPosition: c.banner.position }}
            />
            <span className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent" aria-hidden="true" />

            <span className="absolute inset-x-0 bottom-0 flex flex-col bg-dark/55 px-5 py-4 backdrop-blur-[2px] md:px-6 md:py-5">
              <span className="flex items-baseline gap-3 lg:min-h-[2.6rem]">
                <span className="font-display text-lg italic text-cream/70">{String(i + 1).padStart(2, '0')}</span>
                <Heading className="font-sans text-small font-extrabold uppercase leading-tight tracking-label text-cream">
                  {c.name}
                </Heading>
              </span>
              <span className="grid transition-[grid-template-rows,opacity] duration-700 ease-out-soft lg:grid-rows-[0fr] lg:opacity-0 lg:group-focus-within/panel:grid-rows-[1fr] lg:group-focus-within/panel:opacity-100 lg:group-hover/panel:grid-rows-[1fr] lg:group-hover/panel:opacity-100">
                <span className="overflow-hidden">
                  <span className="block pt-1.5 font-display text-lg italic leading-snug text-cream/90 md:text-xl lg:min-w-[20rem]">
                    {c.tagline}
                  </span>
                  <span className="mt-3 hidden items-center gap-2 text-micro font-bold uppercase tracking-label text-cream sm:inline-flex">
                    View range
                    <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
