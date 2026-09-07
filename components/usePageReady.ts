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

    const handleComplete = () => {
      setIsReady(true);
    };

    window.addEventListener('preloaderComplete', handleComplete);
    return () => {
      window.removeEventListener('preloaderComplete', handleComplete);
    };
  }, []);

  return isReady;
}

export default usePageReady;
