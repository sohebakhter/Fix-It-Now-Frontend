"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ServicePaginationProps = {
  page: number;
  hasNext: boolean;
};

export function ServicePagination({ page, hasNext }: ServicePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 backdrop-blur-xs px-5 py-3 text-sm text-muted-foreground shadow-xs">
      <span className="font-medium text-xs text-muted-foreground">
        Page <span className="font-semibold text-foreground">{page}</span>
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1 || isPending}
          onClick={() => handlePageChange(page - 1)}
          className="gap-1 rounded-xl text-xs"
        >
          <ChevronLeft className="size-4" />
          <span>Previous</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasNext || isPending}
          onClick={() => handlePageChange(page + 1)}
          className="gap-1 rounded-xl text-xs"
        >
          <span>Next</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
