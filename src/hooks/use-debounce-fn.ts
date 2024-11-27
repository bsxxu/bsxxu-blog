import { useCallback, useMemo } from 'react';

export default function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  deps?: any[],
) {
  const f = useCallback(fn, deps ?? []);
  return useMemo(() => {
    let timer: NodeJS.Timeout | undefined;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  }, [f, delay]);
}
