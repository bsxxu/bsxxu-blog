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
