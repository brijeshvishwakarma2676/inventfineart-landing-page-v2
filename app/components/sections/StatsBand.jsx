import { useRef } from 'react';
import { gsap, useGSAP } from '../../motion/gsap';
import { site } from '../../data/site';

/** Dark band of real (client-confirmed) figures that count up once on scroll (spec §3.4). */
export function StatsBand({ className = '' }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ref.current.querySelectorAll('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const state = { v: 0 };
        el.textContent = '0';
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`bg-dark text-cream ${className}`}>
      <dl className="container-site grid grid-cols-1 divide-y divide-cream/12 py-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:py-16">
        {site.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse items-center gap-2 py-6 text-center sm:py-0">
            <dt className="text-micro font-bold uppercase tracking-eyebrow text-cream/65">{s.label}</dt>
            <dd className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none">
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
