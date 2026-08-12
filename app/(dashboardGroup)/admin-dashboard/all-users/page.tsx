import React, { Suspense } from "react";
import { getAllUsers } from "@/app/(dashboardGroup)/_actions/userActions";
import UsersList from "./_components/UsersList";
import UserSkeleton from "./_components/UserSkeleton";

async function UsersListWrapper() {
  const response = await getAllUsers();
  const users = response?.data || [];

  return <UsersList initialUsers={users} />;
}

const AllUsersPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Header section */}
      <div className="flex flex-col gap-2 border-b border-border/40 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          User Management
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor user accounts, update active status, ban, unban, or delete users.
        </p>
      </div>

      {/* Suspense boundary for skeleton loader */}
      <Suspense fallback={<UserSkeleton />}>
        <UsersListWrapper />
      </Suspense>
    </div>
  );
};

export default AllUsersPage;