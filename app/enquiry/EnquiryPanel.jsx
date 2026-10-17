import { useRef } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { useEnquiry } from './EnquiryContext';
import { EnquiryForm } from './EnquiryForm';
import { useFocusTrap } from '../components/ui/useFocusTrap';
import { useScrollLock } from '../components/ui/useScrollLock';
import { site, whatsappLink } from '../data/site';
import { categoryBySlug } from '../data/categories';

/** Slide-over enquiry panel opened by every "Get a Quote" / "Enquire" (spec §5). */
export function EnquiryPanel() {
  const { state, close } = useEnquiry();
  const panelRef = useRef(null);
  const { isOpen, prefill } = state;
  useFocusTrap(panelRef, isOpen, close);
  useScrollLock(isOpen);

  const category = prefill.category ? categoryBySlug[prefill.category] : null;
  const subject = prefill.code ? `${prefill.title} (${prefill.code})` : (category?.name ?? 'your products');

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close"
        onClick={close}
        className={`absolute inset-0 bg-dark/50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        data-lenis-prevent
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full max-w-lg flex-col overflow-y-auto overscroll-contain bg-bg duration-500 ease-out-soft ${
          // visibility animates only on close: it must be visible at once on open so focus can move in
          isOpen ? 'visible translate-x-0 shadow-2xl transition-[translate,box-shadow]' : 'invisible translate-x-full transition-[translate,visibility,box-shadow]'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg px-6 py-5 md:px-8">
          <p className="font-sans text-micro font-bold uppercase tracking-eyebrow text-olive">Get a quote</p>
          <button type="button" onClick={close} className="-mr-2 p-2 text-ink" aria-label="Close enquiry panel">
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-7 px-6 py-8 md:px-8">
          <div className="flex flex-col gap-2">
            <h2 id="enquiry-title" className="text-h3">
              {prefill.code ? prefill.title : category ? category.name : 'Tell us about your space'}
            </h2>
            {prefill.code && (
              <p className="text-small font-semibold tracking-label text-ink-muted">Design {prefill.code}</p>
            )}
            <p className="text-ink-muted">Share your concept, size and location, and our team will get back to you.</p>
          </div>

          {/* Remount when the enquiry subject changes so the pre-filled product and code are fresh */}
          <EnquiryForm
            key={`${prefill.category ?? ''}-${prefill.code ?? ''}`}
            prefill={prefill}
            layout="stacked"
            onSent={close}
          />

          <div className="flex flex-col gap-3 border-t border-line pt-6 text-small">
            <p className="font-semibold">Prefer to talk?</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href={whatsappLink(`Hello Invent Fine Art, I would like a quote for ${subject}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-accent"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} aria-hidden="true" />
                WhatsApp us
              </a>
              <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-2 font-semibold text-accent">
                <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                {site.phones[0].label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
