import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Heading<
  T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
>(
  props: React.ComponentPropsWithoutRef<T> & {
    as?: T;
  },
) {
  const { children, id, className, as, ...rest } = props;
  const H = as ?? 'h1';
  return (
    <H id={id} {...rest} className={cn('scroll-m-32 group', className)}>
      <Link
        href={`#${id}`}
        className="flex items-center no-underline font-bold"
      >
        <span
          className={cn(
            'i-ri-links-fill absolute transition-opacity opacity-0 group-hover:opacity-100 -translate-x-7',
            { ['-translate-x-10']: H === 'h1' },
          )}
        />
        {children}
      </Link>
    </H>
  );
}
