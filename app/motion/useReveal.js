import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from './gsap';

/**
 * Scroll reveals for every [data-reveal] element inside `scopeRef` (spec §3.5).
 *   data-reveal="up"       fade up 24px, 0.8s, power3.out
 *   data-reveal="stagger"  the element's children fade up one after another (0.08s apart)
 *   data-reveal="clip"     image wipe upwards; the <img> inside settles from scale 1.08 to 1
 * Re-runs when `key` changes (route change). Does nothing under reduced motion.
 */
export function useReveal(scopeRef, key) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = scopeRef.current;
      if (!root) return;
      const trigger = (el) => ({ trigger: el, start: 'top 86%', once: true });

      root.querySelectorAll('[data-reveal="up"]').forEach((el) => {
        gsap.from(el, { y: 24, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: trigger(el) });
      });

      root.querySelectorAll('[data-reveal="stagger"]').forEach((el) => {
        gsap.from(el.children, {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: trigger(el),
        });
      });

      root.querySelectorAll('[data-reveal="clip"]').forEach((el) => {
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: trigger(el) });
        tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' });
        if (img) tl.from(img, { scale: 1.08, duration: 1.4, ease: 'power3.out' }, 0);
      });

      // Images load after layout; recompute trigger positions once they do.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => window.removeEventListener('load', refresh);
    },
    { scope: scopeRef, dependencies: [key], revertOnUpdate: true },
  );
}
