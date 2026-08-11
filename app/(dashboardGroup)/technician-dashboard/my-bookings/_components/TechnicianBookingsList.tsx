"use client";

import React, { useState, useMemo } from "react";
import { ClipboardList, Archive, CheckCircle } from "lucide-react";
import { BookingCard } from "./BookingCard";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TTechnicianBooking } from "@/lib/types";

interface TechnicianBookingsListProps {
  initialBookings: TTechnicianBooking[];
}

type TabType = "requests" | "ongoing" | "past";

export function TechnicianBookingsList({ initialBookings }: TechnicianBookingsListProps) {
  const [bookings, setBookings] = useState<TTechnicianBooking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<TabType>("requests");

  const handleStatusChange = (updatedBooking: TTechnicianBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  // Group bookings by tab criteria
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (activeTab === "requests") {
        return booking.status === "REQUESTED" || booking.status === "ACCEPTED";
      }
      if (activeTab === "ongoing") {
        return booking.status === "PAID" || booking.status === "IN_PROGRESS";
      }
      if (activeTab === "past") {
        return (
          booking.status === "COMPLETED" ||
          booking.status === "CANCELLED" ||
          booking.status === "DECLINED"
        );
      }
      return true;
    });
  }, [bookings, activeTab]);

  // Tab Details Helper
  const tabConfig = [
    { id: "requests", label: "Active Requests", icon: ClipboardList },
    { id: "ongoing", label: "Ongoing Jobs", icon: CheckCircle },
    { id: "past", label: "Past & Other", icon: Archive },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            My Bookings
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your service requests, accept customer bookings, and track active jobs.
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-border/40 pb-2">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`rounded-xl px-4 py-2 gap-2 text-xs font-semibold ${
                isActive
                  ? "shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Bookings Grid or Empty State */}
      {filteredBookings.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-muted-foreground/20 rounded-3xl bg-muted/5">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
            <ClipboardList className="size-7" />
          </div>
          <CardTitle className="text-lg font-bold text-foreground">
            No Bookings Found
          </CardTitle>
          <CardContent className="text-xs text-muted-foreground max-w-sm mt-2 p-0">
            {activeTab === "requests" &&
              "There are no active booking requests or accepted bookings waiting for customer payment."}
            {activeTab === "ongoing" &&
              "You have no ongoing jobs or paid bookings in progress at the moment."}
            {activeTab === "past" &&
              "Your historical list of completed, cancelled, or declined bookings is empty."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
