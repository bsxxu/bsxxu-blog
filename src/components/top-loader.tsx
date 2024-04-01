'use client';

import { showLoader } from '@/store/showloader';
import { useAtomValue } from 'jotai';
import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
  const show = useAtomValue(showLoader);
  return show ? <NextTopLoader showSpinner={false} color="#EEEEEE" /> : null;
}
