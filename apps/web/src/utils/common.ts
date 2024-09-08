import clsx from 'clsx';
import dayjs, { DayjsTimezone } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { twMerge } from 'tailwind-merge';
dayjs.extend(utc);
dayjs.extend(timezone);

export function timeFormat(time: string, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(pattern);
}

export function getTime(tz = 'Asia/ShangHai', pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs().tz(tz).format(pattern);
}

export const cm = (...args: any[]) => {
  return twMerge(clsx(args));
};

export function throttled(fn: (...args: any[]) => any, delay = 1000) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}
