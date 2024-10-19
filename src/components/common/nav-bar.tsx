'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = ['post', 'project'];

export default function NavBar() {
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
