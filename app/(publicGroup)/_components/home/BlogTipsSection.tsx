import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const tips = [
  {
    title: "Top 5 Essential Home Maintenance Tips for Every Season",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "How to Choose the Right Professional for Your Home Repairs",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Benefits of Regular Plumbing Inspections Prevent Major Issues",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  },
];

export function BlogTipsSection() {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tighter text-slate-900 md:text-4xl">
          Recent tips
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {tips.map(({ title, image }) => (
          <Card
            key={title}
            className="overflow-hidden border-0 bg-white p-0 shadow-sm ring-1 ring-slate-200/80"
          >
            <div className="relative h-60 overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                {title}
              </h3>
              <Button variant="link" className="mt-3 h-auto p-0 text-sky-700">
                Read more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
