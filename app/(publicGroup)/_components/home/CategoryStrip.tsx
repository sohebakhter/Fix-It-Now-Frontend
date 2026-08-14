import { Construction, Hammer, House, Paintbrush, Sparkles, Wrench } from "lucide-react";

const categories = [
  { icon: House, label: "Home service" },
  { icon: Wrench, label: "Repair" },
  { icon: Construction, label: "Electrical" },
  { icon: Paintbrush, label: "Painting" },
  { icon: Sparkles, label: "Cleaning" },
  { icon: Hammer, label: "Plumber" },
];

export function CategoryStrip() {
  return (
    <section className="mt-6 rounded-[28px] bg-[#f5f7fb] p-4 shadow-sm md:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
