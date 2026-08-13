import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  CreditCard,
  Calendar,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { SinglePaymentDetailsButton } from "./SinglePaymentDetailsButton";
import { TPaymentItem } from "@/lib/types";

type PaymentHistoryCardProps = {
  payment: TPaymentItem;
};

function getStatusBadge(status: TPaymentItem["status"]) {
  switch (status) {
    case "PAID":
      return (
        <Badge
          variant="outline"
          className="border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg px-2.5 py-0.5"
        >
          <CheckCircle2 className="size-3 mr-1" />
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg px-2.5 py-0.5"
        >
          <Clock className="size-3 mr-1" />
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="outline"
          className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg px-2.5 py-0.5"
        >
          <XCircle className="size-3 mr-1" />
          Failed
        </Badge>
      );
    case "REFUNDED":
      return (
        <Badge
          variant="outline"
          className="border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg px-2.5 py-0.5"
        >
          <AlertCircle className="size-3 mr-1" />
          Refunded
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function PaymentHistoryCard({ payment }: PaymentHistoryCardProps) {
  const serviceTitle = payment.booking?.service?.title ?? "Service";
  const categoryName = payment.booking?.service?.category?.name;

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:shadow-md">
      <div>
        <CardHeader className="p-5 pb-3 space-y-2.5">
          {/* Top row: category badge + status badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {categoryName ? (
              <Badge
                variant="secondary"
                className="gap-1 rounded-lg px-2.5 py-0.5 text-[11px] font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {categoryName}
              </Badge>
            ) : (
              <span />
            )}
            {getStatusBadge(payment.status)}
          </div>

          {/* Service title */}
          <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-1">
            {serviceTitle}
          </h3>
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-3 text-xs">
          {/* Info grid */}
          <div className="space-y-2 rounded-2xl bg-muted/30 p-3">
            {/* Transaction ID */}
            {payment.transactionId && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash className="size-3.5 text-primary shrink-0" />
                <span className="truncate font-mono">{payment.transactionId}</span>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-3.5 text-primary shrink-0" />
              <span>{formatDate(payment.createdAt)}</span>
            </div>

            {/* Payment method */}
            {payment.paymentMethod && (
              <div className="flex items-center gap-2 text-muted-foreground capitalize">
                <CreditCard className="size-3.5 text-primary shrink-0" />
                <span>{payment.paymentMethod}</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>

      {/* Footer: amount + details button */}
      <CardFooter className="flex items-center justify-between p-5 border-t border-border/30 pt-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Amount
          </span>
          <span className="text-lg font-extrabold text-foreground">
            {payment.currency?.toUpperCase() ?? "USD"}{" "}
            {payment.amount != null ? payment.amount.toFixed(2) : "0.00"}
          </span>
        </div>

        <SinglePaymentDetailsButton paymentId={payment.id} />
      </CardFooter>
    </Card>
  );
}
