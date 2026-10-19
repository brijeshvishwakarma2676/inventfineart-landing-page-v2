import { useRef } from 'react';
import { preload } from 'react-dom';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img, imageSrc } from '../ui/Img';
import { site } from '../../data/site';
import { images } from '../../data/images.generated';
import { gsap, useGSAP } from '../../motion/gsap';

/**
 * Home hero, Bonasila-style (THREE-DEMOS-DIRECTION.md §4 v2.3): one full-bleed lifestyle photo, one huge bold
 * headline and "Explore the range". A soft gradient from the bottom-left keeps the white text readable.
 * The photo settles with a slow zoom (≤ 1.06); static under reduced motion.
 */
export function Hero() {
  const { hero } = site;
  const photo = hero.photo;
  const scope = useRef(null);

  // Let the browser start fetching the photo while it parses the page.
  const m = images[photo.image];
  preload(imageSrc(photo.image, 1600), {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: m.widths.map((w) => `/img/${photo.image}-${w}.webp ${w}w`).join(', '),
    imageSizes: '100vw',
  });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('[data-hero-in]', { y: 36, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.15 });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-surface-2 text-cream">
      <Img
        id={photo.image}
        alt={photo.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover motion-safe:animate-[kenburns_16s_ease-out_forwards]"
        style={{ objectPosition: photo.position }}
      />
      {/* Readability: a soft wash from the bottom-left corner, where the words sit */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/80 via-dark/55 via-40% to-dark/0 to-75%" aria-hidden="true" />
      {/* Phones: the words cross the pale planter in the middle, so the wash is deeper there */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-linear-to-t from-dark/60 via-dark/20 to-transparent max-md:from-dark/85 max-md:via-dark/60" aria-hidden="true" />

      <div className="container-site flex flex-col gap-8 pb-14 pt-40 md:pb-20">
        <p data-hero-in className="text-micro font-bold uppercase tracking-eyebrow text-cream/90">
          {hero.eyebrow}
        </p>
        <h1 data-hero-in className="max-w-[11ch] text-hero font-extrabold text-cream">
          {hero.title} <em className="text-accent-light">{hero.titleItalic}</em>
        </h1>
        <div data-hero-in className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <a
            href="#collections"
            className="group inline-flex items-center gap-3 border-b-2 border-cream pb-1.5 text-body font-extrabold text-cream transition-colors hover:border-accent-light hover:text-accent-light"
          >
            Explore the range
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
          </a>
          <Link
            to={`/${photo.category}#${photo.code}`}
            className="rounded-button bg-dark/60 px-2.5 py-1.5 text-micro font-semibold uppercase tracking-label text-cream backdrop-blur-sm transition-colors hover:bg-dark/75"
          >
            On show: {photo.caption} · {photo.code}
          </Link>
        </div>
      </div>
    </section>
  );
}
