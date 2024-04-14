import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

export function timeFormat(
  time: string,
  pattern: string = 'YYYY-MM-DD HH:mm:ss',
) {
  return dayjs(time).format(pattern);
}

export const cm = (...args: any[]) => {
  return twMerge(clsx(args));
};

export function throttled(fn: (...args: any[]) => any, delay = 1000) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => (timer = null), delay);
    }
  };
}
