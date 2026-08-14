"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
// import { TNavbarProps } from "@/lib/types";
import { logout } from "@/app/(authGroup)/_actions/authActions";
import { TNavbarProps } from "@/lib/types";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Navbar({ user }: TNavbarProps) {
  const router = useRouter();

  const dashboardSwitch = (): string => {
    switch (user.data.role) {
      case "CUSTOMER":
        return "/dashboard";
      case "TECHNICIAN":
        return "/technician-dashboard";
      case "ADMIN":
        return "/admin-dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleLogout = async () => {
    await logout();

    toast.success("Logout Successfully");

    router.replace("/login");
  };

  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            FIX<small>IT</small>NOW
          </span>
        </Link>

        {/* Nav links - middle */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User dropdown - right */}
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open user menu"
              className="flex h-9 w-9 items-center justify-center rounded-full outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.data?.image || ""} alt="User avatar" />
                <AvatarFallback>
                  {user.data.name.slice(0, 1).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col gap-0.5 px-1.5 py-1">
                <span className="text-sm font-medium text-foreground">
                  {user?.data?.name}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user?.data?.email}
                </span>
              </div>
              <DropdownMenuSeparator />
              {userMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="cursor-pointer"
                >
                  <Link
                    href={
                      item.href === "/dashboard" ? dashboardSwitch() : item.href
                    }
                    className="flex w-full items-center"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                variant="destructive"
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-sky-50 cursor-pointer"
              >
                Login
              </Button>
            </Link>

            <Link
              href="/signup"
              className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Button
                className="cursor-pointer border-sky-200 text-sky-600"
                variant={"outline"}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
