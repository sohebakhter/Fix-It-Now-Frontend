"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  createBookingAction,
  getAvailabilities,
  getMyBookings,
  TAvailability,
} from "@/app/(publicGroup)/_actions/bookingActions";
import { BookServiceButtonProps } from "@/lib/types";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BookServiceButton({
  serviceId,
  technicianId,
  serviceTitle,
  servicePrice,
  serviceLocation,
  isActive,
}: BookServiceButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availabilities, setAvailabilities] = useState<TAvailability[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchAvailableSlots = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [availRes, bookingsRes] = await Promise.all([
        getAvailabilities(),
        getMyBookings(),
      ]);

      const bookedIds = new Set<string>();
      if (Array.isArray(bookingsRes?.data)) {
        bookingsRes.data.forEach((b: unknown) => {
          if ((b as { availabilityId?: string }).availabilityId) {
            bookedIds.add((b as { availabilityId?: string }).availabilityId!);
          }
        });
      }

      if (availRes?.success && Array.isArray(availRes.data)) {
        const filtered = availRes.data.filter((a: TAvailability) => {
          const isSameTech = a.technicianId === technicianId;
          const hasBookingObj = Boolean(a.booking);
          const hasBookingsArr = Array.isArray(a.bookings)
            ? a.bookings.length > 0
            : Boolean(a.bookings);
          const isBooked =
            hasBookingObj || hasBookingsArr || bookedIds.has(a.id);
          return isSameTech && !isBooked;
        });

        setAvailabilities(filtered);
        setSelectedSlotId(filtered.length > 0 ? filtered[0].id : "");
      } else {
        setAvailabilities([]);
        setSelectedSlotId("");
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || "Failed to load availabilities");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchAvailableSlots();
  };

  const handleBookService = async () => {
    if (!selectedSlotId) {
      toast.error("Please select an available time slot");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");

    const res = await createBookingAction({
      serviceId,
      availabilityId: selectedSlotId,
    });

    setSubmitting(false);

    if (res.success) {
      toast.success(res.message || "Booking created successfully!");
      setIsOpen(false);
      router.push("/dashboard/my-bookings");
    } else {
      const msg = res.message || "This slot is already booked";
      toast.error(msg);
      setErrorMsg(msg);
      if (res.statusCode === 401) {
        setTimeout(() => {
          router.push(`/login?redirectTo=/services/${serviceId}`);
        }, 1500);
      }
    }
  };

  return (
    <>
      <Button
        size="lg"
        onClick={handleOpenModal}
        disabled={!isActive}
        className="w-full gap-2 rounded-2xl font-semibold text-sm shadow-md transition-all bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Calendar className="size-4" />
        {isActive ? "Book This Service" : "Service Unavailable"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Book Service
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Select an available time slot for{" "}
              <strong className="text-foreground">{serviceTitle}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            {/* Service summary */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm">
                  {serviceTitle}
                </span>
                <span className="text-base font-extrabold text-primary">
                  ${servicePrice.toFixed(2)}
                </span>
              </div>
              {serviceLocation && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  <span>{serviceLocation}</span>
                </div>
              )}
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Booking Failed</span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {/* Slot picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Select Available Slot</span>
                {!loading && (
                  <span className="text-[11px] text-muted-foreground font-normal">
                    {availabilities.length} slot
                    {availabilities.length !== 1 ? "s" : ""} available
                  </span>
                )}
              </label>

              {loading ? (
                <div className="flex items-center justify-center p-8 text-xs text-muted-foreground gap-2 border border-dashed rounded-2xl">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  <span>Loading availabilities...</span>
                </div>
              ) : availabilities.length === 0 ? (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center text-xs text-amber-700 dark:text-amber-300">
                  <AlertCircle className="size-5 mx-auto mb-1.5 opacity-80" />
                  <p className="font-medium">No available slots.</p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    Please check back later.
                  </p>
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {availabilities.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setErrorMsg("");
                        }}
                        className={`group flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                            : "border-border/70 hover:border-primary/50 bg-card hover:bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground">
                            <Calendar className="size-3.5 text-primary" />
                            <span>{formatDate(slot.date)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Clock className="size-3 text-muted-foreground" />
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`size-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border group-hover:border-primary/60"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="size-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleBookService}
              disabled={
                submitting ||
                loading ||
                !selectedSlotId ||
                availabilities.length === 0
              }
              className="rounded-xl text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-3.5" />
                  <span>Confirm Booking</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
