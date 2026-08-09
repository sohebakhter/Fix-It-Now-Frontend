import React, { Suspense } from "react";
import { getMyBookings } from "@/app/(publicGroup)/_actions/bookingActions";
import { CustomerBookingsList } from "./_components/CustomerBookingsList";
import { CalendarCheck2 } from "lucide-react";
import { BookingsListSkeleton } from "./_components/BookingsListSkeleton";

export const instant = false;

export default async function MyBookingsPage() {
  const result = await getMyBookings();
  const bookings = Array.isArray(result?.data) ? result.data : [];
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border/40 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CalendarCheck2 className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              My Bookings
            </h1>
            <p className="text-xs text-muted-foreground">
              View and manage all your scheduled services, track status, cancel
              before work starts, or leave reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Suspense boundary wrapping dynamic cookies data access */}
      <Suspense fallback={<BookingsListSkeleton />}>
        <CustomerBookingsList initialBookings={bookings} />
      </Suspense>
    </div>
  );
}
