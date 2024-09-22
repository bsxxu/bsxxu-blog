import { cn } from '@/lib/utils';
import { RxLink2 } from 'react-icons/rx';

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
      <a href={`#${id}`} className="flex items-center no-underline font-bold">
        <RxLink2
          className={cn(
            'absolute transition-opacity opacity-0 group-hover:opacity-100 -translate-x-7',
            { ['-translate-x-10']: H === 'h1' },
          )}
        />
        {children}
      </a>
    </H>
  );
}
