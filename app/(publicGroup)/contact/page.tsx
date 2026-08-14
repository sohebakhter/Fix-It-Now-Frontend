import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactDetails = [
  {
    icon: Phone,
    title: "Call us",
    value: "+1 (415) 555-0148",
    text: "Speak with our support team from 8:00 AM to 6:00 PM.",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@fixitnow.com",
    text: "We typically reply within one business day.",
  },
  {
    icon: MapPin,
    title: "Visit us",
    value: "214 Harbor Avenue, Suite 300",
    text: "Serving homes and businesses across the metro area.",
  },
  {
    icon: Clock3,
    title: "Hours",
    value: "Mon - Sat: 8:00 AM - 6:00 PM",
    text: "Emergency requests are handled by our priority support line.",
  },
];

export default function ContactPage() {
  return (
    <main className="pb-20 pt-8 md:pt-12">
      <section className="rounded-[2rem] border border-border bg-linear-to-br from-slate-900 via-slate-900 to-sky-950 p-6 text-white shadow-xl md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <Badge className="mb-4 border-sky-700 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20">
              <MessageSquareText className="mr-1 h-3.5 w-3.5" />
              Lets get your project moving
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Contact the team that keeps things running smoothly.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Whether you need a quick repair, a scheduled service, or guidance on the right solution, we’re ready to help.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-sky-200">Fast response</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="rounded-full bg-sky-500/20 p-3 text-sky-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Priority support</p>
                <p className="text-xl font-semibold text-white">+1 (415) 555-0148</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-200">
              <span className="text-sm font-medium">Average reply time</span>
              <span className="text-lg font-semibold">Under 1 hour</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          {contactDetails.map(({ icon: Icon, title, value, text }) => (
            <Card key={title} className="border-border bg-card shadow-sm">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">{title}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-slate-900">Send a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6 pt-0">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Alex" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Morgan" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="alex@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" placeholder="Tell us about your project, timeline, and any questions you have." className="min-h-32" />
            </div>

            <Button className="w-full rounded-full md:w-auto" size="lg">
              Send message
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
