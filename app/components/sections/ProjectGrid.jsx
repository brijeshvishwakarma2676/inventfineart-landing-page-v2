import { HoverSwap } from '../ui/HoverSwap';
import { useLightbox } from '../ui/useLightbox';

/** Masonry of project photos; each opens the full-screen viewer. Hover shows a second photo of the same piece. */
export function ProjectGrid({ items, columns = 'sm:columns-2 lg:columns-3' }) {
  const { open, element } = useLightbox(items);
  return (
    <>
      <ul className={`gap-6 ${columns} [&>li]:mb-6 [&>li]:break-inside-avoid`}>
        {items.map((p, i) => (
          <li key={p.image} data-reveal="up">
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full overflow-hidden rounded-image bg-surface-2 text-left"
              aria-label={`View larger: ${p.alt}`}
            >
              <HoverSwap
                as="span"
                image={p.image}
                secondImage={p.secondImage}
                views={p.views}
                alt={p.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                imgClassName="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>
      {element}
    </>
  );
}
