"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  Play,
  CheckCircle2,
  Lock,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updateBookingStatusAction } from "@/app/(dashboardGroup)/_actions/bookingActions";
import type { TTechnicianBooking } from "@/lib/types";

interface BookingCardProps {
  booking: TTechnicianBooking;
  onStatusChange: (updatedBooking: TTechnicianBooking) => void;
}

export function BookingCard({ booking, onStatusChange }: BookingCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  // Date/Time Formatting Helpers
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr.split("T")[0] + "T00:00:00");
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "short",
    }).format(date);
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "N/A";
    const [hoursStr, minutesStr] = timeStr.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutesStr} ${ampm}`;
  };

  const handleUpdateStatus = (
    newStatus: "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "DECLINED",
  ) => {
    setPendingAction(newStatus);
    startTransition(async () => {
      try {
        const response = await updateBookingStatusAction({
          bookingId: booking.id,
          status: newStatus,
        });

        if (response.success) {
          toast.success(
            response.message || `Booking status updated to ${newStatus}`,
          );

          const updatedBooking: TTechnicianBooking = {
            ...booking,
            status: newStatus,
          };
          onStatusChange(updatedBooking);
          router.refresh();
        } else {
          toast.error(response.message || "Failed to update status");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      } finally {
        setPendingAction(null);
      }
    });
  };

  // Render correct action button based on workflow logic
  const renderWorkflowAction = () => {
    if (booking.status === "REQUESTED") {
      const isDeclining = isPending && pendingAction === "DECLINED";
      const isAccepting = isPending && pendingAction === "ACCEPTED";
      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleUpdateStatus("DECLINED")}
            disabled={isPending}
            variant="outline"
            className="rounded-xl font-semibold gap-1.5 shadow-sm min-w-24 border-rose-500/30 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
            size="sm"
          >
            {isDeclining ? <Spinner className="size-4" /> : <XCircle className="size-4" />}
            Decline
          </Button>

          <Button
            onClick={() => handleUpdateStatus("ACCEPTED")}
            disabled={isPending}
            className="rounded-xl font-semibold gap-1.5 shadow-sm min-w-32"
            size="sm"
          >
            {isAccepting ? <Spinner className="size-4" /> : <CheckCircle className="size-4" />}
            Accept
          </Button>
        </div>
      );
    }

    if (booking.status === "PAID") {
      return (
        <Button
          onClick={() => handleUpdateStatus("IN_PROGRESS")}
          disabled={isPending}
          className="rounded-xl font-semibold gap-1.5 shadow-sm min-w-32 bg-indigo-600 hover:bg-indigo-700 text-white"
          size="sm"
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
          Start Job
        </Button>
      );
    }

    if (booking.status === "IN_PROGRESS") {
      return (
        <Button
          onClick={() => handleUpdateStatus("COMPLETED")}
          disabled={isPending}
          className="rounded-xl font-semibold gap-1.5 shadow-sm min-w-32 bg-emerald-600 hover:bg-emerald-700 text-white"
          size="sm"
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            <CheckCircle2 className="size-4" />
          )}
          Complete Job
        </Button>
      );
    }

    if (booking.status === "ACCEPTED") {
      return (
        <span className="text-xs text-muted-foreground italic flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
          <Lock className="size-3.5 text-muted-foreground" />
          Awaiting Customer Payment
        </span>
      );
    }

    return null;
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "ACCEPTED":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      case "PAID":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "IN_PROGRESS":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "CANCELLED":
      case "DECLINED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPaymentBadgeStyle = (status?: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "FAILED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border border-border/50 bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <CardHeader className="space-y-2 pb-4 border-b border-border/30 bg-muted/5">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="rounded-lg text-xs font-semibold px-2 py-0.5"
          >
            {booking.service?.category?.name || "Service Category"}
          </Badge>
          <Badge
            variant="outline"
            className={`rounded-lg text-xs px-2.5 py-0.5 font-bold uppercase tracking-wide ${getStatusBadgeStyle(
              booking.status,
            )}`}
          >
            {booking.status}
          </Badge>
        </div>
        <CardTitle className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {booking.service?.title || "Unnamed Service"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 space-y-4 flex-1">
        {/* Customer Details */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Customer Information
          </span>
          <div className="flex items-start gap-2.5">
            <User className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-tight truncate">
                {booking.customer?.name || "Anonymous Client"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {booking.customer?.email || "No email available"}
              </p>
            </div>
          </div>
        </div>

        {/* Timeslot Details */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Scheduled Timeslot
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3.5 shrink-0 text-muted-foreground/80" />
              <span className="font-semibold truncate">
                {formatDate(booking.availability?.date)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
              <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
              <span className="font-bold text-foreground truncate">
                {formatTime(booking.availability?.startTime)} -{" "}
                {formatTime(booking.availability?.endTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-1.5 border-t border-border/30 pt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CreditCard className="size-3.5 shrink-0 text-muted-foreground/80" />
            <span className="font-bold text-foreground">
              {booking.payment?.amount || booking.service?.price || 0} BDT
            </span>
          </div>

          <Badge
            variant="outline"
            className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${getPaymentBadgeStyle(
              booking.payment?.status || "PENDING",
            )}`}
          >
            Payment: {booking.payment?.status || "PENDING"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/5 border-t border-border/30 px-5 py-3.5 flex justify-end items-center h-14">
        {renderWorkflowAction()}
      </CardFooter>
    </Card>
  );
}
