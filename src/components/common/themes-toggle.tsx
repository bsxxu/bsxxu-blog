'use client';

import { cn } from '@/lib/utils';
import { useIsClient } from 'foxact/use-is-client';
import { useTheme } from 'next-themes';
import { memo, useCallback, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function ThemesToggle() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={!open ? false : undefined}>
      <PopoverTrigger asChild>
        <button
          className="hover:text-accent-foreground transition-colors flex items-center"
          onClick={() => setOpen(true)}
        >
          {isClient && theme === 'system' && (
            <span className="i-ri-computer-line" />
          )}
          {isClient && theme === 'light' && <span className="i-ri-sun-line" />}
          {isClient && theme === 'dark' && <span className="i-ri-moon-line" />}
        </button>
      </PopoverTrigger>
      <PopoverContent asChild className="z-40" sideOffset={15}>
        <div className="flex flex-col gap-1 backdrop-blur border-[2px] rounded-md border-muted-foreground/50 p-2 max-w-[130px]">
          <button
            type="button"
            className={cn(
              'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-muted-foreground/30',
              { ['bg-muted-foreground/30']: isClient && theme === 'system' },
            )}
            onClick={useCallback(() => setTheme('system'), [setTheme])}
          >
            <span className="i-ri-computer-line" />
            system
          </button>
          <button
            type="button"
            className={cn(
              'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-muted-foreground/30',
              { ['bg-muted-foreground/30']: isClient && theme === 'light' },
            )}
            onClick={useCallback(() => setTheme('light'), [setTheme])}
          >
            <span className="i-ri-sun-line" />
            light
          </button>
          <button
            type="button"
            className={cn(
              'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-muted-foreground/30',
              { ['bg-muted-foreground/30']: isClient && theme === 'dark' },
            )}
            onClick={useCallback(() => setTheme('dark'), [setTheme])}
          >
            <span className="i-ri-moon-line" />
            dark
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(ThemesToggle);
