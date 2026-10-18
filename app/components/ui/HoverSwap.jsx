import { useState } from 'react';
import { Images } from 'lucide-react';
import { Img } from './Img';

/**
 * A photo that changes to a second photo of the same piece on hover (or keyboard focus inside it).
 * The second photo is only fetched on the first hover/focus, then fades in over the first once loaded.
 * On touch screens there is no hover, so a small badge says more views exist (the lightbox shows them).
 * Children (overlay buttons etc.) render on top. `as="span"` when used inside a <button>.
 */
export function HoverSwap({ image, secondImage, views = 2, alt, sizes, as: Tag = 'div', className = '', imgClassName = 'size-full object-cover', children }) {
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const arm = () => {
    if (secondImage) setArmed(true);
  };
  const zoom = 'transition-[scale,opacity] duration-[900ms] ease-out-soft group-hover/swap:scale-105';

  return (
    <Tag className={`group/swap relative block overflow-hidden ${className}`} onPointerEnter={arm} onFocus={arm}>
      <Img id={image} alt={alt} sizes={sizes} className={`${imgClassName} ${zoom}`} />
      {armed && (
        <Img
          id={secondImage}
          alt=""
          sizes={sizes}
          onLoad={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover opacity-0 ${zoom} ${
            ready ? 'group-hover/swap:opacity-100 group-focus-within/swap:opacity-100' : ''
          }`}
        />
      )}
      {secondImage && (
        <span
          className="pointer-events-none absolute left-3 top-3 z-[1] inline-flex items-center gap-1.5 rounded-button bg-dark/65 px-2 py-1 text-micro font-semibold text-cream backdrop-blur-sm transition-opacity duration-500 group-hover/swap:opacity-0"
          aria-hidden="true"
        >
          <Images className="size-3.5" strokeWidth={1.75} />
          {views} views
        </span>
      )}
      {children}
    </Tag>
  );
}
