import { CreditCard } from "lucide-react";
import { PaymentHistoryCard } from "./PaymentHistoryCard";
import { TPaymentItem } from "@/lib/types";

type PaymentHistoryListProps = {
  payments: TPaymentItem[];
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center shadow-xs my-6">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
        <CreditCard className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        No payments found
      </h3>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        You haven&apos;t made any payments yet. Complete a booking and pay to
        see your transaction history here.
      </p>
    </div>
  );
}

export function PaymentHistoryList({ payments }: PaymentHistoryListProps) {
  if (!payments || payments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {payments.map((payment) => (
        <PaymentHistoryCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
