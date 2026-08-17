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
import { cn } from "@/lib/utils";

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
    <>
      {/* ── Desktop / Tablet sidebar (hidden on mobile) ── */}
      <Sidebar
        collapsible="none"
        className="hidden md:flex sticky top-16 z-40 h-[calc(100svh-4rem)] shrink-0 overflow-y-auto border-r border-sidebar-border"
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

      {/* ── Mobile bottom navigation bar (hidden on md+) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-16 items-stretch bg-background border-t border-border">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="leading-none truncate max-w-18 text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer so page content isn't hidden behind the bottom bar on mobile */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
