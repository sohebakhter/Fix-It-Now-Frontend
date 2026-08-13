import React from "react";

// Allow this route to perform blocking server rendering when runtime data is used
export const instant = false;
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPaymentDetails } from "@/app/(dashboardGroup)/_actions/paymentActions";
import { PaymentDetailsView } from "../_components/PaymentDetailsView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";

type SinglePaymentDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SinglePaymentDetailsPage({
  params,
}: SinglePaymentDetailsPageProps) {
  const { slug } = await params;

  const result = await getPaymentDetails(slug);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const payment = result.data;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border/40 pb-5">
        {/* Back link */}
        <Link href="/dashboard/payments" className="inline-block mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs rounded-xl text-muted-foreground hover:text-foreground px-0"
          >
            <ArrowLeft className="size-3.5" />
            Back to Payment History
          </Button>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Payment Details
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              #{slug}
            </p>
          </div>
        </div>
      </div>

      {/* Details view */}
      <PaymentDetailsView payment={payment} />
    </div>
  );
}