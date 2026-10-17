import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Hero } from '../components/sections/Hero';
import { CategoryPanels } from '../components/sections/CategoryPanels';
import { Collections } from '../components/sections/Collections';
import { StatsBand } from '../components/sections/StatsBand';
import { Applications } from '../components/sections/Applications';
import { MaterialsFinishes } from '../components/sections/MaterialsFinishes';
import { Process } from '../components/sections/Process';
import { ProjectGrid } from '../components/sections/ProjectGrid';
import { ClientsWall } from '../components/sections/ClientsWall';
import { Testimonials } from '../components/sections/Testimonials';
import { EnquirySection } from '../components/sections/EnquirySection';
import { intro } from '../data/content';
import { featuredProjects } from '../data/projects';
import { organization } from '../data/seo';

export const handle = { heroHeader: true };

// Home: the eleven sections of spec §4.1, in order.
export default function Home() {
  return (
    <>
      <Seo
        title="Invent Fine Art | Sculptures, Designer Planters, GRC & FRP Products, Mumbai"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products, designed and made in our own workshop for homes, hotels, landscapes and architecture."
        jsonLd={organization}
      />

      {/* 1 */}
      <Hero />

      {/* 2 */}
      <Section aria-labelledby="products-title">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we make"
              title={
                <span id="products-title">
                  For façades, gardens <em>and everything in between.</em>
                </span>
              }
            />
            <div className="flex max-w-sm flex-col items-start gap-5" data-reveal="up">
              <p className="text-ink-muted">
                Five product lines, from statement sculptures to architectural GRC, each made to your design, size and finish.
              </p>
              <Button to="/products" variant="text" arrow>
                All products
              </Button>
            </div>
          </div>
          <CategoryPanels />
        </Container>
      </Section>

      {/* 3 */}
      <Section className="pt-0" aria-labelledby="intro-title">
        <Container className="grid gap-10 border-t border-line pt-section lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow={intro.eyebrow}
            title={<span id="intro-title">{intro.title}</span>}
          />
          <div className="flex flex-col items-start gap-5 text-lg leading-relaxed text-ink-muted lg:col-span-6 lg:pt-10" data-reveal="up">
            {intro.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <Button to="/about" variant="text" arrow>
              About us
            </Button>
          </div>
        </Container>
      </Section>
      <StatsBand />

      {/* 4 */}
      <Collections />

      {/* 5 */}
      <Section aria-labelledby="applications-title">
        <Container>
          <SectionHeading
            className="mb-12 lg:mb-16"
            eyebrow="Browse by application"
            title={
              <span id="applications-title">
                Made for <em>every kind of space.</em>
              </span>
            }
          />
          <Applications />
        </Container>
      </Section>

      {/* 6 */}
      <Section tone="surface" aria-labelledby="materials-title">
        <Container>
          <SectionHeading
            className="mb-12 lg:mb-16"
            eyebrow="Materials & finishes"
            title={
              <span id="materials-title">
                The right material <em>for every setting.</em>
              </span>
            }
          />
          <MaterialsFinishes />
        </Container>
      </Section>

      {/* 7 */}
      <Section aria-labelledby="process-title">
        <Container>
          <SectionHeading
            className="mb-12 lg:mb-16"
            eyebrow="How we work"
            title={
              <span id="process-title">
                From concept <em>to installation.</em>
              </span>
            }
          />
          <Process />
        </Container>
      </Section>

      {/* 8 */}
      <Section tone="surface" aria-labelledby="projects-title">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
            <SectionHeading
              eyebrow="Featured projects"
              title={
                <span id="projects-title">
                  Installed and <em>at home.</em>
                </span>
              }
            />
            <Button to="/projects" variant="secondary" arrow>
              View all projects
            </Button>
          </div>
          <ProjectGrid items={featuredProjects} />
        </Container>
      </Section>

      {/* 9 */}
      <Section aria-labelledby="clients-title">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Trusted by"
              title={
                <span id="clients-title">
                  Brands that <em>work with us.</em>
                </span>
              }
            />
            <Button to="/clients" variant="text" arrow>
              All clients
            </Button>
          </div>
          <ClientsWall limit={18} />
        </Container>
      </Section>

      {/* 10: renders only when real testimonials exist */}
      <Testimonials />

      {/* 11 */}
      <EnquirySection />
    </>
  );
}
