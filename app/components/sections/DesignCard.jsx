import { HoverSwap } from '../ui/HoverSwap';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * One design: 4:5 image, code and title, and Enquire (spec §3.4).
 * With a mouse, Enquire slides up over the image on hover; on touch screens it is always visible below.
 * When there is a second photo of the same piece (`secondImage`), hovering changes to it.
 */
export function DesignCard({ design, sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw', headingLevel = 3, className = '', onOpen }) {
  const { open } = useEnquiry();
  const Heading = `h${headingLevel}`;
  const enquire = () => open({ category: design.category, code: design.code, title: design.title });

  return (
    <article className={`group flex flex-col gap-4 ${className}`}>
      <HoverSwap
        image={design.image}
        secondImage={design.secondImage}
        views={design.views}
        alt={design.alt}
        sizes={sizes}
        className="aspect-[4/5] rounded-image bg-surface-2"
      >
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className="absolute inset-0 cursor-zoom-in"
            aria-label={`View larger: ${design.title}, ${design.code}`}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/55 via-dark/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={enquire}
          className="absolute inset-x-4 bottom-4 hidden translate-y-3 items-center justify-center rounded-button bg-bg/95 py-3 text-small font-semibold text-ink opacity-0 transition-all duration-500 ease-out-soft hover:bg-accent hover:text-white focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 pointer-fine:flex"
        >
          Enquire about this design
        </button>
      </HoverSwap>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-micro font-semibold uppercase tracking-label text-ink-muted">{design.code}</p>
          <Heading className="font-sans text-body font-semibold leading-snug text-ink">{design.title}</Heading>
        </div>
        <button
          type="button"
          onClick={enquire}
          className="shrink-0 border-b border-accent pb-0.5 text-small font-semibold text-accent pointer-fine:hidden"
          aria-label={`Enquire about ${design.title}, ${design.code}`}
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
