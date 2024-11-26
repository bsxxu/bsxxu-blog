'use client';

import { cn } from '@/lib/utils';
import { useScrollValue } from '@/providers/scroll-provider';
import { memo } from 'react';

function BackTop(props: React.ComponentPropsWithoutRef<'button'>) {
  const { className, ...rest } = props;
  const y = useScrollValue();

  return (
    <button
      className={cn(
        'hover:text-foreground flex items-center gap-2',
        { invisible: y <= 500 },
        className,
      )}
      onClick={() => window.scrollTo({ top: 0 })}
      {...rest}
    >
      <span className="i-ri-arrow-up-fill" />
      回到顶部
    </button>
  );
}

export default memo(BackTop);
