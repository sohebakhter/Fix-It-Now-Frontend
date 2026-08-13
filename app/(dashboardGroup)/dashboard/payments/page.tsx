import React, { Suspense } from "react";
import { getPaymentHistory } from "@/app/(dashboardGroup)/_actions/paymentActions";
import { PaymentHistoryList } from "./_components/PaymentHistoryList";
import { PaymentHistorySkeleton } from "./_components/PaymentHistorySkeleton";
import { CreditCard } from "lucide-react";

export const instant = false;

export default async function PaymentHistoryPage() {
  const result = await getPaymentHistory();
  const payments = Array.isArray(result?.data) ? result.data : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border/40 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Payment History
            </h1>
            <p className="text-xs text-muted-foreground">
              View all your past transactions and payment details for your
              booked services.
            </p>
          </div>
        </div>
      </div>

      {/* Payment list with Suspense boundary */}
      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentHistoryList payments={payments} />
      </Suspense>
    </div>
  );
}