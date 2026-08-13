import React, { Suspense } from "react";
import CustomerDashboardStats from "../_components/dashboard/CustomerDashboardStats";

const CustomerDashboardPage = () => {
  return (
    <div className="p-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        }
      >
        <CustomerDashboardStats />
      </Suspense>
    </div>
  );
};

export default CustomerDashboardPage;
