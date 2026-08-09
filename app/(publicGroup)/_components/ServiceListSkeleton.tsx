import { Skeleton } from "@/components/ui/skeleton";

export function ServiceListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <Skeleton className="h-4 w-36 rounded-lg" />
        <Skeleton className="h-4 w-16 rounded-lg" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-3xl border border-border/60 bg-card/40 p-5 space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
