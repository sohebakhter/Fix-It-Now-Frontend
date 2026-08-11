import { Plus, Clock, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TAvailability } from "@/lib/types";

interface SlotDetailsPanelProps {
  activeDateKey: string;
  slots: TAvailability[];
  onAddSlot: (dateKey: string) => void;
}

function formatHeaderDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTimeLabel(time24: string) {
  const [hoursStr, minutesStr] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutesStr} ${ampm}`;
}

export function SlotDetailsPanel({
  activeDateKey,
  slots,
  onAddSlot,
}: SlotDetailsPanelProps) {
  if (!activeDateKey) return null;

  return (
    <div className="md:col-span-8">
      <Card className="rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <CardHeader className="border-b border-border/30 bg-muted/5 p-6 flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-extrabold text-foreground">
              {formatHeaderDate(activeDateKey)}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Showing all working timeslots for this date.
            </p>
          </div>

          <Button
            onClick={() => onAddSlot(activeDateKey)}
            variant="outline"
            size="sm"
            className="rounded-xl font-semibold gap-1.5 shadow-sm border-border/80 hover:bg-muted"
          >
            <Plus className="size-3.5" />
            Add Slot
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {slots.map((slot) => {
              const isBooked =
                Boolean(slot.booking) || Boolean(slot.bookings);
              return (
                <div
                  key={slot.id}
                  className={`relative group overflow-hidden rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between ${
                    isBooked
                      ? "bg-rose-500/5 border-rose-500/20 text-rose-800 dark:text-rose-200"
                      : "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-200"
                  }`}
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <Clock className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">
                        {formatTimeLabel(slot.startTime)} -{" "}
                        {formatTimeLabel(slot.endTime)}
                      </span>
                    </div>
                    <span className="text-xs block text-muted-foreground">
                      {slot.startTime} to {slot.endTime}
                    </span>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isBooked ? (
                      <Badge
                        variant="destructive"
                        className="rounded-lg text-xs font-semibold px-2.5 py-0.5 gap-1 bg-rose-500/10 text-rose-600 border border-rose-500/20 hover:bg-rose-500/15"
                      >
                        <Lock className="size-3" />
                        Booked
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="rounded-lg text-xs font-semibold px-2.5 py-0.5 gap-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/15"
                      >
                        <CheckCircle2 className="size-3" />
                        Available
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
