'use client';

import { cm } from '@/utils/common';
import { useTheme } from 'next-themes';

export default function ThemesToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex">
      <button
        className={cm({ ['text-red-500']: theme === 'system' })}
        onClick={() => setTheme('system')}
      >
        system
      </button>
      <button
        className={cm({ ['text-red-500']: theme === 'light' })}
        onClick={() => setTheme('light')}
      >
        light
      </button>
      <button
        className={cm({ ['text-red-500']: theme === 'dark' })}
        onClick={() => setTheme('dark')}
      >
        dark
      </button>
    </div>
  );
}
