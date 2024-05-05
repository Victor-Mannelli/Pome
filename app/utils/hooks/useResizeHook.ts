import { useState, useRef, useEffect } from "react";

export const useObserveElementWidth = <T extends HTMLDivElement>() => {
  const [width, setWidth] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].target.clientWidth);
    });
    
    const savedRef = ref.current;
    if (savedRef) {
      observer.observe(savedRef);
    }

    return () => {
      savedRef && observer.unobserve(savedRef);
    };
  }, []);

  return {
    width,
    ref
  };
};
