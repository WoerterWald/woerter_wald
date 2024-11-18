'use client';

import { useEffect, useState } from 'react';

const MEDIA_QUERY = '(min-width: 768px)';

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsDesktop(window.matchMedia(MEDIA_QUERY).matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    window.matchMedia(MEDIA_QUERY).addEventListener('change', handler);

    return () => {
      window.matchMedia(MEDIA_QUERY).removeEventListener('change', handler);
    };
  }, []);

  return isDesktop;
};
