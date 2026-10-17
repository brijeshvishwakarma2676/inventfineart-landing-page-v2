import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

/** Stops page scrolling (Lenis and native) while `locked` is true. */
export function useScrollLock(locked) {
  const lenis = useLenis();
  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [locked, lenis]);
}
