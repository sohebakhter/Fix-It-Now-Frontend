import { TSidebarItem } from "@/lib/types";
import { Calendar, CreditCard, LayoutDashboard, Toolbox, } from "lucide-react";

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
    }
]

const ADMIN_SIDE_ITEMS: TSidebarItem[] = [
    {
        label: "Overview",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
    },
]

export const sidebarItems = {
    CUSTOMER: CUSTOMER_SIDE_ITEMS,
    TECHNICIAN: TECHNICIAN_SIDE_ITEMS,
    ADMIN: ADMIN_SIDE_ITEMS
}