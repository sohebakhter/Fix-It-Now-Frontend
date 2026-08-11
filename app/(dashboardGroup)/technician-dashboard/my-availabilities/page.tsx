import React, { Suspense } from "react";
import { getMyAvailabilitiesAction } from "@/app/(dashboardGroup)/_actions/availabilityActions";
import { AvailabilitiesDashboard } from "./_components/AvailabilitiesDashboard";
import { AvailabilitiesSkeleton } from "./_components/AvailabilitiesSkeleton";

async function AvailabilitiesDataLoader() {
  const response = await getMyAvailabilitiesAction();
  const availabilities = Array.isArray(response?.data) ? response.data : [];

  return <AvailabilitiesDashboard initialAvailabilities={availabilities} />;
}

export default function MyAvailabilitiesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <Suspense fallback={<AvailabilitiesSkeleton />}>
        <AvailabilitiesDataLoader />
      </Suspense>
    </div>
  );
}
