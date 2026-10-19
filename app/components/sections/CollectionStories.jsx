import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Section, Container } from '../ui/Section';
import { Button } from '../ui/Button';
import { Img } from '../ui/Img';
import { categories } from '../../data/categories';
import { designs, designsFor } from '../../data/designs';
import { useEnquiry } from '../../enquiry/EnquiryContext';

// Three photos per collection: the large one first. PROVISIONAL picks for FRP (stand-in photos, CONTENT-GAPS.md).
const PHOTOS = {
  sculptures: ['IFA-SC-012', 'IFA-SC-026', 'IFA-SC-070'],
  'designer-planters': ['IFA-PL-002', 'IFA-PL-001', 'IFA-PL-004'],
  'grc-products': ['IFA-GRC-001', 'IFA-GRC-007', 'IFA-GRC-010'],
  'grc-grilles': ['IFA-GRL-005', 'IFA-GRL-002', 'IFA-GRL-004'],
  'frp-products': ['IFA-FRP-002', 'IFA-FRP-001', 'IFA-FRP-005'],
};
const TINTS = ['bg-tint-sage', 'bg-tint-sand', 'bg-tint-clay'];
const byCode = Object.fromEntries(designs.map((d) => [d.code, d]));

function Panel({ design, tint, big, slug }) {
  return (
    <Link
      to={`/${slug}#${design.code}`}
      className={`group flex flex-col gap-2 overflow-hidden rounded-image p-3 md:p-5 ${tint} ${big ? 'col-span-3 row-span-2' : 'col-span-2'}`}
      aria-label={`${design.title}, design ${design.code}`}
    >
      <span className="relative min-h-0 flex-1 overflow-hidden rounded-button">
        <Img
          id={design.image}
          alt={design.alt}
          sizes={big ? '(min-width: 1024px) 34vw, 60vw' : '(min-width: 1024px) 22vw, 40vw'}
          className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-105"
        />
      </span>
      <span className="flex items-baseline justify-between gap-3 text-micro font-bold uppercase tracking-label text-ink/70">
        <span>{design.code}</span>
        {big && <span className="truncate font-semibold normal-case tracking-normal">{design.title}</span>}
      </span>
    </Link>
  );
}

/**
 * Collections, Bonasila-style (THREE-DEMOS-DIRECTION.md §4 v2.5): one editorial split block per product line,
 * alternating left and right, with the brief's name, tagline and intro word for word, and three photos on tinted
 * panels. From 1440px a fixed side index of the line codes follows the scroll; below that, a jump row.
 */
export function CollectionStories() {
  const { open } = useEnquiry();
  const section = useRef(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(categories[0].slug);

  useEffect(() => {
    const blocks = [...section.current.querySelectorAll('[data-collection]')];
    const band = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.collection)),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.forEach((b) => band.observe(b));
    const whole = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '-30% 0px -30% 0px' });
    whole.observe(section.current);
    return () => {
      band.disconnect();
      whole.disconnect();
    };
  }, []);

  return (
    <Section ref={section} id="collections" aria-labelledby="collections-title" className="scroll-mt-16">
      {/* Fixed side index (from 1440px, while the collections are on screen) */}
      <nav
        aria-label="Collections index"
        inert={!inView}
        className={`fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 transition-opacity duration-500 min-[1440px]:flex ${
          inView ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {categories.map((c) => {
          const on = active === c.slug;
          return (
            <a
              key={c.slug}
              href={`#collection-${c.code}`}
              aria-current={on ? 'true' : undefined}
              title={c.name}
              className={`py-1.5 text-micro font-bold tracking-label underline-offset-[6px] transition-colors ${
                on ? 'text-accent underline decoration-2' : 'text-ink-muted/70 hover:text-ink'
              }`}
            >
              {c.code}
            </a>
          );
        })}
      </nav>

      <Container>
        <div className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between" data-reveal="up">
          <div className="flex flex-col gap-4">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Collections</p>
            <h2 id="collections-title" className="text-h1">
              Five collections, <em className="text-accent">one workshop.</em>
            </h2>
          </div>
          {/* Jump row below 1440px (the side index takes over above) */}
          <ul className="flex flex-wrap gap-2 min-[1440px]:hidden">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#collection-${c.code}`}
                  className="inline-flex items-center gap-2 rounded-button border border-line bg-white/50 px-3 py-2 text-micro font-bold tracking-label transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="text-olive">{c.code}</span>
                  <span className="font-semibold normal-case tracking-normal">{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-36">
          {categories.map((c, i) => {
            const reverse = i % 2 === 1;
            const photos = PHOTOS[c.slug].map((code) => byCode[code]).filter(Boolean);
            const tint = (k) => TINTS[(i + k) % TINTS.length];
            return (
              <article
                key={c.slug}
                id={`collection-${c.code}`}
                data-collection={c.slug}
                aria-labelledby={`collection-${c.code}-title`}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div className={`flex flex-col gap-5 lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`} data-reveal="up">
                  <p className="flex items-center gap-3 text-micro font-bold uppercase tracking-eyebrow text-olive">
                    <span className="rounded-button border border-olive/40 px-2 py-1 tracking-label">{c.code}</span>
                    Collection {String(i + 1).padStart(2, '0')} / 05
                  </p>
                  <h3 id={`collection-${c.code}-title`} className="text-h1">
                    {c.name}
                  </h3>
                  <p className="font-display text-h3 italic leading-snug text-accent">{c.tagline}</p>
                  <div className="flex flex-col gap-4 text-ink-muted">
                    {c.intro.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Button to={`/${c.slug}`} arrow>
                      Explore {c.name}
                    </Button>
                    <button
                      type="button"
                      onClick={() => open({ category: c.slug })}
                      className="border-b border-accent pb-0.5 text-small font-bold text-accent transition-colors hover:text-accent-hover"
                    >
                      Get a quote
                    </button>
                  </div>
                  <p className="text-micro font-semibold uppercase tracking-label text-ink-muted">
                    {designsFor(c.slug).length} designs in the catalogue
                  </p>
                </div>

                <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`} data-reveal="up">
                  <div className="grid aspect-[6/5] grid-cols-5 grid-rows-2 gap-3 md:gap-4">
                    {photos.map((d, k) => (
                      <Panel key={d.code} design={d} tint={tint(k)} big={k === 0} slug={c.slug} />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
