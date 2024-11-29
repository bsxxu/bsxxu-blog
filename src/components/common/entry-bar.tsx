'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EntryBar({
  nav,
}: { nav: { title: string; url: string }[] }) {
  const segments = usePathname();
  return (
    <>
      {nav.map((n) => (
        <Link
          key={n.url}
          href={n.url}
          className={cn('transition-colors hover:text-accent-foreground', {
            ['font-semibold text-accent-foreground']: segments.includes(n.url),
          })}
        >
          {n.title}
        </Link>
      ))}
    </>
  );
}
