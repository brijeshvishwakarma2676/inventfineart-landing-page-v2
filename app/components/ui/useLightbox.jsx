import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { images } from '../../data/images.generated';

const LightboxImpl = lazy(() => import('./LightboxImpl'));
const url = (id, w) => `/img/${id}-${w}.webp`;

/**
 * Full-screen photo viewer for a list of { image, alt, title?, code? }.
 * Returns open(index) and the element to render; the viewer's code loads on first open.
 */
export function useLightbox(items) {
  const [index, setIndex] = useState(-1);
  const slides = useMemo(
    () =>
      items.map((it) => {
        const m = images[it.image];
        const top = m.widths.at(-1);
        return {
          src: url(it.image, top),
          width: top,
          height: Math.round((m.h * top) / m.w),
          alt: it.alt,
          title: it.title,
          description: it.code,
          srcSet: m.widths.map((w) => ({ src: url(it.image, w), width: w, height: Math.round((m.h * w) / m.w) })),
        };
      }),
    [items],
  );
  const open = useCallback((i) => setIndex(i), []);
  const element =
    index >= 0 ? (
      <Suspense fallback={null}>
        <LightboxImpl open index={index} close={() => setIndex(-1)} slides={slides} />
      </Suspense>
    ) : null;
  return { open, element };
}
