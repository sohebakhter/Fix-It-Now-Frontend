"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TNavbarProps, TSidebarItem } from "@/lib/types";
import { sidebarItems } from "../_config/sidebarItems";

export default function DashboardSidebar({ user }: TNavbarProps) {
  const pathname = usePathname();

  let navItems: TSidebarItem[] = [];

  if (user.data?.role === "CUSTOMER") {
    navItems = sidebarItems.CUSTOMER;
  } else if (user.data?.role === "TECHNICIAN") {
    navItems = sidebarItems.TECHNICIAN;
  } else if (user.data?.role === "ADMIN") {
    navItems = sidebarItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-16 z-40 h-[calc(100svh-4rem)] shrink-0 overflow-y-auto border-r border-sidebar-border"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
