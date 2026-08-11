"use client";

import React, { useState, useMemo } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { DateSidebarList } from "./DateSidebarList";
import { SlotDetailsPanel } from "./SlotDetailsPanel";
import { CreateAvailabilityDialog } from "./CreateAvailabilityDialog";
import type { TAvailability } from "@/lib/types";

interface AvailabilitiesDashboardProps {
  initialAvailabilities: TAvailability[];
}

export function AvailabilitiesDashboard({
  initialAvailabilities,
}: AvailabilitiesDashboardProps) {
  const [availabilities, setAvailabilities] = useState<TAvailability[]>(
    initialAvailabilities
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState("");

  // Group availabilities by date-only key (YYYY-MM-DD)
  const groupedAvailabilities = useMemo(() => {
    const groups: { [dateKey: string]: TAvailability[] } = {};
    availabilities.forEach((avail) => {
      if (!avail.date) return;
      const dateKey = avail.date.split("T")[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(avail);
    });

    // Sort timeslots within each group by start time
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return groups;
  }, [availabilities]);

  // Sorted date keys (ascending order)
  const sortedDateKeys = useMemo(() => {
    return Object.keys(groupedAvailabilities).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [groupedAvailabilities]);

  // Compute active date key (falls back to first sorted date key)
  const activeDateKey = useMemo(() => {
    if (selectedDateKey && groupedAvailabilities[selectedDateKey]) {
      return selectedDateKey;
    }
    return sortedDateKeys[0] || "";
  }, [selectedDateKey, groupedAvailabilities, sortedDateKeys]);

  const currentSlots = activeDateKey
    ? groupedAvailabilities[activeDateKey] || []
    : [];

  // --- Handlers ---

  const handleOpenCreateForDate = (dateKey: string) => {
    setDialogDate(dateKey);
    setIsOpen(true);
  };

  const handleOpenCreateGeneral = () => {
    const today = new Date().toISOString().split("T")[0];
    setDialogDate(today);
    setIsOpen(true);
  };

  const handleCreateSuccess = (newAvailability: TAvailability, dateKey: string) => {
    setAvailabilities((prev) => [...prev, newAvailability]);
    setSelectedDateKey(dateKey);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            My Availabilities
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Define and manage your working hours and available timeslots.
          </p>
        </div>

        <Button
          size="lg"
          className="rounded-2xl gap-2 shadow-sm font-semibold"
          onClick={handleOpenCreateGeneral}
        >
          <Plus className="size-4" />
          Add Availability
        </Button>
      </div>

      {/* Main Layout */}
      {availabilities.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-muted-foreground/20 rounded-3xl bg-muted/5">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
            <CalendarIcon className="size-7" />
          </div>
          <CardTitle className="text-lg font-bold text-foreground">
            No Availabilities Defined
          </CardTitle>
          <CardContent className="text-xs text-muted-foreground max-w-sm mt-2 p-0">
            Set your available timeslots so clients can find, view, and book your services.
          </CardContent>
          <Button
            onClick={handleOpenCreateGeneral}
            variant="outline"
            className="mt-6 rounded-xl font-medium"
          >
            Create Your First Slot
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <DateSidebarList
            sortedDateKeys={sortedDateKeys}
            groupedAvailabilities={groupedAvailabilities}
            activeDateKey={activeDateKey}
            onSelectDate={setSelectedDateKey}
            onAddForDate={handleOpenCreateForDate}
          />

          <SlotDetailsPanel
            activeDateKey={activeDateKey}
            slots={currentSlots}
            onAddSlot={handleOpenCreateForDate}
          />
        </div>
      )}

      {/* Create Availability Dialog */}
      <CreateAvailabilityDialog
        key={dialogDate}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialDate={dialogDate}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
