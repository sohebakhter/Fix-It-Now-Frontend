import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, User, BadgeCheck } from "lucide-react";
import { TTechnicianPublicProfile } from "@/lib/types";



type TechnicianDetailsProps = {
  technician: TTechnicianPublicProfile;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${
            star <= Math.round(rating)
              ? "text-amber-500 fill-amber-500"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export function TechnicianDetails({ technician }: TechnicianDetailsProps) {
  const ratingNum = technician.rating ? parseFloat(technician.rating) : 0;
  const experience = technician.experience ?? "N/A";
  const techName = technician.user?.name ?? "Technician";
  const isActive = technician.user?.status === "UN_BAN";

  return (
    <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center gap-2">
          <User className="size-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">
            Assigned Technician
          </h2>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-lg shrink-0">
            {techName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-base font-bold text-foreground truncate">
                {techName}
              </span>
              {isActive && (
                <BadgeCheck className="size-4 text-teal-500 shrink-0" />
              )}
            </div>
            {technician.user?.email && (
              <span className="text-xs text-muted-foreground truncate block">
                {technician.user.email}
              </span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <Badge
          variant="outline"
          className={`rounded-lg px-2.5 py-0.5 text-xs w-fit ${
            isActive
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}
        >
          <span
            className={`mr-1.5 inline-block size-1.5 rounded-full ${
              isActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          {isActive ? "Available" : "Unavailable"}
        </Badge>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Rating */}
          <div className="rounded-2xl bg-muted/30 p-3 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Rating
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold text-foreground">
                {ratingNum > 0 ? ratingNum.toFixed(1) : "New"}
              </span>
              {ratingNum > 0 && (
                <span className="text-[10px] text-muted-foreground">/ 5.0</span>
              )}
            </div>
            <StarRating rating={ratingNum} />
          </div>

          {/* Experience */}
          <div className="rounded-2xl bg-muted/30 p-3 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Experience
            </span>
            <div className="flex items-center gap-1.5">
              <Award className="size-4 text-primary shrink-0" />
              <span className="text-lg font-extrabold text-foreground">
                {experience}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Years in the field
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
