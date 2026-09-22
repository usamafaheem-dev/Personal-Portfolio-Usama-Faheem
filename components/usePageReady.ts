'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to ensure component animations ONLY trigger AFTER the global Preloader has finished.
 * Prevents animations from running invisibly behind the preloader on page refresh or initial load.
 */
export function usePageReady(): boolean {
  const [isReady, setIsReady] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (window as any).__preloaderDone === true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).__preloaderDone === true) {
      setIsReady(true);
      return;
    }

    const handleReady = () => {
      setIsReady(true);
    };

    window.addEventListener('preloaderExiting', handleReady);
    window.addEventListener('preloaderComplete', handleReady);

    // Hard fallback safety: Always activate readiness within 2.2s
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 2200);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('preloaderExiting', handleReady);
      window.removeEventListener('preloaderComplete', handleReady);
    };
  }, []);

  return isReady;
}

export default usePageReady;
