import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PageHeader } from '../components/sections/PageHeader';
import { ClientsWall } from '../components/sections/ClientsWall';
import { Testimonials } from '../components/sections/Testimonials';
import { EnquirySection } from '../components/sections/EnquirySection';
import { clients } from '../data/clients';
import { breadcrumbs } from '../data/seo';

export default function Clients() {
  return (
    <>
      <Seo
        title="Our Clients | Invent Fine Art"
        description="Corporate and architectural clients who have worked with Invent Fine Art on sculptures, murals, GRC and installations."
        jsonLd={breadcrumbs([{ name: 'Clients', path: '/clients' }])}
      />
      <PageHeader
        eyebrow="Clients"
        title={<>Trusted by <em>leading brands.</em></>}
        tagline={`${clients.length} corporate and architectural clients and counting.`}
        crumbs={[{ name: 'Clients' }]}
      />
      <Section>
        <Container>
          <ClientsWall />
        </Container>
      </Section>
      <Testimonials />
      <EnquirySection title={<>Your project <em>could be next.</em></>} />
    </>
  );
}
