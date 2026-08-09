import { Suspense } from "react";
import type { IServiceQuery } from "@/lib/types";
import { ServiceFilterSidebar } from "../_components/ServiceFilterSidebar";
import ServiceList from "../_components/ServiceList";
import { ServiceListSkeleton } from "../_components/ServiceListSkeleton";
import { ServiceSearchBar } from "../_components/ServiceSearchBar";

export const instant = false;

type ServicesPageProps = {
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

const ServicesPage = async ({ searchParams }: ServicesPageProps) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query: IServiceQuery = {};

  if (resolvedSearchParams) {
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
      if (typeof value === "string") {
        query[key as keyof IServiceQuery] = value;
      } else if (Array.isArray(value) && value.length) {
        query[key as keyof IServiceQuery] = value[0];
      }
    });
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header section with Title on left & Top Search Bar on right */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Services Marketplace
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Discover, filter, and book certified repair and maintenance
              services.
            </p>
          </div>

          <ServiceSearchBar query={query} />
        </div>

        {/* Main 2-column layout: Left Filter Sidebar & Right Service Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <ServiceFilterSidebar query={query} />

          <main className="flex-1 w-full min-w-0">
            <Suspense
              key={JSON.stringify(query)}
              fallback={<ServiceListSkeleton />}
            >
              <ServiceList query={query} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
