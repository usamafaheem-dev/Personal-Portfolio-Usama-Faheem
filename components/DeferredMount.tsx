'use client';

import { useState, useEffect } from 'react';

export default function DeferredMount({
  children,
  delay = 3000,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) return null;
  return <>{children}</>;
}
