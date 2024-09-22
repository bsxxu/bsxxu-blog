import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
dayjs.extend(utc);
dayjs.extend(timezone);

export function successToast(msg: string) {
  toast.success(msg, {
    duration: 2000,
    position: 'bottom-right',
    style: {
      border: '2px solid hsl(var(--muted))',
      background: 'hsl(var(--background)',
      color: 'hsl(var(--foreground))',
    },
  });
}

export function errorToast(msg: string) {
  toast.error(msg, {
    duration: 2000,
    position: 'bottom-right',
    style: {
      border: '2px solid hsl(var(--muted))',
      background: 'hsl(var(--background)',
      color: 'hsl(var(--foreground))',
    },
  });
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
