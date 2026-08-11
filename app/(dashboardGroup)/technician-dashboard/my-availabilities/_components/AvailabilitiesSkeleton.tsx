import { Loader2 } from "lucide-react";

export function AvailabilitiesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header section skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-80 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-muted animate-pulse rounded-xl" />
      </div>

      {/* Main Layout Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Sidebar Date List Skeleton */}
        <div className="md:col-span-4 space-y-4">
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-border/50 bg-muted/20 animate-pulse flex items-center justify-between"
              >
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-28 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Details Skeleton */}
        <div className="md:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl border border-border/50 bg-card space-y-6">
            <div className="flex justify-between items-center border-b border-border/40 pb-4">
              <div className="space-y-2">
                <div className="h-6 w-40 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-9 w-32 bg-muted animate-pulse rounded-xl" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-muted/40 animate-pulse border border-border/60 flex items-center justify-center"
                >
                  <Loader2 className="size-5 text-muted-foreground animate-spin" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
