import { ArrowRight, Play, Search, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const quickServices = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Cleaning",
  "HVAC",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden rounded-[32px] bg-linear-to-r from-[#dfeaff] via-[#d5e4ff] to-[#cfe3ff] p-5 shadow-[0_20px_60px_rgba(100,116,139,0.08)] md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm text-sky-600">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <span className="text-sm font-medium text-slate-700">
              Trusted by 12k+ homeowners
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-6xl">
              Connect with reliable professionals home service.
            </h1>
            <p className="max-w-xl text-base text-slate-700 md:text-lg">
              Discover vetted experts for repairs, maintenance, cleaning, and
              improvements — all in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">
                Search for services
              </span>
            </div>
            <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
              <Link href={"/services"}>Book now</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white bg-white/60 text-slate-700"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch demo
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {quickServices.map((service) => (
              <Badge
                key={service}
                variant="outline"
                className="rounded-full border-white/70 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-115 items-center justify-center">
          <div className="absolute right-4 top-10 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute left-6 bottom-8 h-32 w-32 rounded-full bg-blue-200/60 blur-3xl" />

          <div className="relative w-full max-w-130 rounded-[32px] bg-linear-to-br from-white/80 to-sky-100/80 p-4 shadow-[0_30px_80px_rgba(90,120,170,0.18)] backdrop-blur-sm">
            <div className="rounded-[28px] bg-linear-to-br from-slate-900 via-sky-900 to-sky-700 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-sky-200">
                    Live availability
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">Top rated pros</h2>
                </div>
                <div className="rounded-full bg-white/10 p-3 text-sky-200">
                  <Star className="h-6 w-6 fill-current" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { name: "Nora", role: "Cleaner" },
                  { name: "Mark", role: "Plumber" },
                  { name: "Leah", role: "Electrician" },
                  { name: "David", role: "Painter" },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={`https://images.unsplash.com/${
                          person.name === "Nora"
                            ? "photo-1494790108377-be9c29b29330"
                            : person.name === "Mark"
                              ? "photo-1500648767791-00dcc994a43e"
                              : person.name === "Leah"
                                ? "photo-1544005313-94ddf0286df2"
                                : "photo-1506794778202-cad84cf45f1d"
                        }?auto=format&fit=crop&w=300&q=80`}
                        alt={person.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
                      />
                      <div>
                        <p className="text-sm font-semibold">{person.name}</p>
                        <p className="text-xs text-slate-300">{person.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
