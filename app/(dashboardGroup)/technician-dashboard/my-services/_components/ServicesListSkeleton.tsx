import { Loader2 } from "lucide-react";

export function ServicesListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-148 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-180 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="h-10 w-28 bg-muted animate-pulse rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-56 rounded-3xl bg-muted/40 animate-pulse border border-border/60 flex items-center justify-center"
          >
            <Loader2 className="size-6 text-muted-foreground animate-spin" />
          </div>
        ))}
      </div>
    </div>
  );
}