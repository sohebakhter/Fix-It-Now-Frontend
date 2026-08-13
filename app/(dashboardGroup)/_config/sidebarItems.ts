import { TSidebarItem } from "@/lib/types";
import { Calendar, ChartBarStacked, CreditCard, LayoutDashboard, Toolbox, Users, } from "lucide-react";

const CUSTOMER_SIDE_ITEMS: TSidebarItem[] = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: CreditCard,
    },


]

const TECHNICIAN_SIDE_ITEMS: TSidebarItem[] = [
    {
        label: "Overview",
        href: "/technician-dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Services",
        href: "/technician-dashboard/my-services",
        icon: Toolbox,
    },
    {
        label: "My Availabilities",
        href: "/technician-dashboard/my-availabilities",
        icon: Calendar,
    },
    {
        label: "My Bookings",
        href: "/technician-dashboard/my-bookings",
        icon: CreditCard,
    }
]

const ADMIN_SIDE_ITEMS: TSidebarItem[] = [
    {
        label: "Overview",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "All Users",
        href: "/admin-dashboard/all-users",
        icon: Users,
    },
    {
        label: "All Categories",
        href: "/admin-dashboard/categories",
        icon: ChartBarStacked,
    },
]

export const sidebarItems = {
    CUSTOMER: CUSTOMER_SIDE_ITEMS,
    TECHNICIAN: TECHNICIAN_SIDE_ITEMS,
    ADMIN: ADMIN_SIDE_ITEMS
}