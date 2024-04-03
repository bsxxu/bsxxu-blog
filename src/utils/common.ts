import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cm = (...args: any[]) => {
  return twMerge(clsx(args));
};
