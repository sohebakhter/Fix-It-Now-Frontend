"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IService, TAvailability } from "@/lib/types";
import {
  MapPin,
  Star,
  Tag,
  Award,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  createBookingAction,
  getAvailabilities,
  getMyBookings,
} from "../_actions/bookingActions";
import EditServiceButton from "./EditServiceButton";
import DeleteServiceButton from "./DeleteServiceButton";
import { ServiceDetailsButton } from "./ServiceDetailsButton";

type ServiceCardProps = {
  service: IService;
  isAdmin?: boolean;
  isTechnician?: boolean;
};

export function ServiceCard({
  service,
  isAdmin,
  isTechnician,
}: ServiceCardProps) {
  const router = useRouter();
  const ratingNum = service.technician?.rating
    ? parseFloat(service.technician.rating)
    : 0;
  const experience = service.technician?.experience ?? "N/A";
  const isActive = service.status === "ACTIVE";

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
      const techId = service.technician?.id || service.technicianId;

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
          const isSameTech = a.technicianId === techId;
          const hasBookingObj = Boolean(a.booking);
          const hasBookingsArr = Array.isArray(a.bookings)
            ? a.bookings.length > 0
            : Boolean(a.bookings);
          const isBooked =
            hasBookingObj || hasBookingsArr || bookedIds.has(a.id);
          return isSameTech && !isBooked;
        });

        setAvailabilities(filtered);
        if (filtered.length > 0) {
          setSelectedSlotId(filtered[0].id);
        } else {
          setSelectedSlotId("");
        }
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

    const payload = {
      serviceId: service.id,
      availabilityId: selectedSlotId,
    };

    const res = await createBookingAction(payload);

    setSubmitting(false);

    if (res.success) {
      toast.success(res.message || "Booking created successfully!");
      setIsOpen(false);
      router.refresh();
      router.push("/dashboard/my-bookings");
    } else {
      const msg = res.message || "This slot is already booked";
      toast.error(msg);
      setErrorMsg(msg);
      if (res.statusCode === 401) {
        setTimeout(() => {
          router.push(`/login?redirectTo=/services`);
        }, 1500);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        <div>
          <CardHeader className="p-5 pb-3 space-y-3">
            {/* Top badges: Status & Category */}
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5 flex-wrap">
                {service.category?.name && (
                  <Badge
                    variant="secondary"
                    className="gap-1 rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                  >
                    <Tag className="size-3" />
                    {service.category.name}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2.5 py-0.5 text-xs font-medium ${
                    isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  <span
                    className={`mr-1.5 inline-block size-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                  />
                  {service.status}
                </Badge>
              </div>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex items-center gap-1 shrink-0">
                  <EditServiceButton service={service} />
                  <DeleteServiceButton
                    serviceId={service.id}
                    serviceTitle={service.title}
                  />
                </div>
              )}
            </div>

            {/* Service Title */}
            <CardTitle className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {service.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 pt-0 space-y-4">
            {/* Description */}
            <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
              {service.description}
            </p>

            {/* Details Row: Location & Tech Rating */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/30 p-3 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <MapPin className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{service.location || "N/A"}</span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Star className="size-3.5 shrink-0 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-foreground">
                  {ratingNum > 0 ? ratingNum.toFixed(1) : "New"}
                </span>
                {ratingNum > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    / 5.0
                  </span>
                )}
              </div>

              <div className="col-span-2 flex items-center gap-1.5 text-[11px] text-muted-foreground border-t border-border/40 pt-2 mt-1">
                <Award className="size-3.5 shrink-0 text-primary" />
                <span>
                  Technician Experience:{" "}
                  <strong className="text-foreground font-medium">
                    {experience} Yrs
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Card Footer: Price & Book Now CTA */}
        <CardFooter className="flex items-center justify-between p-5 border-t border-border/30 mt-2 pt-4">
          <div>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
              Price
            </span>
            <span className="text-xl font-extrabold text-foreground">
              ${service.price ? service.price.toFixed(2) : "0.00"}
            </span>
          </div>
          {!isTechnician && (
            <div className="flex flex-col items-center gap-1">
              <ServiceDetailsButton serviceId={service.id} />
              {!isAdmin && (
                <Button
                  size="sm"
                  onClick={handleOpenModal}
                  disabled={!isActive}
                  className="gap-1.5 rounded-xl font-medium shadow-xs transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Calendar className="size-3.5" />
                  <span>Book Now</span>
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Booking Dialog Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Book Service
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Select an available time slot for{" "}
              <strong className="text-foreground">{service.title}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            {/* Service & Price Info Card */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm">
                  {service.title}
                </span>
                <span className="text-base font-extrabold text-primary">
                  ${service.price ? service.price.toFixed(2) : "0.00"}
                </span>
              </div>
              {service.location && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  <span>{service.location}</span>
                </div>
              )}
            </div>

            {/* Error Message display */}
            {errorMsg && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Booking Failed</span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {/* Availabilities Selection */}
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
                  <span>Loading technician availabilities...</span>
                </div>
              ) : availabilities.length === 0 ? (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center text-xs text-amber-700 dark:text-amber-300">
                  <AlertCircle className="size-5 mx-auto mb-1.5 opacity-80" />
                  <p className="font-medium">
                    No available slots for this technician.
                  </p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    Please check back later or choose another service.
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
