import { useState, useRef, useEffect } from 'react';

type UseIntersectionObserverOptions = IntersectionObserverInit;

const useObserver = (
  options?: UseIntersectionObserverOptions,
): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);
  return [elementRef, isInView];
};

export default useObserver;
