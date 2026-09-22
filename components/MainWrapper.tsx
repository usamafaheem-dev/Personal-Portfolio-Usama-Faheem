'use client';

import { useState, useEffect } from 'react';
import { usePageReady } from './usePageReady';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const isPageReady = usePageReady();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isPageReady) {
      setIsRevealed(true);
      return;
    }

    const handleExiting = () => {
      setIsRevealed(true);
    };

    window.addEventListener('preloaderExiting', handleExiting);
    window.addEventListener('preloaderComplete', handleExiting);

    // Guaranteed fallback: never keep site hidden longer than 2.0s
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 2000);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('preloaderExiting', handleExiting);
      window.removeEventListener('preloaderComplete', handleExiting);
    };
  }, [isPageReady]);

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${
        isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
}
