import React from "react";
import {
  Wrench,
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  DollarSign,
} from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { getMyServicesAction } from "../../_actions/serviceActions";
import { getTechnicianBookingsAction } from "../../_actions/bookingActions";
import { getMyAvailabilitiesAction } from "../../_actions/availabilityActions";
import { IService, TTechnicianBooking, TAvailability } from "@/lib/types";

const TechnicianDashboardStats = async () => {
  const [servicesRes, bookingsRes, availabilitiesRes] = await Promise.all([
    getMyServicesAction(),
    getTechnicianBookingsAction(),
    getMyAvailabilitiesAction(),
  ]);

  const services: IService[] = servicesRes?.data ?? [];
  const bookings: TTechnicianBooking[] = bookingsRes?.data ?? [];
  const availabilities: TAvailability[] = availabilitiesRes?.data ?? [];

  const totalServices = services.length;
  const activeServices = services.filter((s) => s.status === "ACTIVE").length;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b) => b.status === "REQUESTED"
  ).length;
  const acceptedBookings = bookings.filter(
    (b) => b.status === "ACCEPTED" || b.status === "PAID"
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;
  const inProgressBookings = bookings.filter(
    (b) => b.status === "IN_PROGRESS"
  ).length;

  const totalAvailabilities = availabilities.length;
  const bookedSlots = availabilities.filter((a) => a.bookings !== null).length;
  const freeSlots = totalAvailabilities - bookedSlots;

  // Estimate revenue from completed bookings with payment data
  const totalEarnings = bookings
    .filter((b) => b.status === "COMPLETED" && b.payment?.amount)
    .reduce((sum, b) => sum + (b.payment?.amount ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-linear-to-r from-cyan-800 to-cyan-700 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Technician Overview</h1>
        <p className="mt-1 text-cyan-200">
          Your services, bookings, and availability at a glance
        </p>
      </div>

      {/* Service Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          My Services
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Services"
            value={totalServices}
            subtitle="All your listed services"
            icon={Wrench}
            gradient="bg-gradient-to-br from-cyan-600 to-cyan-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Active Services"
            value={activeServices}
            subtitle="Currently listed"
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Total Earnings"
            value={
              totalEarnings > 0
                ? `$${totalEarnings.toLocaleString()}`
                : "—"
            }
            subtitle="From completed bookings"
            icon={DollarSign}
            gradient="bg-gradient-to-br from-green-600 to-green-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Booking Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          My Bookings
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            subtitle="All received bookings"
            icon={BookOpen}
            gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Pending Requests"
            value={pendingBookings}
            subtitle="Awaiting your response"
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-600 to-amber-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Accepted / Paid"
            value={acceptedBookings}
            subtitle="Confirmed bookings"
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Completed"
            value={completedBookings}
            subtitle="Successfully finished"
            icon={Star}
            gradient="bg-gradient-to-br from-violet-600 to-violet-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Availability Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          My Availability
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Slots"
            value={totalAvailabilities}
            subtitle="Scheduled availability slots"
            icon={Calendar}
            gradient="bg-gradient-to-br from-teal-600 to-teal-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Booked Slots"
            value={bookedSlots}
            subtitle="Slots with bookings"
            icon={BookOpen}
            gradient="bg-gradient-to-br from-rose-600 to-rose-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Free Slots"
            value={freeSlots}
            subtitle="Available for booking"
            icon={XCircle}
            gradient="bg-gradient-to-br from-sky-600 to-sky-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {inProgressBookings > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            🔧 You have{" "}
            <span className="font-bold">{inProgressBookings}</span> booking
            {inProgressBookings > 1 ? "s" : ""} currently in progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default TechnicianDashboardStats;
