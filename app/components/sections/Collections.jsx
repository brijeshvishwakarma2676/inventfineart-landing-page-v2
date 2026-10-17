import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { DesignCard } from './DesignCard';
import { categoryBySlug } from '../../data/categories';
import { collections, designByImage, designsFor } from '../../data/designs';

/**
 * Bonasila-style collections (spec §4.1-4): the story column sticks while the designs scroll past.
 * Below 1024px the designs become a swipeable row.
 */
export function Collections() {
  return (
    <Section tone="surface" aria-labelledby="collections-title">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title={
            <span id="collections-title">
              A closer look at <em>the work.</em>
            </span>
          }
        />

        <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {collections.map((col, i) => {
            const cat = categoryBySlug[col.category];
            const items = col.picks.map(designByImage).filter(Boolean);
            const total = designsFor(col.category).length;
            return (
              <div key={col.category} className="grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
                <div className="lg:col-span-4">
                  <div className="flex flex-col gap-5 lg:sticky lg:top-28" data-reveal="up">
                    <p className="font-display text-xl italic text-accent">{String(i + 1).padStart(2, '0')} — Collection</p>
                    <h3 className="text-h2">{cat.name}</h3>
                    <p className="font-display text-h3 italic leading-snug text-ink-muted">{cat.tagline}</p>
                    <p className="text-ink-muted">{cat.intro[0]}</p>
                    <dl className="flex gap-10 border-y border-line py-4 text-small">
                      <div>
                        <dt className="text-micro font-bold uppercase tracking-label text-ink-muted">Designs</dt>
                        <dd className="mt-1 font-display text-h3">{total}</dd>
                      </div>
                      <div>
                        <dt className="text-micro font-bold uppercase tracking-label text-ink-muted">Materials</dt>
                        <dd className="mt-2 font-semibold">{cat.materials.slice(0, 3).join(' · ')}</dd>
                      </div>
                    </dl>
                    <div>
                      <Button to={`/${cat.slug}`} variant="secondary" arrow>
                        View all {cat.name}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="-mx-4 lg:col-span-8 lg:mx-0">
                  <div className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible lg:px-0 lg:pb-16 lg:[&>*:nth-child(even)]:translate-y-16">
                    {items.map((d) => (
                      <div key={d.code} className="w-[78%] shrink-0 snap-start sm:w-auto" data-reveal="up">
                        <DesignCard design={d} headingLevel={4} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 78vw" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
