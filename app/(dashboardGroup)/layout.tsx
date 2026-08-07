import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar user={user} />
          <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
