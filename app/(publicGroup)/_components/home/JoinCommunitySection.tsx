import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function JoinCommunitySection() {
  return (
    <section className="mt-10 rounded-[32px] bg-linear-to-r from-[#d9f0ff] via-[#d6ebff] to-[#c8ebff] p-8 text-center shadow-sm md:p-12">
      <h2 className="text-3xl font-bold tracking-tighter text-slate-900 md:text-5xl">
        Join our community of homeowners and experts
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-700">
        Access trusted local professionals, grow your service visibility, and
        simplify home care for everyone.
      </p>
      <Button className="mt-8 rounded-full bg-slate-900 px-8 text-white hover:bg-slate-800">
        <Link href={"/signup"}>Start now</Link>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </section>
  );
}
