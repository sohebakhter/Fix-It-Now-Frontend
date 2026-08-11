import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TAvailability } from "@/lib/types";

interface DateSidebarListProps {
  sortedDateKeys: string[];
  groupedAvailabilities: { [dateKey: string]: TAvailability[] };
  activeDateKey: string;
  onSelectDate: (dateKey: string) => void;
  onAddForDate: (dateKey: string) => void;
}

function formatDateLabel(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDayName(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
}

export function DateSidebarList({
  sortedDateKeys,
  groupedAvailabilities,
  activeDateKey,
  onSelectDate,
  onAddForDate,
}: DateSidebarListProps) {
  return (
    <div className="md:col-span-4 space-y-3">
      <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">
        Working Dates
      </h2>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {sortedDateKeys.map((dateKey) => {
          const slots = groupedAvailabilities[dateKey];
          const isActive = dateKey === activeDateKey;
          return (
            <div
              key={dateKey}
              className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-card hover:bg-muted/30 border-border/50 text-foreground"
              }`}
              onClick={() => onSelectDate(dateKey)}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm truncate">
                    {formatDateLabel(dateKey)}
                  </span>
                </div>
                <span
                  className={`text-xs block mt-0.5 ${
                    isActive
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatDayName(dateKey)}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {slots.length} {slots.length === 1 ? "Slot" : "Slots"}
                </Badge>

                <Button
                  variant="ghost"
                  size="icon"
                  className={`size-7 rounded-lg opacity-80 hover:opacity-100 ${
                    isActive
                      ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddForDate(dateKey);
                  }}
                  title="Add time slot for this date"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
