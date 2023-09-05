import { useState, useEffect, useCallback } from 'react';

export default function useDebounce(value: string, delay: number = 100) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useDebouncedFunc = (
  func: () => Promise<void>,
  delay: number = 200,
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      func();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [func, delay]);
};
