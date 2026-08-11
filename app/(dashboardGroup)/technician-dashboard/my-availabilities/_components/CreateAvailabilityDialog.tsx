"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createAvailabilityAction } from "@/app/(dashboardGroup)/_actions/availabilityActions";
import type { TAvailability } from "@/lib/types";

interface CreateAvailabilityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate: string;
  onSuccess: (newAvailability: TAvailability, dateKey: string) => void;
}

export function CreateAvailabilityDialog({
  isOpen,
  onOpenChange,
  initialDate,
  onSuccess,
}: CreateAvailabilityDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form State
  const [formDate, setFormDate] = useState(initialDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formDate) {
      toast.error("Please select a date");
      return;
    }
    if (!startTime) {
      toast.error("Please enter a start time");
      return;
    }
    if (!endTime) {
      toast.error("Please enter an end time");
      return;
    }
    if (startTime >= endTime) {
      toast.error("Start time must be earlier than end time");
      return;
    }

    startTransition(async () => {
      try {
        const isoDate = new Date(formDate).toISOString();
        const payload = {
          date: isoDate,
          startTime,
          endTime,
        };

        const response = await createAvailabilityAction(payload);

        if (response.success) {
          toast.success("Availability created successfully!");

          if (response.data) {
            onSuccess(response.data, formDate);
          }

          router.refresh();
          onOpenChange(false);
        } else {
          toast.error(response.message || "Failed to create availability");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Availability Slot
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Define a specific time range when you are available to provide services.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="availability-date">Date</Label>
            <Input
              id="availability-date"
              type="date"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
              disabled={isPending}
              required
              className="rounded-xl h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="availability-start">Start Time</Label>
              <Input
                id="availability-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={isPending}
                required
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="availability-end">End Time</Label>
              <Input
                id="availability-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={isPending}
                required
                className="rounded-xl h-10"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-xl min-w-25 gap-2">
              {isPending ? (
                <>
                  <Spinner className="size-4" />
                  Creating...
                </>
              ) : (
                "Create Slot"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
