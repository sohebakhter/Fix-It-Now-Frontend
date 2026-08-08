import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <SearchX className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
