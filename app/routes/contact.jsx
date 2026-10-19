import { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/sections/PageHeader';
import { EnquiryForm } from '../enquiry/EnquiryForm';
import { site, whatsappLink } from '../data/site';
import { breadcrumbs } from '../data/seo';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19811.64538266773!2d72.7856903769042!3d19.419672530730246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7abef7331b6cb%3A0xfd4325d4724074cf!2sJag+mata+mandir!5e0!3m2!1sen!2sin!4v1510743982267';

/** Google Maps loads only after the visitor asks for it (privacy and speed, spec §4.3). */
function MapOnClick() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <iframe
        title="Invent Fine Art workshop on Google Maps"
        src={MAP_EMBED}
        className="aspect-[4/3] w-full rounded-image border border-line md:aspect-[16/7]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-image border border-line bg-surface p-6 text-center md:aspect-[16/7]">
      <MapPin className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-sm text-small text-ink-muted">
        The map is provided by Google Maps and loads only when you choose to show it.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={() => setShow(true)}>Show the map</Button>
        <Button variant="text" href={site.factory.mapUrl} target="_blank" rel="noopener noreferrer" arrow>
          Open in Google Maps
        </Button>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Invent Fine Art | Mumbai Office & Vasai Workshop"
        description="Call, WhatsApp or email Invent Fine Art for sculptures, planters, GRC and FRP products. Office in Kandivali East, Mumbai; workshop in Vasai–Virar."
        jsonLd={breadcrumbs([{ name: 'Contact', path: '/contact' }])}
      />
      <PageHeader eyebrow="Contact" title={<>Tell us about <em>your space.</em></>} crumbs={[{ name: 'Contact' }]} />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-4" data-reveal="stagger">
            <div className="flex flex-col gap-3">
              <h2 className="inline-flex items-center gap-2.5 font-sans text-body font-bold">
                <Phone className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                Call us
              </h2>
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="text-h3 font-extrabold hover:text-accent">{p.label}</a>
              ))}
            </div>
            <div className="flex flex-col items-start gap-3 border-t border-line pt-8">
              <h2 className="inline-flex items-center gap-2.5 font-sans text-body font-bold">
                <MessageCircle className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp & email
              </h2>
              <p className="text-ink-muted">Send photos, drawings or reference images of your space.</p>
              <Button href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')} target="_blank" rel="noopener noreferrer" arrow>
                WhatsApp us
              </Button>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold text-accent">
                <Mail className="size-4" strokeWidth={1.75} aria-hidden="true" />
                {site.email}
              </a>
            </div>
            <div className="flex flex-col gap-4 border-t border-line pt-8">
              <h2 className="inline-flex items-center gap-2.5 font-sans text-body font-bold">
                <MapPin className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                Visit
              </h2>
              {[site.office, site.factory].map((a) => (
                <address key={a.label} className="not-italic">
                  <span className="block font-semibold">{a.label}</span>
                  <span className="text-ink-muted">{a.lines.join(', ')}</span>
                </address>
              ))}
            </div>
          </div>

          <div className="rounded-image border border-line bg-white/50 p-6 md:p-10 lg:col-span-8" data-reveal="up">
            <h2 className="mb-2 text-h3">Send an enquiry</h2>
            <p className="mb-8 text-ink-muted">Fields marked * are required.</p>
            <EnquiryForm />
          </div>
        </Container>

        <Container className="mt-16">
          <h2 className="mb-5 font-sans text-body font-bold">Our workshop, Vasai–Virar</h2>
          <MapOnClick />
        </Container>
      </Section>
    </>
  );
}
