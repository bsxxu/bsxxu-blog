'use client';

import { showLoader } from '@/store/showloader';
import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
  const show = useAtomValue(showLoader);
  const { theme } = useTheme();

  return show ? (
    theme === 'light' ? (
      <NextTopLoader
        showSpinner={false}
        color="#535353"
        shadow={false}
        zIndex={20}
      />
    ) : (
      <NextTopLoader
        showSpinner={false}
        color="#FFFFFF"
        shadow={false}
        zIndex={20}
      />
    )
  ) : null;
}
