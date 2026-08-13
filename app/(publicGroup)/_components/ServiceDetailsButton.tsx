"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type ServiceDetailsButtonProps = {
  serviceId: string;
};

export function ServiceDetailsButton({ serviceId }: ServiceDetailsButtonProps) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push(`/services/${serviceId}`)}
      className="gap-1.5 rounded-xl text-xs border-primary/30 text-primary hover:bg-primary/10 hover:text-primary transition-all"
    >
      <ExternalLink className="size-3.5" />
      <span>Details</span>
    </Button>
  );
}
