import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/sections/PageHeader';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Invent Fine Art" description="The page you were looking for could not be found." noindex />
      <PageHeader eyebrow="404" title={<>This page has <em>moved or doesn&rsquo;t exist.</em></>} />
      <Section>
        <Container className="flex flex-wrap gap-3">
          <Button to="/" arrow>Go to the home page</Button>
          <Button to="/products" variant="secondary">See our products</Button>
        </Container>
      </Section>
    </>
  );
}
