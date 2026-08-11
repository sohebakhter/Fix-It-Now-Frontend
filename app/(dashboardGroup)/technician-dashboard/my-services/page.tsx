import React, { Suspense } from "react";
import { ServicesList } from "./_components/ServicesList";
import { getMyServicesAction, getCategoriesAction } from "@/app/(dashboardGroup)/_actions/serviceActions";
import { ServicesListSkeleton } from "./_components/ServicesListSkeleton";

async function ServicesDataLoader() {
  const [servicesResponse, categoriesResponse] = await Promise.all([
    getMyServicesAction(),
    getCategoriesAction(),
  ]);

  const services = Array.isArray(servicesResponse?.data) ? servicesResponse.data : [];
  const categories = Array.isArray(categoriesResponse?.data) ? categoriesResponse.data : [];

  return <ServicesList initialServices={services} categories={categories} />;
}

export default function MyServicesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <Suspense fallback={<ServicesListSkeleton />}>
        <ServicesDataLoader />
      </Suspense>
    </div>
  );
}