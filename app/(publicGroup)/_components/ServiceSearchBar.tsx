"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { IServiceQuery } from "@/lib/types";

type ServiceSearchBarProps = {
  query?: IServiceQuery;
};

export function ServiceSearchBar({ query = {} }: ServiceSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(query.searchTerm ?? "");

  // Sync with URL changes (e.g. browser back/forward)
  const [prevSearchTerm, setPrevSearchTerm] = useState(query.searchTerm);
  if (prevSearchTerm !== query.searchTerm) {
    setPrevSearchTerm(query.searchTerm);
    setSearchTerm(query.searchTerm ?? "");
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    } else {
      params.delete("searchTerm");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center gap-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services by title or location..."
          className="h-11 rounded-2xl border-border bg-card/80 pl-10 pr-9 text-sm shadow-xs transition focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 gap-2 rounded-2xl px-5 font-medium shadow-xs"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
