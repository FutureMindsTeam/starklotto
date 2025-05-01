import { useState, useEffect, useRef } from "react";

export function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    // Update debounced value after delay
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear timeout if value or delay changes
    return () => {
      clearTimeout(handler.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
