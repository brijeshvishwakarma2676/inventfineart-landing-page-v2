import { Check } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Img } from '../components/ui/Img';
import { PageHeader } from '../components/sections/PageHeader';
import { StatsBand } from '../components/sections/StatsBand';
import { Process } from '../components/sections/Process';
import { EnquirySection } from '../components/sections/EnquirySection';
import { about } from '../data/content';
import { site } from '../data/site';
import { breadcrumbs } from '../data/seo';

export const handle = { heroHeader: true };

export default function About() {
  return (
    <>
      <Seo
        title="About Invent Fine Art | Sculptors, Designers & Makers, Mumbai"
        description="A team of artisans and product designers making sculptures, planters, GRC and FRP products, from concept to installation."
        og="about"
        jsonLd={breadcrumbs([{ name: 'About', path: '/about' }])}
      />
      <PageHeader
        eyebrow="About us"
        title={<>A community of <em>artists & makers.</em></>}
        tagline={`${site.certification} · Since ${site.foundedYear}`}
        image="gallery/sculptures/57"
        position="50% 45%"
        crumbs={[{ name: 'About' }]}
      />

      <Section aria-labelledby="story-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionHeading eyebrow="Who we are" title={<span id="story-title">Art with an architect&rsquo;s <em>discipline.</em></span>} />
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-muted" data-reveal="up">
              {about.story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-20" data-reveal="up">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">What we make</p>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {about.whatWeMake.map((w) => (
                <li key={w} className="flex items-start gap-3 py-3.5">
                  <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <StatsBand />

      <Section tone="surface" aria-labelledby="facility-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading eyebrow="Our workshop" title={<span id="facility-title">Made under <em>one roof.</em></span>} />
            <div className="aspect-[4/5] overflow-hidden rounded-image" data-reveal="clip">
              <Img id="gallery/sculptures/80" alt="A lion sculpture made of machine parts in the Invent Fine Art workshop" sizes="(min-width: 1024px) 35vw, 92vw" className="size-full object-cover" />
            </div>
          </div>
          <ul className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-7 lg:pt-28" data-reveal="stagger">
            {about.facility.map((f, i) => (
              <li key={f.name} className="flex flex-col gap-3 border-t border-line pt-5">
                <span className="font-display text-h3 italic text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-sans text-body font-bold">{f.name}</h3>
                <p className="text-small text-ink-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="how-we-work" aria-labelledby="process-title" className="scroll-mt-16">
        <Container>
          <SectionHeading className="mb-12 lg:mb-16" eyebrow="How we work" title={<span id="process-title">From concept <em>to installation.</em></span>} />
          <Process />
        </Container>
      </Section>

      <EnquirySection />
    </>
  );
}
