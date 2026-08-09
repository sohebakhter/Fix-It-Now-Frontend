"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IServiceQuery } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SlidersHorizontal,
  RotateCcw,
  Star,
  DollarSign,
  MapPin,
  ArrowUpDown,
  Filter,
  Check,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ServiceFilterSidebarProps = {
  query?: IServiceQuery;
};

export function ServiceFilterSidebar({ query = {} }: ServiceFilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [location, setLocation] = useState(query.location ?? "");
  const [price, setPrice] = useState(query.price ?? "");
  const [rating, setRating] = useState(query.rating ?? "");
  const [sortBy, setSortBy] = useState(query.sortBy ?? "createdAt");
  const [sortOrder, setSortOrder] = useState(query.sortOrder ?? "desc");

  // Keep internal state in sync with URL search params
  // React-recommended pattern: store previous props in state to detect changes during render
  const [prevQuery, setPrevQuery] = useState(query);
  if (
    prevQuery.location !== query.location ||
    prevQuery.price !== query.price ||
    prevQuery.rating !== query.rating ||
    prevQuery.sortBy !== query.sortBy ||
    prevQuery.sortOrder !== query.sortOrder
  ) {
    setPrevQuery(query);
    setLocation(query.location ?? "");
    setPrice(query.price ?? "");
    setRating(query.rating ?? "");
    setSortBy(query.sortBy ?? "createdAt");
    setSortOrder(query.sortOrder ?? "desc");
  }

  const hasActiveFilters = Boolean(
    location || price || rating || query.sortBy || query.sortOrder
  );

  const applyFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination to page 1 on filter change
    params.set("page", "1");

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setLocation("");
    setPrice("");
    setRating("");
    setSortBy("createdAt");
    setSortOrder("desc");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("location");
    params.delete("price");
    params.delete("rating");
    params.delete("sortBy");
    params.delete("sortOrder");
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Sidebar Title & Reset Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h2 className="font-semibold text-foreground text-lg">Filters & Sort</h2>
        </div>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        )}
      </div>

      {/* Sorting */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <ArrowUpDown className="size-3.5 text-primary" />
          Sort By
        </Label>
        <div className="grid gap-2">
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split(":");
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
              applyFilters({ sortBy: newSortBy, sortOrder: newSortOrder });
            }}
            className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <Label htmlFor="sidebar-location" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          Location
        </Label>
        <div className="relative">
          <Input
            id="sidebar-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilters({ location });
              }
            }}
            placeholder="e.g. Dhaka, Gulshan..."
            className="h-10 rounded-xl pr-16 text-sm"
          />
          <Button
            type="button"
            size="xs"
            variant="secondary"
            onClick={() => applyFilters({ location })}
            className="absolute right-1.5 top-1.5 h-7 text-xs"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <Label htmlFor="sidebar-price" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <DollarSign className="size-3.5 text-primary" />
          Max Price ($)
        </Label>
        <div className="relative">
          <Input
            id="sidebar-price"
            type="number"
            min="0"
            step="50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilters({ price });
              }
            }}
            placeholder="e.g. 500"
            className="h-10 rounded-xl pr-16 text-sm"
          />
          <Button
            type="button"
            size="xs"
            variant="secondary"
            onClick={() => applyFilters({ price })}
            className="absolute right-1.5 top-1.5 h-7 text-xs"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Star className="size-3.5 text-amber-500 fill-amber-500" />
          Technician Rating
        </Label>
        <div className="flex flex-col gap-1.5">
          {[
            { value: "", label: "All Ratings" },
            { value: "4", label: "4.0★ & above" },
            { value: "3", label: "3.0★ & above" },
            { value: "2", label: "2.0★ & above" },
          ].map((item) => {
            const isSelected = rating === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setRating(item.value);
                  applyFilters({ rating: item.value });
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                  isSelected
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.value ? (
                    <Star className="size-3.5 text-amber-500 fill-amber-500" />
                  ) : null}
                  {item.label}
                </span>
                {isSelected && <Check className="size-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 rounded-3xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm">
          {renderFilterContent()}
        </div>
      </aside>

      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between gap-2 rounded-2xl border-border py-5 shadow-xs">
              <span className="flex items-center gap-2">
                <Filter className="size-4 text-primary" />
                <span>Filter & Sort Services</span>
              </span>
              {hasActiveFilters && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-xs p-6 overflow-y-auto">
            <SheetHeader className="p-0 mb-6">
              <SheetTitle className="text-left font-semibold text-lg">Filter Services</SheetTitle>
            </SheetHeader>
            {renderFilterContent()}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
