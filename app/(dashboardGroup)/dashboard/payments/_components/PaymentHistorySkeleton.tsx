import { Loader2 } from "lucide-react";

export function PaymentHistorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-64 rounded-3xl bg-muted/40 animate-pulse border border-border/60 flex items-center justify-center"
        >
          <Loader2 className="size-6 text-muted-foreground animate-spin" />
        </div>
      ))}
    </div>
  );
}
