'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar({ nav }: { nav: string[] }) {
  const segments = usePathname().split('/');
  return (
    <>
      {nav.map((n) => (
        <Link
          key={n}
          href={`/${n}`}
          className={cn('transition-colors hover:text-accent-foreground', {
            ['font-semibold text-accent-foreground']: segments[1] === n,
          })}
        >
          {`${n.charAt(0).toUpperCase()}${n.slice(1)}`}
        </Link>
      ))}
    </>
  );
}
