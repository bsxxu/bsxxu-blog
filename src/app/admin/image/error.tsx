'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen w-full">
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>重试</Button>
    </div>
  );
}
