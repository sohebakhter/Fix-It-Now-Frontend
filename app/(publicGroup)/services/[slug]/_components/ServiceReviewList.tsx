import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TServiceReview } from "@/lib/types";
import { Star, MessageSquare, UserCircle2 } from "lucide-react";

type ServiceReviewListProps = {
  reviews: TServiceReview[];
  averageRating?: number;
  totalReviews?: number;
};

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const sizeClass = size === "lg" ? "size-5" : "size-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.round(rating)
              ? "text-amber-500 fill-amber-500"
              : "text-muted-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function RatingBar({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-5 text-right font-medium text-muted-foreground shrink-0">
        {star}
      </span>
      <Star className="size-3 text-amber-500 fill-amber-500 shrink-0" />
      <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 text-left text-muted-foreground shrink-0">
        {count}
      </span>
    </div>
  );
}

export function ServiceReviewList({
  reviews,
  averageRating,
  totalReviews,
}: ServiceReviewListProps) {
  const avg =
    averageRating ??
    (reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0);

  const total = totalReviews ?? reviews.length;

  // Tally per star
  const tally = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">
              Customer Reviews
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
            <MessageSquare className="size-8 text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm font-medium text-foreground">
              No reviews yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Be the first to book and leave a review!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">
            Customer Reviews
          </h2>
          <span className="ml-auto text-xs text-muted-foreground font-mono">
            {total} review{total !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-5">
        {/* Rating summary row */}
        <div className="flex gap-5 items-start rounded-2xl bg-muted/30 p-4">
          {/* Big average */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-4xl font-extrabold text-foreground leading-none">
              {avg.toFixed(1)}
            </span>
            <StarRating rating={avg} size="lg" />
            <span className="text-[10px] text-muted-foreground mt-1">
              out of 5
            </span>
          </div>

          {/* Bar chart */}
          <div className="flex-1 space-y-1.5 min-w-0">
            {tally.map(({ star, count }) => (
              <RatingBar key={star} star={star} count={count} total={total} />
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border/50 bg-card/50 p-4 space-y-2"
            >
              {/* Header: avatar + name + date */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary text-xs font-bold shrink-0">
                    {review.customer?.name ? (
                      review.customer.name.charAt(0).toUpperCase()
                    ) : (
                      <UserCircle2 className="size-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {review.customer?.name ?? "Anonymous"}
                    </p>
                    {review.createdAt && (
                      <p className="text-[10px] text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Comment */}
              {review.comment && (
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
