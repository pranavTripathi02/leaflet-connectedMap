"use client";
import { useEffect, useState } from "react";

function useDebounce<T>(val: T) {
  const [debouncedValue, setDebouncedValue] = useState<T>(val);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(val);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [val]);

  return debouncedValue;
}

export default useDebounce;
