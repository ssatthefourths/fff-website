import { useRef, useCallback } from 'react';

export function useScrollCarousel(scrollAmount = 320) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  return { scrollRef, scrollLeft, scrollRight };
}
