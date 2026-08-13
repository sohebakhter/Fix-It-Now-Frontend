import React from "react";
import { Calendar, Clock, User, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TTechnicianBooking } from "@/lib/types";

interface BookingCardProps {
  booking: TTechnicianBooking;
}

export function BookingCard({ booking }: BookingCardProps) {
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

  const formattedCreatedAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

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
            className={`rounded-lg text-xs px-2.5 py-0.5 font-bold uppercase tracking-wide ${getStatusBadgeStyle(booking.status)}`}
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
                {formatTime(booking.availability?.startTime)} –{" "}
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
            className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${getPaymentBadgeStyle(booking.payment?.status || "PENDING")}`}
          >
            Payment: {booking.payment?.status || "PENDING"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/5 border-t border-border/30 px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono text-[10px] truncate">
          ID: {booking.id.slice(0, 8)}...
        </span>
        <span>Booked: {formattedCreatedAt}</span>
      </CardFooter>
    </Card>
  );
}

export default BookingCard;
