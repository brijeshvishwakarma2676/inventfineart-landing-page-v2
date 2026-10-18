import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Img } from '../ui/Img';
import { Button } from '../ui/Button';
import { SketchStage, scenes } from './Sketchbook';
import { site } from '../../data/site';
import { designs } from '../../data/designs';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { useReducedMotion } from '../../motion/useReducedMotion';
import { gsap, useGSAP } from '../../motion/gsap';

const SLIDE_MS = 3500; // a new sketch every 3.5 s (it draws in ~2.3 s, then holds)

// The real piece shown beside each drawing: one design the drawing was made from.
const PLATE = {
  sculptures: 'IFA-SC-012',
  'designer-planters': 'IFA-PL-003',
  'grc-products': 'IFA-GRC-002',
  'grc-grilles': 'IFA-GRL-003',
  'frp-products': 'IFA-FRP-002',
};
const designByCode = Object.fromEntries(designs.map((d) => [d.code, d]));
const plates = scenes.map((s) => designByCode[PLATE[s.line.slug]]);

/**
 * Home hero (sketch hero, ported from site-v4 into v3's look): the headline on the left; on the right a sheet of
 * dotted paper where one product line's drawing draws itself, every 3.5 s, with a framed photo of the real piece
 * in the caption ("from sketch to the real thing"). The first drawing is complete in the prerendered page.
 * A ruled 01–05 strip switches lines. Pausable; under reduced motion it never advances by itself.
 */
export function Hero() {
  const { hero } = site;
  const [index, setIndex] = useState(0);
  const [userPaused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const paused = userPaused || reduced;
  const { open } = useEnquiry();
  const scope = useRef(null);
  const active = scenes[index];
  const plate = plates[index];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % scenes.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('[data-hero-in]', { y: 32, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, delay: 0.1 });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-roledescription="carousel"
      aria-label="Our five product lines"
      className="relative isolate flex min-h-[100svh] flex-col bg-dark text-cream"
    >
      <div className="container-site grid flex-1 content-center gap-10 pb-10 pt-28 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-40">
        {/* Headline and the line on show */}
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div className="flex flex-col gap-6">
            <p data-hero-in className="text-micro font-bold uppercase tracking-eyebrow text-accent-light">
              {hero.eyebrow}
            </p>
            <h1 data-hero-in className="text-h1 font-medium text-cream lg:text-[clamp(3.25rem,1.6rem+2.9vw,4.75rem)]">
              {hero.title} <em className="font-medium text-accent-light">{hero.titleItalic}</em>
            </h1>
            <p data-hero-in className="max-w-md text-cream/75 md:text-lg">
              {hero.sub}
            </p>
            <div data-hero-in className="mt-1 flex flex-wrap gap-3">
              <Button to="/products" arrow>
                Explore Products
              </Button>
              <Button variant="onDark" onClick={() => open()}>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* From 1024px: the drawing's caption, with the real piece it was drawn from */}
          <div data-hero-in aria-live={paused ? 'polite' : 'off'} className="hidden gap-5 border-t border-cream/25 pt-5 lg:flex">
            <Link
              to={`/${active.line.slug}#${plate.code}`}
              className="group relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-image border-[3px] border-cream bg-surface-2"
              aria-label={`See the real piece: ${plate.title}, ${plate.code}`}
            >
              {plates.map((p, i) => (
                <Img
                  key={p.code}
                  id={p.image}
                  alt=""
                  sizes="112px"
                  priority={i === 0}
                  className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 group-hover:scale-105 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </Link>
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="text-micro font-bold uppercase tracking-eyebrow text-accent-light">
                {active.num} / 0{scenes.length} · Sketch
              </p>
              <p className="font-display text-h3 leading-tight text-cream">{active.line.name}</p>
              <p className="text-small text-cream/65">
                The real piece: {plate.title} <span className="text-cream/45">({plate.code})</span>
              </p>
              <Link
                to={`/${active.line.slug}`}
                className="group mt-1 inline-flex items-center gap-2 self-start text-small font-semibold text-accent-light transition-colors hover:text-cream"
              >
                Explore {active.line.name}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* The sketchbook sheet */}
        {/* From 1024px the sheet runs the full height of the text column, the drawing standing at its foot */}
        <div data-hero-in className="lg:col-span-7">
          <div className="sketch-paper relative flex h-full flex-col justify-end overflow-hidden rounded-image border border-cream/10 px-3 pb-4 pt-12 md:px-8 md:pb-8 md:pt-16">
            <p className="absolute left-4 top-3.5 font-display text-base italic text-cream/50 md:left-8 md:top-6" aria-hidden="true">
              Fig. {active.num} — {active.line.name}
            </p>
            <p className="absolute right-4 top-4 text-micro font-semibold uppercase tracking-label text-cream/35 md:right-8 md:top-7" aria-hidden="true">
              Made to your design
            </p>
            <SketchStage index={index} drawn />
          </div>
        </div>
      </div>

      {/* Ruled strip of 01–05 */}
      <div className="container-site">
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] border-t border-cream/30">
          {scenes.map((s, i) => {
            const on = i === index;
            return (
              <button
                key={s.line.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.num} ${s.line.name}`}
                aria-current={on}
                className={`relative flex flex-col items-start gap-1.5 border-r border-cream/10 py-4 pl-3 pr-3 text-left transition-colors first:pl-0 ${
                  on ? 'text-cream' : 'text-cream/55 hover:text-cream'
                }`}
              >
                {/* progress: fills over the slide's time while playing */}
                <span className="absolute inset-x-0 -top-px h-px overflow-hidden" aria-hidden="true">
                  <span
                    key={`${index}-${paused}`}
                    className={`block h-full bg-accent-light ${on ? (paused ? 'w-full' : 'animate-[progress_3500ms_linear_forwards]') : 'w-0'}`}
                  />
                </span>
                <span className={`font-display text-2xl italic leading-none sm:text-3xl ${on ? 'text-accent-light' : ''}`}>{s.num}</span>
                <span className="hidden text-micro font-bold uppercase tracking-label sm:block">{s.line.name}</span>
              </button>
            );
          })}
          {/* Under reduced motion nothing plays, so there is nothing to pause */}
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="grid place-items-center px-3 text-cream/55 transition-colors hover:text-cream sm:px-4"
            >
              {paused ? <Play className="size-4" strokeWidth={1.75} /> : <Pause className="size-4" strokeWidth={1.75} />}
            </button>
          )}
        </div>

        {/* Phones and tablets: the caption in one row, with the real piece */}
        <Link
          to={`/${active.line.slug}#${plate.code}`}
          className="flex items-center gap-3 pb-5 lg:hidden"
          aria-label={`${active.line.name}. See the real piece: ${plate.title}, ${plate.code}`}
        >
          <span className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-image border-2 border-cream bg-surface-2">
            <Img id={plate.image} alt="" sizes="48px" className="size-full object-cover" />
          </span>
          <span className="min-w-0 text-micro font-bold uppercase tracking-label text-accent-light">
            {active.num} / 0{scenes.length} · {active.line.name}
            <span className="mt-0.5 block truncate font-semibold normal-case tracking-normal text-cream/60">
              The real piece: {plate.title}
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
