import { CheckCircle2, ClipboardCheck, Search, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Search for services",
    description: "Browse trusted local professionals by category, rating, and availability.",
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: "Browse local experts",
    description: "Compare pricing, reviews, and work history before making a decision.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Book your service",
    description: "Pick a time that works for you and confirm the job in just a few clicks.",
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "Enjoy your day",
    description: "An expert arrives ready, keeps you informed, and completes the work with care.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="mt-10 rounded-[32px] bg-[#f6f8fc] p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">How it works</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(({ id, icon: Icon, title, description }) => (
          <Card key={id} className="border-0 bg-white shadow-sm ring-1 ring-slate-200/80 hover:-translate-y-1 transition-transform">
            <CardContent className="p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">Step {id}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
