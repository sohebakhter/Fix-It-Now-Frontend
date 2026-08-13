import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-border/50 bg-card p-6 shadow-xs flex flex-col space-y-4 animate-pulse justify-between"
        >
          {/* Top header: Icon placeholder & Title */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3 rounded-lg" />
              <Skeleton className="h-3 w-1/2 rounded-lg" />
            </div>
          </div>

          <hr className="border-border/30" />

          {/* Actions at the bottom */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Skeleton className="h-9 w-20 rounded-xl" />
            <Skeleton className="h-9 w-20 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySkeleton;
