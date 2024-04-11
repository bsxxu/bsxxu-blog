'use client';

import { cm } from '@/utils/common';
import { useTheme } from 'next-themes';
import { useIsClient } from 'foxact/use-is-client';
import * as Popover from '@radix-ui/react-popover';
import { RiComputerLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useCallback, useEffect, useState } from 'react';

export default function ThemesToggle({ isScroll }: { isScroll: boolean }) {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    isScroll && setOpen(false);
  }, [isScroll]);

  return (
    <Popover.Root open={!open ? false : undefined}>
      <Popover.Trigger asChild>
        <button
          className="hover:text-ft-strong transition-colors"
          onClick={() => setOpen(true)}
        >
          {isClient && theme === 'system' && <RiComputerLine />}
          {isClient && theme === 'light' && <RiSunLine />}
          {isClient && theme === 'dark' && <RiMoonLine />}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          asChild
          className="z-40 popover-content"
          sideOffset={15}
        >
          <div className="flex flex-col gap-1 backdrop-blur border-[2px] rounded-md border-ft-minor/50 p-2">
            <button
              className={cm(
                'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-ft-minor/30',
                { ['bg-ft-minor/30']: isClient && theme === 'system' },
              )}
              onClick={useCallback(() => setTheme('system'), [setTheme])}
            >
              <RiComputerLine />
              system
            </button>
            <button
              className={cm(
                'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-ft-minor/30',
                { ['bg-ft-minor/30']: isClient && theme === 'light' },
              )}
              onClick={useCallback(() => setTheme('light'), [setTheme])}
            >
              <RiSunLine />
              light
            </button>
            <button
              className={cm(
                'flex items-center transition-colors gap-2 p-1 rounded-md hover:bg-ft-minor/30',
                { ['bg-ft-minor/30']: isClient && theme === 'dark' },
              )}
              onClick={useCallback(() => setTheme('dark'), [setTheme])}
            >
              <RiMoonLine />
              dark
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
