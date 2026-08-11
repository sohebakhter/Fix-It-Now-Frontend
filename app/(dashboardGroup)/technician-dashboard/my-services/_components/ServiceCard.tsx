import { MapPin, Tag } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IService } from "@/lib/types";

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-border/50 bg-card hover:shadow-md transition-all duration-300 flex flex-col">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="rounded-lg text-xs font-semibold px-2 py-0.5 gap-1">
            <Tag className="size-3" />
            {service.category?.name || "Category"}
          </Badge>
          <Badge
            variant="outline"
            className={`rounded-lg text-xs px-2 py-0.5 font-medium ${
              service.status === "ACTIVE"
                ? "bg-green-500/10 text-green-600 border-green-500/20"
                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
            }`}
          >
            {service.status}
          </Badge>
        </div>
        <CardTitle className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {service.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground flex-1 line-clamp-3 leading-relaxed">
        {service.description || (
          <span className="italic text-muted-foreground/70">
            No description provided for this service.
          </span>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 border-t border-border/30 bg-muted/5 py-4 mt-4 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="size-3.5 text-muted-foreground/80 shrink-0" />
          <span className="truncate">{service.location}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end font-bold text-foreground">
          <span className="text-primary text-sm font-black">
            {service.price} BDT
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
