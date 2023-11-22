'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Loading from './loading';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.name);
  }, [error]);

  return (
    <div className="relative w-full items-center h-full justify-center">
      <Loading />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
        <h2>Something went wrong!</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
