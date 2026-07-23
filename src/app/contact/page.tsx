import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enquire About the 2027 Sardine Run | Bookings & Contact",
  description:
    "Request 2027 sardine run availability from Chintsa, East London. Tell us your week and group size — we reply within one working day. WhatsApp and phone welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
        <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">2027 season</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">Get your week on the water</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-abyss-100">
              Tell us when you want to come and who&apos;s coming with you. We&apos;ll reply within one working day with
              availability, the launch rate and a straight answer about what your window usually delivers.
            </p>
            <div className="mt-10 max-w-2xl">
              <EnquiryForm />
            </div>
          </div>

          <aside className="space-y-6 lg:pt-24">
            <div className="rounded-3xl border border-white/10 bg-abyss-900/60 p-7">
              <h2 className="font-display text-lg font-bold text-white">Prefer to talk?</h2>
              <ul className="mt-4 space-y-4 text-abyss-100">
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-abyss-300">WhatsApp (fastest)</p>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-white hover:text-coral-400">
                    Message the bookings desk
                  </a>
                </li>
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-abyss-300">Phone</p>
                  <a href={SITE.phoneHref} className="mt-1 block font-semibold text-white hover:text-coral-400">
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-abyss-300">Email</p>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block font-semibold text-white hover:text-coral-400">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-abyss-300">Base</p>
                  <p className="mt-1 text-white">Chintsa East, Eastern Cape, South Africa</p>
                  <p className="text-sm text-abyss-200">40 min from King Phalo Airport (ELS)</p>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-ocean-500/25 bg-ocean-500/[0.06] p-7">
              <h2 className="font-display text-lg font-bold text-white">Good to know</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-abyss-100">
                <li>Boats carry small groups — peak weeks (mid to late June) go first.</li>
                <li>No payment at enquiry. A deposit only locks your week once you confirm.</li>
                <li>International guests: we quote in USD too, and help with flight timing into ELS.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
