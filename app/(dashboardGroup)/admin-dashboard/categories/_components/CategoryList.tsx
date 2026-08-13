"use client";

import React, { useState, useMemo } from "react";
import { Search, Layers, Calendar, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "./CategoryCard";
import type { TCategory } from "@/lib/types";

interface CategoryListProps {
  initialCategories: TCategory[];
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Statistics
  const stats = useMemo(() => {
    const total = initialCategories.length;
    
    // Find latest category
    let latestName = "None";
    if (total > 0) {
      const sorted = [...initialCategories].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      latestName = sorted[0].name;
    }

    return { total, latestName };
  }, [initialCategories]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return initialCategories.filter((category) =>
      category.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialCategories, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-4 shadow-2xs hover:shadow-xs transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Total Categories</span>
            <Layers className="size-5 rounded-lg p-1 text-indigo-500 bg-indigo-500/10" />
          </div>
          <span className="text-2xl font-black mt-2 text-foreground">{stats.total}</span>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-4 shadow-2xs hover:shadow-xs transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Latest Added</span>
            <Calendar className="size-5 rounded-lg p-1 text-emerald-500 bg-emerald-500/10" />
          </div>
          <span className="text-lg font-black mt-2 text-foreground truncate" title={stats.latestName}>
            {stats.latestName}
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-4 shadow-2xs hover:shadow-xs transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
            <Sparkles className="size-5 rounded-lg p-1 text-amber-500 bg-amber-500/10" />
          </div>
          <span className="text-lg font-black mt-2 text-foreground">Operational</span>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 border border-border/40 p-4 rounded-3xl backdrop-blur-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search by category name..."
            className="pl-10 h-10 rounded-xl bg-card border-border/60 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-3xl bg-muted/5">
          <Layers className="size-10 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-bold text-foreground">No Categories Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            We could not find any categories matching your current search query.
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
