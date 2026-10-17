import { MessageCircle, Phone, Mail } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { Eyebrow } from '../ui/SectionHeading';
import { EnquiryForm } from '../../enquiry/EnquiryForm';
import { site, whatsappLink } from '../../data/site';

/** Split enquiry section (spec §4.1-11): pitch and direct lines on the left, the form on the right. */
export function EnquirySection({ id = 'enquire', title, tone = 'surface', prefill }) {
  return (
    <Section tone={tone} id={id} aria-labelledby={`${id}-title`}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5" data-reveal="up">
          <Eyebrow>Get a quote</Eyebrow>
          <h2 id={`${id}-title`} className="text-h2">
            {title ?? (
              <>
                Tell us about <em>your space.</em>
              </>
            )}
          </h2>
          <p className="max-w-md text-ink-muted">
            Share your concept, a drawing or a reference photo, with the size and location. We will suggest the right
            design, material and finish.
          </p>
          <ul className="mt-2 flex flex-col gap-4 border-t border-line pt-6">
            <li>
              <a
                href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-semibold hover:text-accent"
              >
                <MessageCircle className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp {site.phones[0].label}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-3 font-semibold hover:text-accent">
                <Phone className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                Call {site.phones[0].label}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 font-semibold hover:text-accent">
                <Mail className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-image border border-line bg-bg p-6 md:p-10 lg:col-span-7" data-reveal="up">
          <EnquiryForm prefill={prefill} />
        </div>
      </Container>
    </Section>
  );
}
