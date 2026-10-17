import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PageHeader } from '../components/sections/PageHeader';
import { CategoryPanels } from '../components/sections/CategoryPanels';
import { breadcrumbs } from '../data/seo';

export default function Products() {
  return (
    <>
      <Seo
        title="Products: Sculptures, Planters, GRC & FRP | Invent Fine Art"
        description="Explore our five product lines: sculptures, designer planters, GRC products, GRC grilles and FRP products, all made to your design."
        jsonLd={breadcrumbs([{ name: 'Products', path: '/products' }])}
      />
      <PageHeader
        eyebrow="Our products"
        title={<>Five product lines, <em>made to suit your space.</em></>}
        crumbs={[{ name: 'Products' }]}
      />
      <Section>
        <Container>
          <CategoryPanels headingLevel={2} />
        </Container>
      </Section>
    </>
  );
}
