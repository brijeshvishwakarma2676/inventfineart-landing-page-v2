import { useLocation } from 'react-router';
import { Plus } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { useLightbox } from '../components/ui/useLightbox';
import { PageHeader } from '../components/sections/PageHeader';
import { DesignCard } from '../components/sections/DesignCard';
import { Process } from '../components/sections/Process';
import { ProjectGrid } from '../components/sections/ProjectGrid';
import { EnquirySection } from '../components/sections/EnquirySection';
import { categoryBySlug, finishes } from '../data/categories';
import { designsFor } from '../data/designs';
import { relatedProjects } from '../data/projects';
import { faqs } from '../data/content';
import { breadcrumbs } from '../data/seo';
import { SITE_URL } from '../data/site';
import { useEnquiry } from '../enquiry/EnquiryContext';

export const handle = { heroHeader: true };

// One template for all five product lines (spec §4.2).
// The application filter (§4.2-3) waits until designs are tagged by use (BACKLOG.md).
export default function Category() {
  const { pathname } = useLocation();
  const cat = categoryBySlug[pathname.split('/')[1]];
  const items = designsFor(cat.slug);
  const related = relatedProjects(cat.slug);
  const faq = faqs[cat.slug] ?? [];
  const { open } = useEnquiry();
  const { open: openPhoto, element: lightbox } = useLightbox(items);
  const madeToOrder = items.length < 6;

  return (
    <>
      <Seo
        title={cat.seo.title}
        description={cat.seo.description}
        image={cat.banner.image}
        jsonLd={[
          breadcrumbs([
            { name: 'Products', path: '/products' },
            { name: cat.name, path: `/${cat.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: cat.name,
            description: cat.seo.description,
            url: `${SITE_URL}/${cat.slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]}
      />
      <PageHeader
        title={cat.name}
        tagline={cat.tagline}
        image={cat.banner.image}
        position={cat.banner.position}
        crumbs={[{ name: 'Products', to: '/products' }, { name: cat.name }]}
      />

      {/* Intro + customisation (spec §4.2-2, -5) */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 text-lg leading-relaxed lg:col-span-7" data-reveal="up">
            {cat.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="mt-2 flex flex-wrap gap-3">
              <Button onClick={() => open({ category: cat.slug })} arrow>
                Get a quote
              </Button>
              <Button href="#designs" variant="secondary">
                See the designs
              </Button>
            </div>
          </div>
          <dl className="flex flex-col divide-y divide-line border-y border-line lg:col-span-5" data-reveal="up">
            {[
              ['Suitable for', cat.suitableFor.join(' · ')],
              ['Materials', cat.materials.join(' · ')],
              ['Sizes', cat.sizes],
              ['Finishes', finishes.map((f) => f.name).join(' · ')],
              ['Customisation', 'Share your concept; we make to your drawing.'],
            ].map(([k, v]) => (
              <div key={k} className="py-5">
                <dt className="text-micro font-bold uppercase tracking-label text-ink-muted">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Design grid (spec §4.2-4) */}
      <Section tone="surface" id="designs" aria-labelledby="designs-title" className="scroll-mt-16">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={`${items.length} designs`}
              title={<span id="designs-title">{madeToOrder ? <>Recent <em>work</em></> : <>The <em>designs</em></>}</span>}
            />
            <p className="max-w-sm text-small text-ink-muted">Tap a photo to view it larger. Every design can be made to your size and finish.</p>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d, i) => (
              <div key={d.code} data-reveal="up">
                <DesignCard design={d} onOpen={() => openPhoto(i)} />
              </div>
            ))}
          </div>
          {lightbox}
        </Container>
      </Section>

      {/* Made to your design: shown when the range on hand is small (spec §4.2 rule) */}
      {madeToOrder && (
        <Section aria-labelledby="made-title">
          <Container>
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
              <SectionHeading
                eyebrow="Made to your design"
                title={<span id="made-title">Don&rsquo;t see your design? <em>We make it.</em></span>}
              />
              <Button onClick={() => open({ category: cat.slug })} arrow>
                Share your concept
              </Button>
            </div>
            <Process />
          </Container>
        </Section>
      )}

      {/* Related projects (spec §4.2-6) */}
      {related.length > 0 && (
        <Section tone={madeToOrder ? 'surface' : 'bg'} aria-labelledby="related-title">
          <Container>
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Related projects" title={<span id="related-title">More of <em>our work</em></span>} />
              <Button to="/projects" variant="text" arrow>
                All projects
              </Button>
            </div>
            <ProjectGrid items={related} columns="sm:columns-2 lg:columns-3" />
          </Container>
        </Section>
      )}

      {/* FAQ (spec §4.2-7) */}
      <Section tone={madeToOrder ? 'bg' : 'surface'} aria-labelledby="faq-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading className="lg:col-span-4" eyebrow="FAQ" title={<span id="faq-title">Good to <em>know</em></span>} />
          <div className="divide-y divide-line border-y border-line lg:col-span-8" data-reveal="up">
            {faq.map((f) => (
              <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" strokeWidth={1.75} aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA band with the form pre-filled for this line (spec §4.2-8) */}
      <EnquirySection
        tone={madeToOrder ? 'surface' : 'bg'}
        title={<>Enquire about <em>{cat.name.toLowerCase().replace('grc', 'GRC').replace('frp', 'FRP')}</em></>}
        prefill={{ category: cat.slug }}
      />
    </>
  );
}
