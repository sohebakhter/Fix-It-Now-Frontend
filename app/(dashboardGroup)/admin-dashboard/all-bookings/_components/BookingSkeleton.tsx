import { Skeleton } from "@/components/ui/skeleton";

export function BookingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-border/50 bg-card flex flex-col animate-pulse overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-border/30 bg-muted/5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-3/4 rounded-lg" />
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 flex-1">
            {/* Customer Info */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-32 rounded-md" />
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-2/3 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md" />
                </div>
              </div>
            </div>

            {/* Timeslot */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-28 rounded-md" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-lg" />
            </div>
          </div>

          {/* Footer action */}
          <div className="px-5 py-3.5 border-t border-border/30 bg-muted/5 flex justify-end">
            <Skeleton className="h-8 w-28 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingSkeleton;
