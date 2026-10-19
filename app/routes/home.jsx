import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Hero } from '../components/sections/Hero';
import { CollectionStories } from '../components/sections/CollectionStories';
import { Process } from '../components/sections/Process';
import { ClientsWall } from '../components/sections/ClientsWall';
import { EnquirySection } from '../components/sections/EnquirySection';
import { site } from '../data/site';
import { organization } from '../data/seo';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { heroHeader: true, inlineEnquiry: true };

// The four facility units, in the old About page's words.
const UNITS = ['Manufacturing unit', 'Warehousing & packaging unit', 'Quality control unit', 'Research & development unit'];

/**
 * Home, Bonasila-style (THREE-DEMOS-DIRECTION.md §4 v2): photo hero → statement → five editorial collections with a
 * side index → up close (quality) → made from scratch (process) → client logos → enquiry. Light and warm throughout.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Invent Fine Art | Reinventing spaces through innovations in art"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products for homes, gardens, hotels and architecture, made in our own workshop by Invent Fine Art, Mumbai. Explore the five collections."
        og="home"
        jsonLd={organization}
      />

      <Hero />

      {/* Statement: the brief's own line, one accent word in serif italic */}
      <Section aria-labelledby="statement" className="pb-0">
        <Container className="flex flex-col gap-8">
          <h2 id="statement" className="statement max-w-[17ch] text-statement font-extrabold" data-reveal="up">
            Art that gives your space a distinctive <em className="text-accent">identity.</em>
          </h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal="up">
            <p className="max-w-xl text-lg text-ink-muted">{site.pitch}</p>
            <Button href="#collections" variant="secondary" arrow>
              See the collections
            </Button>
          </div>
        </Container>
      </Section>

      <CollectionStories />

      {/* Up close: quality, in the old About page's words */}
      <Section tone="surface" aria-labelledby="up-close-title">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="rounded-image bg-tint-clay p-4 md:p-6 lg:col-span-5" data-reveal="up">
            <div className="aspect-[4/5] overflow-hidden rounded-button">
              <Img
                id="gallery/sculptures/78"
                alt="A lion sculpture of machine parts in the Invent Fine Art workshop"
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="size-full object-cover"
                style={{ objectPosition: '50% 35%' }}
              />
            </div>
            <p className="mt-3 text-micro font-bold uppercase tracking-label text-ink/70">In the workshop · IFA-SC-067</p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7" data-reveal="up">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Up close</p>
            <h2 id="up-close-title" className="text-h1">
              Checked before it <em className="text-accent">leaves.</em>
            </h2>
            {/* First sentence: the old About page, word for word. Second: its packing line, shortened. */}
            <p className="max-w-2xl text-lg leading-relaxed">
              The entire collection we offer is stringently examined on numerous factors before finally delivering these
              products to our customers.
            </p>
            <p className="max-w-2xl text-ink-muted">Every piece is delivered in premium quality packing material.</p>
            <ul className="mt-2 grid gap-3 sm:grid-cols-2">
              {UNITS.map((u, i) => (
                <li key={u} className="flex items-baseline gap-3 border-t border-line pt-3">
                  <span className="font-display text-xl italic text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-bold">{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Made from scratch: how a piece is made (our summary of the old About page) */}
      <Section id="how-we-work" aria-labelledby="scratch-title">
        <Container>
          <div className="mb-14 flex flex-col gap-4" data-reveal="up">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Made from scratch</p>
            <h2 id="scratch-title" className="max-w-[20ch] text-h1">
              From conceptualisation to the complete <em className="text-accent">execution.</em>
            </h2>
          </div>
          <Process />
        </Container>
      </Section>

      {/* You may have seen our work at: client logos */}
      <Section tone="surface" aria-labelledby="seen-title">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end" data-reveal="up">
            <div className="flex flex-col gap-4">
              <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Clients</p>
              <h2 id="seen-title" className="text-h1">
                You may have seen <em className="text-accent">our work</em> at
              </h2>
            </div>
            <Button to="/clients" variant="secondary" arrow>
              All clients
            </Button>
          </div>
          <ClientsWall limit={18} />
        </Container>
      </Section>

      <EnquirySection tone="bg" />
    </>
  );
}
