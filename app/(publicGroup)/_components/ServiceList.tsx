import { IService, IServiceQuery } from "@/lib/types";
import { getServices } from "../_actions/publicActions";
import { ServiceCard } from "./ServiceCard";
import { SearchX, Wrench } from "lucide-react";
import { ServicePagination } from "./ServicePagination";
import { getMe } from "@/service/getMe";

type ServiceListProps = {
  query?: IServiceQuery;
};

export default async function ServiceList({ query = {} }: ServiceListProps) {
  const result = await getServices(query);
  const page = Number(query.page ?? "1");
  const limit = Number(query.limit ?? "10");

  const services: IService[] = Array.isArray(result?.data) ? result.data : [];
  const hasNext = services.length === limit;

  const user = await getMe();
  const isAdmin = user?.data?.role === "ADMIN";

  if (!result?.success || !services.length) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center shadow-xs">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
            <SearchX className="size-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No services found
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            We couldn&apos;t find any services matching your current filters or
            search criteria. Try adjusting your search term or clearing filters.
          </p>
        </div>
        <ServicePagination page={page} hasNext={hasNext} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header bar showing count */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Wrench className="size-3.5 text-primary" />
          <span>Showing {services.length} services</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          Page {page}
        </span>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service: IService) => (
          <ServiceCard key={service.id} service={service} isAdmin={isAdmin} />
        ))}
      </div>

      {/* Pagination controls */}
      <ServicePagination page={page} hasNext={hasNext} />
    </div>
  );
}
