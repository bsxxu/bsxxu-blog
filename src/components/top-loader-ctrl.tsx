'use client';

import { showLoader } from '@/store/showloader';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function TopLoaderCtrl({
  children,
}: {
  children: React.ReactNode;
}) {
  const setShowLoader = useSetAtom(showLoader);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 1000);
    return () => setShowLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
}
