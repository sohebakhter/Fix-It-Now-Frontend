import React from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  XCircle,
  Activity,
} from "lucide-react";
import StatCard from "../dashboard/StatCard";
import { getTechnicianBookingsAction } from "../../_actions/bookingActions";
import { getPaymentHistory } from "../../_actions/paymentActions";
import { TTechnicianBooking, TPaymentItem } from "@/lib/types";

const CustomerDashboardStats = async () => {
  const [bookingsRes, paymentsRes] = await Promise.all([
    getTechnicianBookingsAction(),
    getPaymentHistory(),
  ]);

  const bookings: TTechnicianBooking[] = bookingsRes?.data ?? [];
  const payments: TPaymentItem[] = paymentsRes?.data ?? [];

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b) => b.status === "REQUESTED" || b.status === "ACCEPTED"
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "CANCELLED" || b.status === "DECLINED"
  ).length;
  const inProgressBookings = bookings.filter(
    (b) => b.status === "IN_PROGRESS"
  ).length;
  const unpaidBookings = bookings.filter(
    (b) => b.status === "ACCEPTED"
  ).length;

  const totalPayments = payments.length;
  const paidPayments = payments.filter((p) => p.status === "PAID").length;
  const totalSpent = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-linear-to-r from-violet-700 to-violet-600 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
        <p className="mt-1 text-violet-200">
          Track your bookings and payment activity
        </p>
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
            subtitle="All time bookings"
            icon={BookOpen}
            gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Pending"
            value={pendingBookings}
            subtitle="Awaiting confirmation"
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-600 to-amber-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Completed"
            value={completedBookings}
            subtitle="Services received"
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Cancelled"
            value={cancelledBookings}
            subtitle="Declined or cancelled"
            icon={XCircle}
            gradient="bg-gradient-to-br from-rose-600 to-rose-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Payment Statistics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Payment Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Transactions"
            value={totalPayments}
            subtitle="All payment records"
            icon={CreditCard}
            gradient="bg-gradient-to-br from-violet-600 to-violet-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Successful Payments"
            value={paidPayments}
            subtitle="Completed transactions"
            icon={Activity}
            gradient="bg-gradient-to-br from-cyan-600 to-cyan-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
          <StatCard
            title="Total Spent"
            value={totalSpent > 0 ? `$${totalSpent.toLocaleString()}` : "$0"}
            subtitle="Lifetime spend"
            icon={DollarSign}
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            iconBg="bg-white/20"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Action Alerts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {inProgressBookings > 0 && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
              🔧{" "}
              <span className="font-bold">{inProgressBookings}</span> service
              {inProgressBookings > 1 ? "s are" : " is"} currently in
              progress.
            </p>
          </div>
        )}
        {unpaidBookings > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              💳 You have{" "}
              <span className="font-bold">{unpaidBookings}</span> accepted
              booking{unpaidBookings > 1 ? "s" : ""} awaiting payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboardStats;
