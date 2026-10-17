import { useLocation } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/sections/PageHeader';
import { whatsappLink } from '../data/site';

export default function ThankYou() {
  const { state } = useLocation();
  const name = state?.name;
  return (
    <>
      <Seo title="Thank you | Invent Fine Art" description="Your enquiry has been sent." noindex />
      <PageHeader
        eyebrow="Enquiry sent"
        title={<>Thank you{name ? `, ${name}` : ''}. <em>We have your enquiry.</em></>}
      />
      <Section>
        <Container className="flex max-w-3xl flex-col items-start gap-6" data-reveal="up">
          <p className="text-lg text-ink-muted">
            Our team will get back to you shortly. If you gave an email address, a copy of the confirmation is on its
            way. To add drawings or photos, send them on WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/products" arrow>Keep exploring</Button>
            <Button
              variant="secondary"
              href={whatsappLink('Hello Invent Fine Art, I just sent an enquiry and want to add some photos.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send photos on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
