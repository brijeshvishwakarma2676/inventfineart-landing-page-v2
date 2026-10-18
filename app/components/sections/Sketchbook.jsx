import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { Button } from '../ui/Button';
import { categoryBySlug } from '../../data/categories';
import { designs } from '../../data/designs';
import { useReducedMotion } from '../../motion/useReducedMotion';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { sketches, GROUND, VIEWBOX } from './sketches';

const SCENE_MS = 3500; // a new sketch every 3.5 s (it draws in ~2.3 s, then holds)
const DRAW_SPREAD = 1.2; // seconds between the first and the last line starting to draw

const titleByCode = Object.fromEntries(designs.map((d) => [d.code, d.title]));

// One scene per product line; every path gets its start delay once, here.
export const scenes = sketches.map((s, i) => {
  const total = s.objects.reduce((n, o) => n + o.d.length, 0);
  let n = 0;
  return {
    ...s,
    num: String(i + 1).padStart(2, '0'),
    line: categoryBySlug[s.line],
    objects: s.objects.map((o) => ({
      ...o,
      paths: o.d.map((d) => ({ d, delay: `${((n++ / total) * DRAW_SPREAD).toFixed(2)}s` })),
    })),
  };
});

/**
 * The drawings, stacked: the one at `index` shows; when `drawn`, it draws itself line by line (`.sketch` in
 * global.css), and the one it replaces rubs out after fading. Decorative: callers caption what is drawn.
 */
export function SketchStage({ index, drawn, className = '' }) {
  return (
    <div className={`relative aspect-[780/310] w-full ${className}`} aria-hidden="true">
      {scenes.map((s, i) => {
        const on = i === index;
        return (
          <svg
            key={s.line.slug}
            viewBox={VIEWBOX}
            className={`sketch absolute inset-0 size-full transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
            data-drawn={on && drawn ? '' : undefined}
          >
            <path d={`M 20 ${GROUND} L 780 ${GROUND}`} pathLength="1" className="text-accent-light" style={{ '--d': '0s' }} />
            {s.objects.map((o, k) => (
              <g key={k} transform={`translate(${o.x} ${GROUND})`} className={o.figure ? 'text-cream/45' : 'text-cream'}>
                {o.paths.map((p, j) => (
                  <path key={j} d={p.d} pathLength="1" style={{ '--d': p.delay }} />
                ))}
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}

/**
 * Sketchbook (dark band on Home, ported from site-v4): one line drawing per product line, each drawn from real
 * designs in the catalogue. A drawing draws itself line by line (`.sketch` in global.css), holds, then gives way to
 * the next. It starts when the band scrolls into view and rubs out when it leaves, so it draws again on return.
 * The prerendered page shows the first drawing complete. Pausable; under reduced motion nothing draws or advances
 * by itself, and the 01–05 buttons switch drawings at once.
 */
export function Sketchbook() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(null); // null until the observer reports (prerendered: drawn)
  const [userPaused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const band = useRef(null);
  const { open } = useEnquiry();
  const drawn = reduced || visible !== false;
  const running = !reduced && !userPaused && visible === true;
  const active = scenes[index];

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.35) setVisible(true);
        else if (!e.isIntersecting) setVisible(false);
      },
      { threshold: [0, 0.35] },
    );
    io.observe(band.current);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % scenes.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [index, running]);

  return (
    <Section tone="dark" ref={band} aria-labelledby="sketchbook-title" aria-roledescription="carousel">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:col-span-7" data-reveal="up">
            <p className="text-micro font-bold uppercase tracking-eyebrow text-accent-light">Sketchbook</p>
            <h2 id="sketchbook-title" className="text-h2 text-cream">
              We can turn your ideas and imagination <em className="text-accent-light">into reality.</em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-5" data-reveal="up">
            <p className="max-w-md text-cream/75">
              Send us a concept, a drawing or a reference photo. We make it to your design and requirements.
            </p>
            <Button onClick={() => open({ category: active.line.slug })} arrow>
              Share your concept
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* The drawings on a sheet of dotted paper; decorative (the caption names what is drawn) */}
          <div
            className="sketch-paper relative flex items-center overflow-hidden rounded-image border border-cream/10 lg:order-2 lg:col-span-8"
            aria-hidden="true"
          >
            <p className="absolute left-5 top-4 font-display text-base italic text-cream/50 md:left-8 md:top-6">
              Fig. {active.num} — {active.line.name}
            </p>
            <SketchStage index={index} drawn={drawn} className="mx-3 mb-4 mt-12 md:mx-8 md:my-16" />
          </div>

          <div className="flex flex-col gap-10 lg:order-1 lg:col-span-4 lg:justify-between">
            {/* The line on show (announced politely when it changes by hand) */}
            <div aria-live={running ? 'off' : 'polite'} className="flex flex-col gap-4">
              <p className="text-micro font-bold uppercase tracking-eyebrow text-accent-light">
                {active.num} / 0{scenes.length} · Sketch
              </p>
              <h3 className="text-h2 text-cream">{active.line.name}</h3>
              <p className="font-display text-xl italic leading-snug text-cream/70">{active.line.tagline}</p>
              <p className="text-micro font-semibold uppercase tracking-label text-cream/55">
                Drawn from{' '}
                {active.codes.map((code, i) => (
                  <span key={code}>
                    {i > 0 && ' · '}
                    <Link
                      to={`/${active.line.slug}#${code}`}
                      title={titleByCode[code]}
                      aria-label={`${titleByCode[code]}, design ${code}`}
                      className="text-cream underline decoration-accent-light underline-offset-4 transition-colors hover:text-accent-light"
                    >
                      {code}
                    </Link>
                  </span>
                ))}
              </p>
              <Link
                to={`/${active.line.slug}`}
                className="group mt-1 inline-flex items-center gap-2 self-start text-small font-semibold text-accent-light transition-colors hover:text-cream"
              >
                Explore {active.line.name}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>

            {/* 01–05: a row on phones, a ruled list from 1024px */}
            <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] border-t border-cream/30 lg:grid-cols-1">
              {scenes.map((s, i) => {
                const on = i === index;
                return (
                  <button
                    key={s.line.slug}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setVisible(true);
                    }}
                    aria-label={`Show the ${s.line.name} sketch`}
                    aria-current={on}
                    className={`relative flex items-baseline gap-3 border-r border-cream/10 py-3.5 pl-3 text-left transition-colors first:pl-0 lg:border-r-0 lg:border-b lg:pl-0 ${
                      on ? 'text-cream' : 'text-cream/55 hover:text-cream'
                    }`}
                  >
                    <span className={`font-display text-2xl italic leading-none ${on ? 'text-accent-light' : ''}`}>{s.num}</span>
                    <span className="hidden text-micro font-bold uppercase tracking-label lg:inline">{s.line.name}</span>
                    {/* progress: fills over the drawing's time while playing */}
                    <span className="absolute inset-x-0 -bottom-px h-px overflow-hidden" aria-hidden="true">
                      <span
                        key={`${index}-${running}`}
                        className={`block h-full bg-accent-light ${on ? (running ? 'animate-[progress_3500ms_linear_forwards]' : 'w-full') : 'w-0'}`}
                      />
                    </span>
                  </button>
                );
              })}
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={userPaused ? 'Play sketches' : 'Pause sketches'}
                  className="grid place-items-center px-3 text-cream/55 transition-colors hover:text-cream lg:justify-start lg:px-0 lg:py-3.5"
                >
                  {userPaused ? <Play className="size-4" strokeWidth={1.75} /> : <Pause className="size-4" strokeWidth={1.75} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
