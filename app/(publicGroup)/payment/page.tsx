"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowLeft, Home, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createCheckoutSessionAction, revalidatePaymentAction } from "@/app/(dashboardGroup)/_actions/paymentActions";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const success = searchParams.get("success") === "true";

  const [countdown, setCountdown] = useState(5);
  const [retryLoading, setRetryLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Retrieve booking ID on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedId = localStorage.getItem("last_booking_id");
      if (savedId) {
        setTimeout(() => {
          setBookingId(savedId);
        }, 0);
      }
    }
  }, []);

  // Revalidate cache tags if payment was successful
  useEffect(() => {
    if (success) {
      revalidatePaymentAction();
    }
  }, [success]);

  // Automatic redirect if payment was successful
  useEffect(() => {
    if (success) {
      if (countdown <= 0) {
        router.push("/dashboard/my-bookings");
        return;
      }
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, countdown, router]);

  const handleRetry = async () => {
    if (!bookingId) {
      toast.error("Booking reference not found. Please go back and try again.");
      return;
    }

    setRetryLoading(true);
    try {
      const res = await createCheckoutSessionAction(bookingId);
      if (res.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error(res.message || "Failed to restart payment process.");
        setRetryLoading(false);
      }
    } catch {
      toast.error("An error occurred. Please try again.");
      setRetryLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/80 bg-card/60 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary to-indigo-500" />
        
        <CardHeader className="text-center pt-8 pb-4 space-y-4">
          <div className="flex justify-center">
            {success ? (
              <div className="relative flex items-center justify-center size-20 rounded-full bg-emerald-500/10 text-emerald-500 animate-pulse">
                <CheckCircle2 className="size-12 stroke-[2.5]" />
                <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping opacity-75" />
              </div>
            ) : (
              <div className="relative flex items-center justify-center size-20 rounded-full bg-rose-500/10 text-rose-500 animate-pulse">
                <XCircle className="size-12 stroke-[2.5]" />
                <span className="absolute inset-0 rounded-full border-4 border-rose-500/30 animate-pulse" />
              </div>
            )}
          </div>
          
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-black tracking-tight">
              {success ? "Payment Successful!" : "Payment Canceled"}
            </CardTitle>
            <CardDescription className="text-xs max-w-xs mx-auto">
              {success
                ? "Your booking has been secured and confirmed."
                : "The Stripe checkout process was canceled by the user."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 space-y-6">
          {success ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Redirecting to your bookings page in
                </p>
                <div className="flex justify-center items-center gap-1.5">
                  <span className="text-3xl font-black text-primary">{countdown}</span>
                  <span className="text-xs font-semibold text-muted-foreground">seconds</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>
              </div>
              
              <Button
                onClick={() => router.push("/dashboard/my-bookings")}
                className="w-full rounded-2xl text-xs font-semibold h-11 bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg"
              >
                Go to My Bookings Now
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-center text-xs text-rose-600 dark:text-rose-400">
                You can try starting the payment process again or return to your dashboard.
              </div>

              {bookingId && (
                <Button
                  onClick={handleRetry}
                  disabled={retryLoading}
                  className="w-full rounded-2xl text-xs font-semibold h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg gap-2"
                >
                  {retryLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Retrying Payment...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="size-4" />
                      <span>Try Again</span>
                    </>
                  )}
                </Button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/my-bookings")}
                  className="rounded-2xl text-xs font-semibold h-11 border-border/60 hover:bg-muted/50 gap-1.5"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>My Bookings</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="rounded-2xl text-xs font-semibold h-11 border-border/60 hover:bg-muted/50 gap-1.5"
                >
                  <Home className="size-3.5" />
                  <span>Home Page</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/80 bg-card/60 backdrop-blur-md shadow-2xl rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4">
          <Loader2 className="size-10 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">Loading payment status...</p>
        </Card>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
