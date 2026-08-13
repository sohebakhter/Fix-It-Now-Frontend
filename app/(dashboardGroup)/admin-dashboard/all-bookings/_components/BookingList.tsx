"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { BookingCard } from "./BookingCard";
import type { TTechnicianBooking } from "@/lib/types";

interface BookingListProps {
  initialBookings: TTechnicianBooking[];
}

export function BookingList({ initialBookings }: BookingListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const stats = useMemo(() => {
    const total = initialBookings.length;
    const completed = initialBookings.filter((b) => b.status === "COMPLETED").length;
    const inProgress = initialBookings.filter((b) => b.status === "IN_PROGRESS").length;
    const declined = initialBookings.filter(
      (b) => b.status === "DECLINED" || b.status === "CANCELLED"
    ).length;
    const paid = initialBookings.filter((b) => b.payment?.status === "PAID").length;

    return { total, completed, inProgress, declined, paid };
  }, [initialBookings]);

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch =
        booking.service?.title?.toLowerCase().includes(lowerSearch) ||
        booking.customer?.name?.toLowerCase().includes(lowerSearch) ||
        booking.customer?.email?.toLowerCase().includes(lowerSearch) ||
        booking.service?.category?.name?.toLowerCase().includes(lowerSearch);

      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [initialBookings, searchTerm, statusFilter]);

  const statuses = [
    "ALL",
    "REQUESTED",
    "ACCEPTED",
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
    "DECLINED",
    "CANCELLED",
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[
          {
            label: "Total Bookings",
            value: stats.total,
            icon: BookOpen,
            color: "text-blue-500 bg-blue-500/10",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "text-emerald-500 bg-emerald-500/10",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: Clock,
            color: "text-purple-500 bg-purple-500/10",
          },
          {
            label: "Declined / Cancelled",
            value: stats.declined,
            icon: XCircle,
            color: "text-rose-500 bg-rose-500/10",
          },
          {
            label: "Revenue (Paid)",
            value: stats.paid,
            icon: CreditCard,
            color: "text-indigo-500 bg-indigo-500/10",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-4 shadow-2xs hover:shadow-xs transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              <item.icon className={`size-5 rounded-lg p-1 ${item.color}`} />
            </div>
            <span className="text-2xl font-black mt-2 text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 border border-border/40 p-4 rounded-3xl backdrop-blur-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search by service, customer, or category..."
            className="pl-10 h-10 rounded-xl bg-card border-border/60 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 py-1.5 rounded-xl border border-border/60 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All Statuses" : s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Booking Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 rounded-3xl bg-muted/5">
          <BookOpen className="size-10 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-bold text-foreground">No Bookings Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            No bookings match your current search or filter. Try adjusting your query.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingList;
