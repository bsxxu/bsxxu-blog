import { useCallback, useMemo } from 'react';

export default function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = 1000,
  deps?: any[],
) {
  const f = useCallback(fn, deps ?? []);
  return useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>): ReturnType<T> | undefined => {
      if (!timer) {
        const res = f(...args);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
        return res;
      }
    };
  }, [f, delay]);
}
