import React, { Suspense } from "react";
import TechnicianDashboardStats from "../_components/dashboard/TechnicianDashboardStats";

const TechnicianDashboardPage = () => {
  return (
    <div className="p-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        }
      >
        <TechnicianDashboardStats />
      </Suspense>
    </div>
  );
};

export default TechnicianDashboardPage;
