import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading, Eyebrow } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { DesignCard } from '../components/sections/DesignCard';
import { designs } from '../data/designs';

const COLOURS = [
  ['bg', 'bg-bg', '#F7F4EE'],
  ['surface', 'bg-surface', '#EFEAE1'],
  ['surface-2', 'bg-surface-2', '#E4DDD0'],
  ['line', 'bg-line', '#D6CEC0'],
  ['ink', 'bg-ink', '#1F1D1A'],
  ['ink-muted', 'bg-ink-muted', '#5E5850'],
  ['accent', 'bg-accent', '#8A6A3F'],
  ['accent-hover', 'bg-accent-hover', '#6F542F'],
  ['olive', 'bg-olive', '#6B6A4B'],
  ['cream', 'bg-cream', '#F2EDE4'],
  ['whatsapp', 'bg-whatsapp', '#25D366'],
];

/** Internal reference page (noindex): every token, type size, button and reveal. */
export default function Styleguide() {
  return (
    <>
      <Seo title="Style guide | Invent Fine Art" description="Design tokens and components." noindex />
      <Section className="pt-40">
        <Container className="flex flex-col gap-20">
          <SectionHeading eyebrow="Internal" title={<>Style guide <em>v3</em></>} tagline="Tokens from SITE-V3-SPEC.md §3" />

          <div className="flex flex-col gap-6">
            <Eyebrow>Colour</Eyebrow>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {COLOURS.map(([name, cls, hex]) => (
                <li key={name} className="flex flex-col gap-2 text-small">
                  <span className={`h-20 rounded-image border border-line ${cls}`} />
                  <span className="font-semibold">{name}</span>
                  <span className="text-ink-muted">{hex}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Type</Eyebrow>
            <p className="text-h1 font-display">H1 Cormorant 72/44 <em>italic</em></p>
            <p className="text-h2 font-display">H2 Cormorant 48/34 <em>italic</em></p>
            <p className="text-h3 font-display">H3 Cormorant 28/24 <em>italic</em></p>
            <p className="text-body">Body Manrope 17/16. Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop.</p>
            <p className="text-small">Small Manrope 14</p>
            <p className="text-small font-extrabold uppercase tracking-label">Category label · Manrope 800</p>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Buttons</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button arrow>Primary</Button>
              <Button variant="secondary" arrow>Secondary</Button>
              <Button variant="text" arrow>Text link</Button>
              <span className="bg-dark p-4"><Button variant="onDark">On dark</Button></span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Reveals (scroll)</Eyebrow>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-image bg-surface p-8" data-reveal="up">data-reveal=&quot;up&quot;</div>
              <ul className="flex flex-col gap-2" data-reveal="stagger">
                {['stagger 1', 'stagger 2', 'stagger 3'].map((t) => <li key={t} className="rounded-image bg-surface p-3">{t}</li>)}
              </ul>
              <div className="aspect-[4/3] overflow-hidden rounded-image" data-reveal="clip">
                <Img id="gallery/sculptures/15" alt="Clip reveal demo" sizes="33vw" className="size-full object-cover" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Design card</Eyebrow>
            <div className="grid gap-6 sm:grid-cols-3">
              {designs.slice(0, 3).map((d) => <DesignCard key={d.code} design={d} />)}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
