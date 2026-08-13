import React from "react";
import {
  Users,
  ShieldCheck,
  Wrench,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  ChartBarStacked,
} from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { getAllUsers } from "../../_actions/userActions";
import { getAllBookingsAction } from "../../_actions/bookingActions";
import { getAllCategoriesAction } from "../../_actions/categoryActions";
import { TUserData, TTechnicianBooking } from "@/lib/types";

const AdminDashboardStats = async () => {
  const [usersRes, bookingsRes, categoriesRes] = await Promise.all([
    getAllUsers(),
    getAllBookingsAction(),
    getAllCategoriesAction(),
  ]);

  const users: TUserData[] = usersRes?.data ?? [];
  const bookings: TTechnicianBooking[] = bookingsRes?.data ?? [];
  const categories = categoriesRes?.data ?? [];

  const totalUsers = users.length;
  const customers = users.filter((u) => u.role === "CUSTOMER").length;
  const technicians = users.filter((u) => u.role === "TECHNICIAN").length;
  const bannedUsers = users.filter((u) => u.status === "BAN" || u.status === "BANNED").length;
  const activeUsers = totalUsers - bannedUsers;

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
  const pendingBookings = bookings.filter(
    (b) => b.status === "REQUESTED" || b.status === "ACCEPTED"
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "CANCELLED" || b.status === "DECLINED"
  ).length;

  const totalCategories = categories.length;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-linear-to-r from-slate-800 to-slate-700 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="mt-1 text-slate-400">
          Full system statistics and management insights
        </p>
      </div>

      {/* User Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          User Statistics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            subtitle={`${activeUsers} active`}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Customers"
            value={customers}
            subtitle="Registered customers"
            icon={Users}
            gradient="bg-gradient-to-br from-violet-600 to-violet-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Technicians"
            value={technicians}
            subtitle="Service providers"
            icon={Wrench}
            gradient="bg-gradient-to-br from-cyan-600 to-cyan-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Banned Users"
            value={bannedUsers}
            subtitle="Restricted accounts"
            icon={XCircle}
            gradient="bg-gradient-to-br from-rose-600 to-rose-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Booking Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Booking Statistics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            subtitle="All time"
            icon={BookOpen}
            gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Completed"
            value={completedBookings}
            subtitle="Successfully done"
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Pending"
            value={pendingBookings}
            subtitle="Awaiting action"
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-600 to-amber-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Cancelled"
            value={cancelledBookings}
            subtitle="Declined or cancelled"
            icon={XCircle}
            gradient="bg-gradient-to-br from-red-600 to-red-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Platform Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Service Categories"
            value={totalCategories}
            subtitle="Available categories"
            icon={ChartBarStacked}
            gradient="bg-gradient-to-br from-teal-600 to-teal-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Active Users"
            value={activeUsers}
            subtitle="Currently active"
            icon={ShieldCheck}
            gradient="bg-gradient-to-br from-green-600 to-green-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Completion Rate"
            value={
              totalBookings > 0
                ? `${Math.round((completedBookings / totalBookings) * 100)}%`
                : "N/A"
            }
            subtitle="Bookings completed"
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-sky-600 to-sky-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
