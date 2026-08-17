import { ArrowRight, BadgeCheck, MapPinned, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobileAppSection() {
  return (
    <section className="mt-10 rounded-[32px] bg-[#edf4ff] p-5 sm:p-6 md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Mobile app
          </p>
          <h2 className="text-2xl font-bold tracking-tighter text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
            Explore home service on the go.
          </h2>
          <p className="max-w-md text-base leading-7 text-slate-600">
            Manage bookings, review professionals, and track service progress
            from your phone with the same seamless experience.
          </p>

          <div className="space-y-4">
            {[
              "Instant access to trusted local experts",
              "See real ratings, availability, and price ranges",
              "Track your booking and get updates in real time",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-slate-200/70"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
            <Link href={"https://play.google.com"} target="_blank">
              Download app
            </Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative flex min-h-88 sm:min-h-104 lg:min-h-105 items-center justify-center overflow-hidden">
          <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-white/50 blur-3xl" />
          <div className="relative flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-140 items-center justify-center gap-3 sm:gap-5">
            <div className="flex-1 min-w-0 rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <div className="rounded-[24px] bg-slate-100 p-3">
                <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Home</span>
                  <span>9:41</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <p className="text-[10px] uppercase text-sky-600">
                      Popular
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Plumber
                    </p>
                  </div>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm"
                    >
                      <div className="h-8 w-8 rounded-full bg-sky-100" />
                      <div className="flex-1 px-2">
                        <div className="h-2 w-16 rounded-full bg-slate-200" />
                        <div className="mt-2 h-2 w-10 rounded-full bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <div className="rounded-[24px] bg-linear-to-br from-sky-50 to-indigo-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Review</p>
                    <p className="text-4xl font-bold text-slate-900">4.9</p>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-3 rounded-2xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                      <MapPinned className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Trusted pros
                      </p>
                      <p className="text-[10px] text-slate-500">Near you</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Customer rating</span>
                    <span className="font-semibold">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
