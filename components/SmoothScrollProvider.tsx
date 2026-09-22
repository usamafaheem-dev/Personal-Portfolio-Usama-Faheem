'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      const handleRecalculate = () => {
        if (lenis) {
          lenis.resize();
          lenis.start();
        }
      };

      window.addEventListener('resize', handleRecalculate);
      window.addEventListener('preloaderExiting', handleRecalculate);
      window.addEventListener('preloaderComplete', handleRecalculate);

      const t1 = setTimeout(handleRecalculate, 500);
      const t2 = setTimeout(handleRecalculate, 1500);
      const t3 = setTimeout(handleRecalculate, 2600);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleRecalculate);
        window.removeEventListener('preloaderExiting', handleRecalculate);
        window.removeEventListener('preloaderComplete', handleRecalculate);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        lenis?.destroy();
      };
    } catch {
      // Fallback to native smooth scroll
    }
  }, []);

  return <>{children}</>;
}
