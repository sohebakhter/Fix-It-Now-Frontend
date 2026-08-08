'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-3 text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          An unexpected error occurred while loading this page. Please try again.
        </p>

        <Button onClick={() => reset()} className="mt-6 w-full">
          Try again
        </Button>
      </div>
    </div>
  );
}
