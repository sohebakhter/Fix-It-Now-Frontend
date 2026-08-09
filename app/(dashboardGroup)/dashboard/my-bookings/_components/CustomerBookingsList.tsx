"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  XCircle,
  MessageSquarePlus,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Tag,
  CalendarX,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import {
  cancelBookingAction,
  createReviewAction,
} from "@/app/(publicGroup)/_actions/bookingActions";
import { createCheckoutSessionAction } from "@/app/(dashboardGroup)/_actions/paymentActions";

export type TBookingItem = {
  id: string;
  customerId: string;
  serviceId: string;
  availabilityId: string;
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "DECLINED"
    | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  service?: {
    id: string;
    title: string;
    description?: string;
    location?: string;
    price?: number;
    status?: string;
    category?: {
      name: string;
    };
  };
  availability?: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
    createdAt?: string;
  };
};

type CustomerBookingsListProps = {
  initialBookings: TBookingItem[];
};

export function CustomerBookingsList({ initialBookings }: CustomerBookingsListProps) {
  const router = useRouter();

  // Cancel Modal State
  const [cancelModalBooking, setCancelModalBooking] = useState<TBookingItem | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Review Modal State
  const [reviewModalBooking, setReviewModalBooking] = useState<TBookingItem | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Payment State
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);

  const formatDate = (dateStr?: string) => {
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
  };

  const getStatusBadge = (status: TBookingItem["status"]) => {
    switch (status) {
      case "REQUESTED":
        return (
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-blue-500" />
            Requested
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500" />
            Accepted
          </Badge>
        );
      case "PAID":
        return (
          <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-indigo-500" />
            Paid
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-amber-500 animate-pulse" />
            In Progress
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="outline" className="border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-teal-500" />
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="outline" className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-rose-500" />
            Cancelled
          </Badge>
        );
      case "DECLINED":
        return (
          <Badge variant="outline" className="border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400 rounded-lg px-2.5 py-0.5">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-slate-500" />
            Declined
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isCancellable = (status: TBookingItem["status"]) => {
    return status === "REQUESTED" || status === "ACCEPTED" || status === "PAID";
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalBooking) return;
    setCancelling(true);

    const res = await cancelBookingAction(cancelModalBooking.id);

    setCancelling(false);

    if (res.success) {
      toast.success(res.message || "Booking cancelled successfully!");
      setCancelModalBooking(null);
      router.refresh();
    } else {
      toast.error(res.message || "Failed to cancel booking");
    }
  };

  const handleOpenReviewModal = (booking: TBookingItem) => {
    setReviewModalBooking(booking);
    setRating(5);
    setComment("");
  };

  const handleSubmitReview = async () => {
    if (!reviewModalBooking) return;
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5 stars.");
      return;
    }

    setSubmittingReview(true);

    const res = await createReviewAction({
      bookingId: reviewModalBooking.id,
      rating,
      comment: comment.trim(),
    });

    setSubmittingReview(false);

    if (res.success) {
      toast.success(
        "Review submitted successfully! Thank you for your feedback."
      );
      setReviewModalBooking(null);
      router.refresh();
    } else {
      toast.error(res.message || "Failed to submit review");
    }
  };

  if (!initialBookings || initialBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center shadow-xs my-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
          <CalendarX className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No bookings found</h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          You haven&apos;t booked any services yet. Explore available services and make your first booking!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialBookings.map((booking) => {
          const cancellable = isCancellable(booking.status);
          const isCompleted = booking.status === "COMPLETED";

          return (
            <Card
              key={booking.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:shadow-md"
            >
              <div>
                <CardHeader className="p-5 pb-3 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {booking.service?.category?.name ? (
                      <Badge variant="secondary" className="gap-1 rounded-lg px-2.5 py-0.5 text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                        <Tag className="size-3" />
                        {booking.service.category.name}
                      </Badge>
                    ) : (
                      <span />
                    )}
                    {getStatusBadge(booking.status)}
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-1">
                    {booking.service?.title || "Service"}
                  </h3>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3.5 text-xs">
                  {/* Details Card */}
                  <div className="space-y-2 rounded-2xl bg-muted/30 p-3">
                    {booking.availability && (
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Calendar className="size-3.5 text-primary shrink-0" />
                        <span>{formatDate(booking.availability.date)}</span>
                      </div>
                    )}
                    {booking.availability && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-3.5 text-primary shrink-0" />
                        <span>
                          {booking.availability.startTime} - {booking.availability.endTime}
                        </span>
                      </div>
                    )}
                    {booking.service?.location && (
                      <div className="flex items-center gap-2 text-muted-foreground truncate">
                        <MapPin className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{booking.service.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Existing Review preview if already submitted */}
                  {booking.review && (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                          Your Review
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-3 ${
                                star <= booking.review!.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {booking.review.comment && (
                        <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                          &quot;{booking.review.comment}&quot;
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </div>

              {/* Card Footer Actions */}
              <CardFooter className="flex items-center justify-between p-5 border-t border-border/30 pt-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Price
                  </span>
                  <span className="text-lg font-extrabold text-foreground">
                    ${booking.service?.price ? booking.service.price.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Pay Now Button (only when ACCEPTED) */}
                  {booking.status === "ACCEPTED" && (
                    <Button
                      size="sm"
                      disabled={payingBookingId === booking.id}
                      onClick={async () => {
                        setPayingBookingId(booking.id);
                        try {
                          localStorage.setItem("last_booking_id", booking.id);
                          const res = await createCheckoutSessionAction(
                            booking.id
                          );
                          if (res.success && res.data?.paymentUrl) {
                            window.location.href = res.data.paymentUrl;
                          } else {
                            toast.error(
                              res.message || "Failed to initiate payment"
                            );
                            setPayingBookingId(null);
                          }
                        } catch {
                          toast.error(
                            "Something went wrong. Please try again."
                          );
                          setPayingBookingId(null);
                        }
                      }}
                      className="rounded-xl text-xs gap-1 bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                    >
                      {payingBookingId === booking.id ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="size-3.5" />
                          <span>Pay Now</span>
                        </>
                      )}
                    </Button>
                  )}

                  {/* Cancel Button (allowed before IN_PROGRESS) */}
                  {cancellable && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCancelModalBooking(booking)}
                      className="rounded-xl text-xs gap-1 border-rose-500/30 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-400"
                    >
                      <XCircle className="size-3.5" />
                      <span>Cancel</span>
                    </Button>
                  )}

                  {/* Leave Review Button (allowed when COMPLETED & no review yet) */}
                  {isCompleted && !booking.review && (
                    <Button
                      size="sm"
                      onClick={() => handleOpenReviewModal(booking)}
                      className="rounded-xl text-xs gap-1 bg-amber-500 text-white hover:bg-amber-600 shadow-xs"
                    >
                      <Star className="size-3.5 fill-white" />
                      <span>Review</span>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Confirmation Modal for Booking Cancellation */}
      <Dialog open={!!cancelModalBooking} onOpenChange={(open) => !open && setCancelModalBooking(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="size-5" />
              Cancel Booking
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to cancel your booking for{" "}
              <strong className="text-foreground">{cancelModalBooking?.service?.title}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 space-y-1">
            <span className="font-semibold block">Important Notice</span>
            <span>Once cancelled, this slot will be released back for other customers.</span>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/40">
            <Button
              variant="outline"
              onClick={() => setCancelModalBooking(null)}
              className="rounded-xl text-xs"
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={cancelling}
              className="rounded-xl text-xs gap-1.5"
            >
              {cancelling ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Cancelling...</span>
                </>
              ) : (
                <>
                  <XCircle className="size-3.5" />
                  <span>Confirm Cancel</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Submission Modal */}
      <Dialog open={!!reviewModalBooking} onOpenChange={(open) => !open && setReviewModalBooking(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <MessageSquarePlus className="size-5 text-amber-500" />
              Leave a Review
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Rate and review your experience with{" "}
              <strong className="text-foreground">{reviewModalBooking?.service?.title}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            {/* Star Rating Selection */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-semibold text-foreground block">
                Your Rating
              </label>
              <div className="flex items-center justify-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-hidden"
                    >
                      <Star
                        className={`size-7 transition-colors ${
                          active
                            ? "text-amber-500 fill-amber-500 drop-shadow-xs"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {rating === 5
                  ? "5 Stars - Excellent!"
                  : rating === 4
                  ? "4 Stars - Good"
                  : rating === 3
                  ? "3 Stars - Average"
                  : rating === 2
                  ? "2 Stars - Poor"
                  : "1 Star - Terrible"}
              </span>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Comment / Feedback
              </label>
              <Textarea
                placeholder="Share details of your experience with this service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="rounded-2xl text-xs resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/40">
            <Button
              variant="outline"
              onClick={() => setReviewModalBooking(null)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={submittingReview}
              className="rounded-xl text-xs gap-1.5 bg-amber-500 text-white hover:bg-amber-600"
            >
              {submittingReview ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="size-3.5" />
                  <span>Submit Review</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
