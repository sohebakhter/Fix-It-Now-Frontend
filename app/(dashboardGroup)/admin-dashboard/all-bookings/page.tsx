import React, { Suspense } from "react";
import { getAllBookingsAction } from "@/app/(dashboardGroup)/_actions/bookingActions";
import BookingList from "./_components/BookingList";
import BookingSkeleton from "./_components/BookingSkeleton";
import type { TTechnicianBooking } from "@/lib/types";

async function BookingListWrapper() {
  const response = await getAllBookingsAction();
  const bookings: TTechnicianBooking[] = response?.data || [];

  return <BookingList initialBookings={bookings} />;
}

const AllBookingsPage = async () => {
  return (
    <div className="w-full min-h-full space-y-6 p-6">
      {/* Header section */}
      <div className="flex flex-col gap-2 border-b border-border/40 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          All Bookings
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor all service bookings across the platform — view status, customer details, and payment information.
        </p>
      </div>

      {/* Suspense with skeleton fallback */}
      <Suspense fallback={<BookingSkeleton />}>
        <BookingListWrapper />
      </Suspense>
    </div>
  );
};

export default AllBookingsPage;
