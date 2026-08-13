"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type SinglePaymentDetailsButtonProps = {
  paymentId: string;
};

export function SinglePaymentDetailsButton({
  paymentId,
}: SinglePaymentDetailsButtonProps) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push(`/dashboard/payments/${paymentId}`)}
      className="rounded-xl text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
    >
      <ExternalLink className="size-3.5" />
      <span>Details</span>
    </Button>
  );
}
