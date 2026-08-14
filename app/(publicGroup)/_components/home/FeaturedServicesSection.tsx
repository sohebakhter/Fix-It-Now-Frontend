import { ArrowUpRight, Clock3, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Tile & Grout Cleaning",
    name: "Alex Morgan",
    price: "$35.00",
    rating: 4.9,
    time: "1 hr",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Electrical Repair",
    name: "David Lee",
    price: "$49.00",
    rating: 4.8,
    time: "2 hrs",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Home Painting",
    name: "Meena Patel",
    price: "$64.00",
    rating: 5.0,
    time: "3 hrs",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Air Conditioning",
    name: "Robert Chen",
    price: "$72.00",
    rating: 4.9,
    time: "1.5 hrs",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
];

export function FeaturedServicesSection() {
  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Featured service
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter text-slate-900 md:text-4xl">
            Popular nearby services
          </h2>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-slate-200 bg-white px-4 text-slate-700"
        >
          <Link href={"/services"}>View all</Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map(({ title, name, price, rating, time, image }) => (
          <Card
            key={title}
            className="overflow-hidden border-0 bg-white p-0 shadow-sm ring-1 ring-slate-200/80"
          >
            <div className="relative h-60 overflow-hidden">
              <Image src={image} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent" />
              <div className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm">
                {rating}{" "}
                <Star className="ml-1 inline h-3 w-3 fill-current text-amber-400" />
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{name}</p>
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition hover:bg-sky-200">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">
                  {price}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" /> {time}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
