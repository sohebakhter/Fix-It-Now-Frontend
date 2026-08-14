import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const professionals = [
  {
    name: "Sofia",
    role: "Home care",
    rate: "$25/hr",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "James",
    role: "Painting",
    rate: "$40/hr",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
];

export function TopRatedProfessionalsSection() {
  return (
    <section className="mt-10 rounded-[32px] bg-linear-to-r from-[#dfeeff] via-[#d8ebff] to-[#cfe7ff] p-6 md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Top-rated professionals
          </p>
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 md:text-5xl">
            Explore top-rated professionals
          </h2>
          <p className="max-w-md text-base leading-7 text-slate-700">
            Hire skilled, reviewed experts for home upkeep, repairs, and
            improvements without the guesswork.
          </p>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
            Request now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {professionals.map(({ name, role, rate, image }) => (
            <div
              key={name}
              className="rounded-[28px] bg-white/70 p-3 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-sm"
            >
              <div className="overflow-hidden rounded-[22px]">
                <Image
                  src={image}
                  alt={name}
                  width={800}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-bold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-600">{role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold text-slate-700">
                      4.9
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">{rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
