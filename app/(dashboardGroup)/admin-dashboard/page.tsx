import React, { Suspense } from "react";
import AdminDashboardStats from "../_components/dashboard/AdminDashboardStats";

const AdminDashboardPage = () => {
  return (
    <div className="p-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        }
      >
        <AdminDashboardStats />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;