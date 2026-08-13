import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import EditCategoryButton from "./EditCategoryButton";
import DeleteCategoryButton from "./DeleteCategoryButton";
import type { TCategory } from "@/lib/types";

interface CategoryCardProps {
  category: TCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const initials = category.name
    ? category.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "C";

  const formattedDate = category.createdAt
    ? new Date(category.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="group overflow-hidden rounded-3xl border border-border/50 bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border border-border/30 shadow-xs bg-linear-to-br from-primary/10 to-primary/5 text-primary font-bold rounded-2xl">
            <AvatarFallback className="bg-primary/5 text-primary rounded-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="text-lg font-extrabold text-foreground truncate max-w-37.5 sm:max-w-50" title={category.name}>
              {category.name}
            </CardTitle>
            <p className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">ID: {category.id.slice(0, 8)}...</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 text-sm text-muted-foreground pb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4 shrink-0 text-muted-foreground/60" />
          <span>Created {formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-end gap-2 border-t border-border/30 bg-muted/5 py-4 px-6 text-xs">
        <EditCategoryButton categoryId={category.id} currentName={category.name} />
        <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
      </CardFooter>
    </Card>
  );
}

export default CategoryCard;
