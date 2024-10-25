'use client';

import { useIsClient } from 'foxact/use-is-client';
import { ThemeProvider as Provider } from 'next-themes';

export default function ThemeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const isClient = useIsClient();
  return isClient ? (
    <Provider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </Provider>
  ) : null;
}
