import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { Pause, Play } from 'lucide-react';
import { Img, imageSrc } from '../ui/Img';
import { Button } from '../ui/Button';
import { site } from '../../data/site';
import { images } from '../../data/images.generated';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { gsap, useGSAP } from '../../motion/gsap';
import { useHydrated, useReducedMotion } from '../../motion/useReducedMotion';

const SLIDE_MS = 6500;

/**
 * Full-screen hero (spec §4.1-1). No video yet (spec §7 row 7), so it crossfades between the
 * highest-resolution photos with a slow Ken Burns (≤ 1.06). Pausable; static under reduced motion.
 */
export function Hero() {
  const { hero } = site;
  const slides = hero.slides;
  const [index, setIndex] = useState(0);
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const [userPaused, setPaused] = useState(false);
  const paused = userPaused || reduced;
  const scope = useRef(null);
  const { open } = useEnquiry();

  // Let the browser start fetching the first slide while it parses the page.
  const first = images[slides[0].image];
  preload(imageSrc(slides[0].image, 1600), {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: first.widths.map((w) => `/img/${slides[0].image}-${w}.webp ${w}w`).join(', '),
    imageSizes: '100vw',
  });

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('[data-hero-in]', {
        y: 36,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.15,
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-dark text-cream"
      aria-roledescription="carousel"
      aria-label="Featured work"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.image}
            className={`absolute inset-0 -z-10 transition-opacity duration-[1600ms] ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!active}
          >
            <Img
              id={s.image}
              alt=""
              priority={i === 0}
              sizes="100vw"
              className={`size-full object-cover ${
                active && mounted
                  ? 'scale-[1.06] transition-transform duration-[9000ms] ease-out'
                  : 'scale-100 transition-transform delay-[1600ms] duration-0'
              }`}
              style={{ objectPosition: s.position }}
            />
          </div>
        );
      })}

      {/* Legibility: darken the lower-left where the copy sits */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-dark/85 via-dark/35 to-dark/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/55 via-dark/10 to-transparent" aria-hidden="true" />

      <div className="container-site flex h-full flex-col justify-end pb-24 pt-36 md:pb-28">
        <div className="flex max-w-4xl flex-col gap-6">
          <p data-hero-in className="font-sans text-micro font-bold uppercase tracking-eyebrow text-cream/85">
            {hero.eyebrow}
          </p>
          <h1 data-hero-in className="text-h1 font-medium text-cream md:text-[clamp(3.5rem,2rem+4vw,5.25rem)]">
            {hero.title} <em className="font-medium">{hero.titleItalic}</em>
          </h1>
          <p data-hero-in className="max-w-xl text-body text-cream/85 md:text-lg">
            {hero.sub}
          </p>
          <div data-hero-in className="mt-2 flex flex-wrap gap-3">
            <Button to="/products" arrow>
              Explore Products
            </Button>
            <Button variant="onDark" onClick={() => open()}>
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-site flex items-center justify-between gap-6 border-t border-cream/15 py-5 pr-20 text-micro text-cream/80 md:pr-24">
          <p aria-live="polite" className="font-semibold uppercase tracking-label">
            <span className="text-cream">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-cream/40">/</span>
            {String(slides.length).padStart(2, '0')}
            <span className="ml-4 hidden normal-case tracking-normal text-cream/70 sm:inline">{slides[index].caption}</span>
          </p>
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}: ${s.caption}`}
                aria-current={i === index}
                className="group py-3"
              >
                <span className="block h-px w-10 overflow-hidden bg-cream/30 md:w-14">
                  <span
                    key={`${index}-${paused}`}
                    className={`block h-full bg-cream ${i === index ? (paused ? 'w-full' : 'animate-[progress_6500ms_linear_forwards]') : i < index ? 'w-full' : 'w-0'}`}
                  />
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="ml-1 p-1.5 text-cream/80 hover:text-cream"
            >
              {paused ? <Play className="size-4" strokeWidth={1.5} /> : <Pause className="size-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
