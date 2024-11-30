import { transError } from '@/service/error';
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { twMerge } from 'tailwind-merge';
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeFormat(time: string, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(pattern);
}

export function getTime(tz = 'Asia/ShangHai', pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs().tz(tz).format(pattern);
}

export function result(result?: null): { result: null; error: null };
export function result<T>(result: T): { result: T; error: null };
export function result(
  error: any,
  message: string,
): { result: null; error: ReturnType<typeof transError> };
export function result(resultOrError: any, message?: string) {
  if (typeof message === 'string')
    return { result: null, error: transError(resultOrError, message) };
  if (resultOrError === null || resultOrError === undefined)
    return { result: null, error: null };
  return { result: resultOrError, error: null };
}
