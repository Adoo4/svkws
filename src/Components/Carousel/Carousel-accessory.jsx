import { useCallback, useEffect, useState, forwardRef } from 'react';

/**
 * Custom hook to manage Embla carousel dots
 * @param {EmblaApi} emblaApi - Embla carousel API
 * @param {Function} onButtonClick - Optional callback when dot is clicked
 */
export const useDotButton = (emblaApi, onButtonClick) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Scroll to a slide and invoke optional callback
  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  // Initialize scroll snaps
  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // Update selected index on carousel select
  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi
      .on('reInit', onInit)
      .on('reInit', onSelect)
      .on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

/**
 * DotButton component for carousel navigation
 * Uses forwardRef to comply with React strict mode
 */
export const DotButton = forwardRef(({ children, ...props }, ref) => (
  <button type="button" ref={ref} {...props}>
    {children}
  </button>
));
