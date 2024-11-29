'use client';

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
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <h2>Something went wrong!!!!!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
