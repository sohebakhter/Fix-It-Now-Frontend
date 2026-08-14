"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Construction,
  Hammer,
  House,
  Paintbrush,
  Sparkles,
  Wrench,
} from "lucide-react";

const categories = [
  { icon: House, label: "Home service" },
  { icon: Wrench, label: "Repair" },
  { icon: Construction, label: "Electrical" },
  { icon: Paintbrush, label: "Painting" },
  { icon: Sparkles, label: "Cleaning" },
  { icon: Hammer, label: "Plumber" },
];

const marqueeItems = [...categories, ...categories];

export function CategoryStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-6 rounded-[28px] bg-[#f5f7fb] p-4 shadow-sm md:p-5">
      <div className="overflow-hidden rounded-[22px]">
        <motion.div
          className="flex w-max items-center gap-3"
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 24,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {marqueeItems.map(({ icon: Icon, label }, index) => (
            <div
              key={`${label}-${index}`}
              className="flex min-w-45 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:min-w-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 ring-1 ring-sky-100">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
