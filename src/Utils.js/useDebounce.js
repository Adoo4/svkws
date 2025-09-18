import { useRef, useEffect, useCallback } from "react";

/**
 * useDebounce
 * Returns a debounced function with .cancel() support
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 */
export function useDebounce(fn, delay = 300) {
  const timeoutRef = useRef(null);
  const fnRef = useRef(fn);

  // Keep latest fn
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debouncedFn = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fnRef.current(...args);
    }, delay);
  }, [delay]);

  // Add cancel method like lodash
  debouncedFn.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFn;
}
