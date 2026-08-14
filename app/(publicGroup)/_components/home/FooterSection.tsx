import Link from "next/link";

const footerLinks = {
  Home: ["Commitment", "Service catalog", "Customer reviews"],
  Service: ["Plumbing", "Electrical", "Cleaning", "Painting"],
  "Get Support": ["Help center", "Contact us", "FAQ"],
  Company: ["About us", "Privacy policy", "Terms of use"],
};

export function FooterSection() {
  return (
    <footer className="mt-10 rounded-t-[32px] bg-[#f6f9ff] px-4 pb-6 pt-8 md:px-8">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-1">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-slate-900"
          >
            FIXITNOW
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Your trusted home service marketplace for repairs, cleaning, and
            maintenance.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {links.map((link) => (
                <li key={link}>
                  <Link href={"/"} className="transition hover:text-sky-700">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
        © 2026 FixItNow. All rights reserved.
      </div>
    </footer>
  );
}
