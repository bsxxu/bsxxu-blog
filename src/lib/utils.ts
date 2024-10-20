import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
dayjs.extend(utc);
dayjs.extend(timezone);

export function useThrottle<T extends (...args: any[]) => any>(
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeFormat(time: string, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(pattern);
}

export function getTime(tz = 'Asia/ShangHai', pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs().tz(tz).format(pattern);
}
