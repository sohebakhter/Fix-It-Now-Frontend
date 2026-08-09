import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IService } from "@/lib/types";
import { MapPin, Star, Tag, Award, ArrowRight } from "lucide-react";

type ServiceCardProps = {
  service: IService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const ratingNum = service.technician?.rating ? parseFloat(service.technician.rating) : 0;
  const experience = service.technician?.experience ?? "N/A";
  const isActive = service.status === "ACTIVE";

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <div>
        <CardHeader className="p-5 pb-3 space-y-3">
          {/* Top badges: Status & Category */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {service.category?.name && (
                <Badge variant="secondary" className="gap-1 rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <Tag className="size-3" />
                  {service.category.name}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={`rounded-lg px-2.5 py-0.5 text-xs font-medium ${
                  isActive
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <span className={`mr-1.5 inline-block size-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {service.status}
              </Badge>
            </div>
          </div>

          {/* Service Title */}
          <CardTitle className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {service.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-4">
          {/* Description */}
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Details Row: Location & Tech Rating */}
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/30 p-3 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground truncate">
              <MapPin className="size-3.5 shrink-0 text-primary" />
              <span className="truncate">{service.location || "N/A"}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="size-3.5 shrink-0 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-foreground">
                {ratingNum > 0 ? ratingNum.toFixed(1) : "New"}
              </span>
              {ratingNum > 0 && <span className="text-[10px] text-muted-foreground">/ 5.0</span>}
            </div>

            <div className="col-span-2 flex items-center gap-1.5 text-[11px] text-muted-foreground border-t border-border/40 pt-2 mt-1">
              <Award className="size-3.5 shrink-0 text-primary" />
              <span>Technician Experience: <strong className="text-foreground font-medium">{experience} Yrs</strong></span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Price & CTA */}
      <CardFooter className="flex items-center justify-between p-5 border-t border-border/30 mt-2 pt-4">
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">Price</span>
          <span className="text-xl font-extrabold text-foreground">
            ${service.price ? service.price.toFixed(2) : "0.00"}
          </span>
        </div>

        <Link href={`/services/${service.id}`}>
          <Button size="sm" className="gap-1.5 rounded-xl font-medium shadow-xs transition-all group-hover:bg-primary group-hover:shadow-md">
            <span>Details</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
