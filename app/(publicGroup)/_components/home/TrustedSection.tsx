import { ArrowRight, BadgeCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TrustedSection() {
  return (
    <section className="mt-10 rounded-[32px] bg-linear-to-r from-[#dfeeff] via-[#d7ebff] to-[#d1e9ff] p-6 md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-[28px] border border-sky-200 bg-white/70 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4 rounded-[22px] bg-slate-900 p-4 text-white">
            <div>
              <p className="text-sm text-sky-200">Trusted pro</p>
              <h3 className="mt-2 text-2xl font-bold">Andrew B.</h3>
            </div>
            <div className="rounded-full bg-sky-500/20 p-2 text-sky-300">
              <BadgeCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Mechanic</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                $35.00 / hr
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">4.9</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Why choose us
          </p>
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 md:text-5xl">
            Connect with trusted service providers.
          </h2>
          <p className="max-w-lg text-base leading-7 text-slate-700">
            Every professional is vetted, reviewed, and ready to deliver
            dependable service with transparent pricing and clear communication.
          </p>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
            <Link href={"/services"}>Get started</Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
