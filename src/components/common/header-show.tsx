'use client';

import { usePathname } from 'next/navigation';

export default function HeaderShow({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname().split('/');
  if (pathname.length > 2 && pathname[1] === 'post') return null;
  return children;
}
