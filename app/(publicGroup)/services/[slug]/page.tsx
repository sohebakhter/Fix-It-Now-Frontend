import React, { Suspense } from "react";
import { ServiceDetailsContent } from "./_components/ServiceDetailsContent";


type ServiceDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center py-8">
          <span className="text-sm text-muted-foreground">Loading service...</span>
        </div>
      }
    >
      {/* ServiceDetailsContent is an async Server Component so it can stream */}
      <ServiceDetailsContent params={params} />
    </Suspense>
  );
}


