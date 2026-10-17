import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from './gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Smooth scroll for the whole site, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Not mounted when the visitor prefers reduced motion (native scrolling instead).
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const enabled = !useReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [enabled]);

  // Root Lenis registers itself globally, so this works outside the provider tree.
  useLenis(() => ScrollTrigger.update());

  return (
    <>
      {enabled && (
        <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -96 } }} />
      )}
      {children}
    </>
  );
}
