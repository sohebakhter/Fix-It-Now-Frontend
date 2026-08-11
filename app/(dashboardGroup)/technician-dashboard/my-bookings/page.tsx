import React, { Suspense } from "react";
import { getTechnicianBookingsAction } from "@/app/(dashboardGroup)/_actions/bookingActions";
import { TechnicianBookingsList } from "./_components/TechnicianBookingsList";
import { BookingsSkeleton } from "./_components/BookingsSkeleton";

async function BookingsDataLoader() {
  const response = await getTechnicianBookingsAction();
  const bookings = Array.isArray(response?.data) ? response.data : [];

  return <TechnicianBookingsList initialBookings={bookings} />;
}

export default function TechnicianBookingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <Suspense fallback={<BookingsSkeleton />}>
        <BookingsDataLoader />
      </Suspense>
    </div>
  );
}
