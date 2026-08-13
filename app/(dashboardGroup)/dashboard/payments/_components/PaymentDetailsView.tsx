import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TPaymentItem } from "@/lib/types";
import {
  CreditCard,
  Calendar,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Receipt,
  User,
  Tag,
  CalendarCheck2,
} from "lucide-react";

type PaymentDetailsViewProps = {
  payment: TPaymentItem & {
    customer?: {
      id?: string;
      name?: string;
      email?: string;
    };
  };
};

function StatusIcon({ status }: { status: TPaymentItem["status"] }) {
  switch (status) {
    case "PAID":
      return (
        <div className="flex size-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-2">
          <CheckCircle2 className="size-8" />
        </div>
      );
    case "PENDING":
      return (
        <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2">
          <Clock className="size-8" />
        </div>
      );
    case "FAILED":
      return (
        <div className="flex size-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-2">
          <XCircle className="size-8" />
        </div>
      );
    case "REFUNDED":
      return (
        <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2">
          <AlertCircle className="size-8" />
        </div>
      );
    default:
      return null;
  }
}

function getStatusBadge(status: TPaymentItem["status"]) {
  switch (status) {
    case "PAID":
      return (
        <Badge
          variant="outline"
          className="border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg px-3 py-1 text-sm"
        >
          <CheckCircle2 className="size-3.5 mr-1.5" />
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg px-3 py-1 text-sm"
        >
          <Clock className="size-3.5 mr-1.5" />
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="outline"
          className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg px-3 py-1 text-sm"
        >
          <XCircle className="size-3.5 mr-1.5" />
          Failed
        </Badge>
      );
    case "REFUNDED":
      return (
        <Badge
          variant="outline"
          className="border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg px-3 py-1 text-sm"
        >
          <AlertCircle className="size-3.5 mr-1.5" />
          Refunded
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function formatDateTime(dateStr?: string) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function DetailRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/30 last:border-0">
      <div className="flex size-8 items-center justify-center rounded-xl bg-muted/50 text-primary shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
          {label}
        </span>
        <span
          className={`text-sm font-medium text-foreground break-all ${mono ? "font-mono text-xs" : ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export function PaymentDetailsView({ payment }: PaymentDetailsViewProps) {
  const serviceTitle = payment.booking?.service?.title ?? "Service";
  const categoryName = payment.booking?.service?.category?.name;

  return (
    <div className="space-y-6">
      {/* Status Hero Card */}
      <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-8 flex flex-col items-center text-center gap-3">
          <StatusIcon status={payment.status} />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
            {getStatusBadge(payment.status)}
          </div>
          <div>
            <span className="text-4xl font-extrabold tracking-tight text-foreground">
              {payment.currency?.toUpperCase() ?? "USD"}{" "}
              {payment.amount != null ? payment.amount.toFixed(2) : "0.00"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {serviceTitle}
            {categoryName ? ` · ${categoryName}` : ""}
          </p>
        </CardContent>
      </Card>

      {/* Transaction Details Card */}
      <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center gap-2">
            <Receipt className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">
              Transaction Details
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {payment.transactionId && (
            <DetailRow
              icon={<Hash className="size-4" />}
              label="Transaction ID"
              value={payment.transactionId}
              mono
            />
          )}
          <DetailRow
            icon={<Hash className="size-4" />}
            label="Payment ID"
            value={payment.id}
            mono
          />
          <DetailRow
            icon={<Hash className="size-4" />}
            label="Booking ID"
            value={payment.bookingId}
            mono
          />
          {payment.paymentMethod && (
            <DetailRow
              icon={<CreditCard className="size-4" />}
              label="Payment Method"
              value={
                <span className="capitalize">{payment.paymentMethod}</span>
              }
            />
          )}
          <DetailRow
            icon={<Calendar className="size-4" />}
            label="Created At"
            value={formatDateTime(payment.createdAt)}
          />
          <DetailRow
            icon={<CalendarCheck2 className="size-4" />}
            label="Last Updated"
            value={formatDateTime(payment.updatedAt)}
          />
        </CardContent>
      </Card>

      {/* Service Details Card */}
      {payment.booking?.service && (
        <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                Service Details
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <DetailRow
              icon={<Tag className="size-4" />}
              label="Service"
              value={serviceTitle}
            />
            {categoryName && (
              <DetailRow
                icon={<Tag className="size-4" />}
                label="Category"
                value={categoryName}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Customer Details Card (if present) */}
      {payment.customer && (
        <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                Customer Details
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            {payment.customer.name && (
              <DetailRow
                icon={<User className="size-4" />}
                label="Name"
                value={payment.customer.name}
              />
            )}
            {payment.customer.email && (
              <DetailRow
                icon={<User className="size-4" />}
                label="Email"
                value={payment.customer.email}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
