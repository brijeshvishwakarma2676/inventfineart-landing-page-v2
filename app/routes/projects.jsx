import { useSearchParams } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PageHeader } from '../components/sections/PageHeader';
import { ProjectGrid } from '../components/sections/ProjectGrid';
import { EnquirySection } from '../components/sections/EnquirySection';
import { projects, projectGroups } from '../data/projects';
import { breadcrumbs } from '../data/seo';
import { useHydrated } from '../motion/useReducedMotion';

export const handle = { heroHeader: true };

export default function Projects() {
  const [params, setParams] = useSearchParams();
  // The prerendered HTML is the unfiltered page; apply ?type= only after hydration so they match.
  const hydrated = useHydrated();
  const requested = params.get('type');
  const active = hydrated && projectGroups.some((g) => g.slug === requested) ? requested : 'all';
  const items = active === 'all' ? projects : projects.filter((p) => p.group === active);
  const tabs = [{ slug: 'all', name: 'All work' }, ...projectGroups];

  return (
    <>
      <Seo
        title="Projects: Murals, Water Features & Installations | Invent Fine Art"
        description="Wall murals and relief art, water features and rockery, pergolas, gazebos and installations made by Invent Fine Art."
        image="gallery/wall_murals/9"
        jsonLd={breadcrumbs([{ name: 'Projects', path: '/projects' }])}
      />
      <PageHeader
        eyebrow="Projects"
        title={<>Installations & <em>past work</em></>}
        tagline="Murals, water features, pergolas and more, made for real spaces."
        image="gallery/wall_murals/9"
        position="50% 50%"
        crumbs={[{ name: 'Projects' }]}
      />
      <Section>
        <Container>
          <div role="tablist" aria-label="Filter projects" className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
            {tabs.map((t) => {
              const on = t.slug === active;
              return (
                <button
                  key={t.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setParams(t.slug === 'all' ? {} : { type: t.slug }, { preventScrollReset: true, replace: true })}
                  className={`-mb-px border-b-2 pb-3 text-small font-semibold transition-colors ${
                    on ? 'border-accent text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                  }`}
                >
                  {t.name}
                  <span className="ml-2 text-micro text-ink-muted">
                    {t.slug === 'all' ? projects.length : projects.filter((p) => p.group === t.slug).length}
                  </span>
                </button>
              );
            })}
          </div>
          <ProjectGrid key={active} items={items} />
        </Container>
      </Section>
      <EnquirySection title={<>Planning something <em>similar?</em></>} />
    </>
  );
}
