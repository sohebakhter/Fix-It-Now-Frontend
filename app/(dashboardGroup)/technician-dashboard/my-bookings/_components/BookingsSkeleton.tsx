import { Loader2 } from "lucide-react";

export function BookingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header section skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-80 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Tabs list skeleton */}
      <div className="flex gap-2 border-b border-border/40 pb-2">
        <div className="h-9 w-24 bg-muted animate-pulse rounded-xl" />
        <div className="h-9 w-24 bg-muted animate-pulse rounded-xl" />
        <div className="h-9 w-28 bg-muted animate-pulse rounded-xl" />
      </div>

      {/* Bookings cards grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 rounded-3xl bg-muted/40 animate-pulse border border-border/60 flex items-center justify-center"
          >
            <Loader2 className="size-6 text-muted-foreground animate-spin" />
          </div>
        ))}
      </div>
    </div>
  );
}
