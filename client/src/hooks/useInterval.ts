import { useEffect, useRef } from "react";

type UseInterval = {
  (callback: () => void, interval: number): void;
}

export const useInterval: UseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const id = setInterval(tick, interval);

    return () => clearInterval(id);
  }, [interval])
}
