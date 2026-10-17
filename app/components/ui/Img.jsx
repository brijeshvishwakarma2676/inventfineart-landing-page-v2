import { images } from '../../data/images.generated';

const url = (id, w) => `/img/${id}-${w}.webp`;

/**
 * Responsive image from the generated manifest (scripts/images.mjs).
 * `id` is the media-src path without extension, e.g. "gallery/sculptures/15".
 * The dominant colour fills the box while the file loads.
 */
export function Img({ id, alt, sizes = '100vw', priority = false, className = '', style, ...rest }) {
  const m = images[id];
  if (!m) {
    if (import.meta.env.DEV) throw new Error(`Img: unknown image id "${id}"`);
    return null;
  }
  const fallback = m.widths.find((w) => w >= 1200) ?? m.widths.at(-1);
  return (
    <img
      src={url(id, fallback)}
      srcSet={m.widths.map((w) => `${url(id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={{ backgroundColor: m.color, ...style }}
      {...rest}
    />
  );
}

export function imageSrc(id, target = 1200) {
  const m = images[id];
  if (!m) return '';
  return url(id, m.widths.find((w) => w >= target) ?? m.widths.at(-1));
}
