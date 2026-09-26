'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

const mountAllListeners = new Set<() => void>();
let allMounted = false;
let globalListenersAttached = false;

function mountAll() {
  if (allMounted) return;
  allMounted = true;
  flushSync(() => {
    mountAllListeners.forEach((fn) => fn());
  });
}

function attachGlobalListeners() {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  // Capture phase runs before the browser's default hash-scroll, so the target exists when it jumps.
  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (link) mountAll();
    },
    true
  );
  window.addEventListener('hashchange', mountAll);
  window.addEventListener('app-mount-all-sections', mountAll);
  if (window.location.hash) mountAll();
}

export function ensureAllSectionsMounted() {
  if (typeof window !== 'undefined') {
    attachGlobalListeners();
    mountAll();
  }
}

export default function LazySection({
  children,
  name,
  minHeight = '100vh',
}: {
  children: ReactNode;
  name: string;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    attachGlobalListeners();
    if (allMounted) {
      setMounted(true);
      return;
    }

    const show = () => setMounted(true);
    mountAllListeners.add(show);

    const el = ref.current;
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show();
            observer?.disconnect();
          }
        },
        { rootMargin: '600px 0px' }
      );
      observer.observe(el);
    }

    return () => {
      mountAllListeners.delete(show);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} data-lazy={name} style={mounted ? undefined : { minHeight }}>
      {mounted ? children : null}
    </div>
  );
}
