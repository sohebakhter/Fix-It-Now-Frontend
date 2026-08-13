import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getServiceDetails,
  getTechnicianDetails,
} from "@/app/(publicGroup)/_actions/publicServiceActions";
import {
  ArrowLeft,
  MapPin,
  Star,
  Tag,
  CalendarCheck2,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import { ServiceReviewList } from "./ServiceReviewList";
import { TechnicianDetails } from "./TechnicianDetails";
import { BookServiceButton } from "./BookServiceButton";

type ServiceDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function ServiceDetailsContent({
  params,
}: ServiceDetailsPageProps) {
  const { slug } = await params;

  const result = await getServiceDetails(slug);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const service = result.data;

  // Fetch technician details in parallel
  const technicianId = service.technician?.id ?? service.technicianId ?? null;

  const techResult = technicianId
    ? await getTechnicianDetails(technicianId)
    : null;

  const technician = techResult?.success ? techResult.data : null;

  const reviews: {
    id: string;
    bookingId: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    customer?: { id?: string; name?: string };
  }[] = Array.isArray(service.reviews) ? service.reviews : [];

  const totalBookings: number =
    typeof service._count?.bookings === "number"
      ? service._count.bookings
      : typeof service.totalBookings === "number"
        ? service.totalBookings
        : 0;

  const totalReviews: number =
    typeof service._count?.reviews === "number"
      ? service._count.reviews
      : reviews.length;

  const averageRating: number =
    typeof service.averageRating === "number"
      ? service.averageRating
      : reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

  const isActive = service.status === "ACTIVE";
  const ratingNum = service.technician?.rating
    ? parseFloat(service.technician.rating)
    : averageRating;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back link */}
        <Link href="/services">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs rounded-xl text-muted-foreground hover:text-foreground px-0"
          >
            <ArrowLeft className="size-3.5" />
            Back to Services
          </Button>
        </Link>

        {/* ── Top Stats Bar ── */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/50 bg-card/50 px-5 py-3">
          {/* Category */}
          {service.category?.name && (
            <Badge
              variant="secondary"
              className="gap-1 rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
            >
              <Tag className="size-3" />
              {service.category.name}
            </Badge>
          )}

          {/* Status */}
          <Badge
            variant="outline"
            className={`rounded-lg px-2.5 py-0.5 text-xs font-medium ${
              isActive
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            <span
              className={`mr-1.5 inline-block size-1.5 rounded-full ${
                isActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            {service.status}
          </Badge>

          {/* Avg Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="size-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-foreground">
              {ratingNum > 0 ? ratingNum.toFixed(1) : "New"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-border/50 hidden sm:block" />

          {/* Total Bookings */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarCheck2 className="size-3.5 text-primary" />
            <span>
              <strong className="text-foreground">{totalBookings}</strong>{" "}
              booking{totalBookings !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Total Reviews */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MessageSquare className="size-3.5 text-primary" />
            <span>
              <strong className="text-foreground">{totalReviews}</strong> review
              {totalReviews !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Price – pushed to the right */}
          <div className="ml-auto flex items-center gap-1 text-xs">
            <DollarSign className="size-3.5 text-primary" />
            <span className="text-xl font-extrabold text-foreground">
              {service.price ? service.price.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Service hero */}
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {service.title}
              </h1>

              {service.location && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>{service.location}</span>
                </div>
              )}

              {service.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              )}
            </div>

            {/* Reviews */}
            <ServiceReviewList
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
          </div>

          {/* ── RIGHT COLUMN ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-4 lg:sticky lg:top-8">
            {/* Technician Details */}
            {technician && <TechnicianDetails technician={technician} />}

            {/* Book Now CTA */}
            <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  Service Price
                </span>
                <span className="text-2xl font-extrabold text-foreground">
                  ${service.price ? service.price.toFixed(2) : "0.00"}
                </span>
              </div>

              <BookServiceButton
                serviceId={service.id}
                technicianId={technicianId ?? ""}
                serviceTitle={service.title}
                servicePrice={service.price ?? 0}
                serviceLocation={service.location}
                isActive={isActive}
              />

              {!isActive && (
                <p className="text-[11px] text-center text-muted-foreground">
                  This service is currently unavailable for booking.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
