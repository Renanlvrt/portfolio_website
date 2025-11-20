/**
 * useLazyLoad Hook
 * 
 * Performance optimization hook for lazy loading components and assets.
 * Uses Intersection Observer API for efficient loading.
 */

import { useEffect, useState, RefObject } from "react";

export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isVisible;
}

export function useLazyLoad3D(
  shouldLoad: boolean,
  loadDelay: number = 0
): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!shouldLoad) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, loadDelay);

    return () => clearTimeout(timer);
  }, [shouldLoad, loadDelay]);

  return isLoaded;
}

