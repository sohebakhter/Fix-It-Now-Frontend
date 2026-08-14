import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "12k+", label: "jobs completed" },
  { value: "4.9/5", label: "average rating" },
  { value: "24/7", label: "support response" },
  { value: "98%", label: "repeat customers" },
];

const strengths = [
  {
    icon: Wrench,
    title: "Skilled professionals",
    text: "Certified technicians and vetted specialists for every job, from quick fixes to full installations.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    text: "Clear quotes, no hidden fees, and honest recommendations tailored to your needs.",
  },
  {
    icon: Clock3,
    title: "Fast scheduling",
    text: "Flexible service windows and dependable arrival times designed around your routine.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-first care",
    text: "Friendly support, respectful service, and practical solutions that keep your home running smoothly.",
  },
];

const steps = [
  "Tell us what you need",
  "Get a clear quote and timeline",
  "Approve the work and relax",
];

export default function AboutPage() {
  return (
    <main className="px-4 pb-2">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm md:p-10">
        <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute left-0 top-12 h-24 w-24 rounded-full bg-indigo-200/60 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Badge className="mb-4 border-sky-200 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Trusted neighborhood service experts
            </Badge>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Fixing life’s little problems with big care.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              At FixItNow, we make everyday home and business upkeep simple.
              From fast repairs to premium maintenance, we connect people with
              dependable professionals who show up ready to solve the problem.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-5">
                <Link href="/services">Explore services</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-5"
              >
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="border-slate-200 bg-white/80 p-2 shadow-xl backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-sky-200">
                        Service promise
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        We make it right.
                      </h2>
                    </div>
                    <div className="rounded-full bg-sky-500/20 p-3 text-sky-300">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Vetted and qualified professionals",
                      "Clear communication from booking to finish",
                      "Work backed by quality and accountability",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                      >
                        <div className="mt-0.5 rounded-full bg-emerald-400/20 p-1 text-emerald-300">
                          <BadgeCheck className="h-4 w-4" />
                        </div>
                        <p className="text-sm text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card/80 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-7 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600">
            Why people choose us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Thoughtful service built around trust.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {strengths.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="h-full border-border bg-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-border bg-slate-900 p-8 text-white shadow-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-300">
            Our process
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Simple, clear, and stress-free.
          </h2>

          <div className="mt-8 space-y-5">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-300">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <p className="font-medium text-white">{step}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {index === 0 &&
                      "Share your request and let us understand the job scope."}
                    {index === 1 &&
                      "Receive a transparent estimate and recommended next steps."}
                    {index === 2 &&
                      "Enjoy expert execution and ongoing support when you need it."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-white shadow-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-600">
                Our mission
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Better service, better peace of mind.
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We help homeowners and businesses stay protected, productive,
                and comfortable by making essential services easier to access,
                easier to understand, and easier to trust.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-linear-to-r from-sky-50 to-indigo-50 shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
                  Need a fresh start?
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Let’s find the right fix.
                </h3>
              </div>
              <Button asChild className="rounded-full px-5">
                <Link href="/contact">
                  Book a consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600">
              Customer experience
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Real results with a human touch.
            </h2>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2 text-amber-700">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-1 text-sm font-medium">
              Rated by local customers
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
