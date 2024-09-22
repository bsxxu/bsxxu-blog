'use client';

import { cn } from '@/lib/utils';
import { useScrollValue } from '@/providers/scroll-provider';
import { memo } from 'react';
import { RxArrowUp } from 'react-icons/rx';

function BackTop(props: React.ComponentPropsWithoutRef<'button'>) {
  const { className, ...rest } = props;
  const y = useScrollValue();

  return (
    <button
      className={cn(
        'transition-opacity hover:text-foreground flex items-center gap-2',
        { 'opacity-0': y <= 500 },
        className,
      )}
      onClick={() => window.scrollTo({ top: 0 })}
      {...rest}
    >
      <RxArrowUp />
      回到顶部
    </button>
  );
}

export default memo(BackTop);
