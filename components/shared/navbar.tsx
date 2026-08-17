"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logout } from "@/app/(authGroup)/_actions/authActions";
import { TNavbarProps } from "@/lib/types";
import { useEffect, useState } from "react";

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
  const [showNavbar, setShowNavbar] = useState(true);

  // for hide/unhide navbar, based on scrolling
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <header
      className={`w-full bg-sky/10 backdrop-blur-md border-b border-white/10 rounded-b-4xl sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            FIX<small>IT</small>NOW
          </span>
        </Link>

        {/* Nav links - middle (desktop only) */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: user dropdown + mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* User dropdown / Auth buttons (desktop Login+SignUp hidden on mobile) */}
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
              {/*
               * Fix: align="end" keeps the popup anchored to the right edge of the
               * trigger. w-[min(14rem,calc(100vw-2rem))] ensures it never exceeds
               * the viewport width on narrow mobile screens.
               */}
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-[min(14rem,calc(100vw-2rem))]"
              >
                <div className="flex flex-col gap-0.5 px-1.5 py-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {user?.data?.name}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground truncate">
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
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Button
                  variant="outline"
                  className="border-gray-300 text-foreground hover:bg-sky-50 cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              <Link
                href="/signup"
                className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Button
                  className="cursor-pointer border-sky-200 text-foreground"
                  variant={"outline"}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* ─── Mobile hamburger (hidden on md+) ─── */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 flex flex-col">
              {/* Drawer header */}
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle className="text-left text-lg font-semibold tracking-tight">
                  FIX<small>IT</small>NOW
                </SheetTitle>
              </SheetHeader>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Auth section (unauthenticated users) */}
              {!user.success && (
                <div className="border-t border-border px-4 py-4 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-foreground hover:bg-sky-50 cursor-pointer"
                      >
                        Login
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/signup">
                      <Button
                        className="w-full cursor-pointer border-sky-200 text-foreground"
                        variant={"outline"}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              )}

              {/* User section (authenticated users) */}
              {user.success && (
                <div className="border-t border-border px-4 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={user?.data?.image || ""} alt="User avatar" />
                      <AvatarFallback>
                        {user.data.name.slice(0, 1).toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">
                        {user?.data?.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user?.data?.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {userMenuItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={
                            item.href === "/dashboard"
                              ? dashboardSwitch()
                              : item.href
                          }
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 w-full text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </SheetClose>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
