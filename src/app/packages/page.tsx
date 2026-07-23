import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqSchema, tripSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "7-Day Sardine Run Expedition Packages 2027 | Chintsa, East London",
  description:
    "The 2027 sardine run expedition: 7 days, 5 sea days from Chintsa. Lodge, meals, airport transfers and small-group boats included. Snorkelers welcome. Enquire for the launch rate.",
  alternates: { canonical: "/packages" },
};

const ITINERARY = [
  { day: "Day 1", title: "Arrive Chintsa", body: "Land at King Phalo Airport (direct from Johannesburg or Cape Town), 40-minute transfer to the lodge. Kit fitting, safety briefing, sunset on the beach and the plan for first light." },
  { day: "Day 2", title: "Sea day one", body: "Beach launch at dawn. We learn the water together: reading gannet lines, working with the spotters, first drops on dolphins and whatever the ocean opens with." },
  { day: "Day 3", title: "Sea day two", body: "Full day on the run. The pattern from day one sharpens: where the bait is holding, where the birds are stacking, where tomorrow starts." },
  { day: "Day 4", title: "Sea day three", body: "Mid-expedition. By now the crew knows your comfort in the water and pushes the encounters as far as conditions allow." },
  { day: "Day 5", title: "Sea day four", body: "The odds compound: more hours on the water is the only honest strategy on a wild migration, and this is where multi-day guests get paid." },
  { day: "Day 6", title: "Sea day five", body: "Last launch. If the week has been generous, we chase the best of it one more time. If the ocean owes us, this is traditionally the day it settles up." },
  { day: "Day 7", title: "Depart", body: "Slow breakfast, footage swap, transfer to King Phalo for your flight home. Most guests book next season before they board." },
];

const INCLUDED = [
  "6 nights' lodge accommodation in Chintsa (sea-facing, twin share)",
  "All meals: cooked breakfasts, boat lunch packs, dinners",
  "5 guided sea days on a small-group expedition RIB",
  "Skipper, dive guide and surface support crew",
  "Wetsuits, masks, snorkels and fins if you need them",
  "Cylinders, weights and air for scuba drops (certified divers)",
  "Return King Phalo Airport transfers",
  "Daily land-based backup plan for blown-out days",
];

const EXCLUDED = [
  "Flights to East London (direct from JNB/CPT daily)",
  "Dive and travel insurance (DAN or equivalent, required)",
  "Alcoholic drinks and personal extras",
  "Gratuities for the crew",
  "Single-room supplement (limited rooms, on request)",
];

const PKG_FAQS = [
  {
    q: "What will the 2027 expedition cost?",
    a: "Final 2027 pricing is being confirmed. For honest context, comparable 7-day Wild Coast packages sold for R38,000-R53,000 per person sharing (about $2,100-$3,300) in 2026. See our [full price breakdown](/guides/sardine-run-cost). Enquire now and you'll get the launch rate before public release.",
  },
  {
    q: "How do deposits and payments work?",
    a: "A deposit secures your week, with the balance due 60 days before arrival, which is industry-standard for the run. We'll confirm exact terms with your quote, in ZAR or USD.",
  },
  {
    q: "What happens if the weather blows a sea day out?",
    a: "Winter fronts happen; no operator can refund the ocean. What we can do is plan properly: Chintsa has real land-day options (a private game reserve 20 minutes away, beach rides, hikes) and we shuffle the week aggressively around the forecast to protect your sea days.",
  },
  {
    q: "Can my non-diving partner come?",
    a: "Yes. The boat is a front-row seat: whales, super-pods and gannet rain are surface events. Partners can join sea days as boat-based guests or enjoy Chintsa on land; ask for partner rates in your enquiry.",
  },
  {
    q: "How many guests per boat?",
    a: "Small groups only. The run rewards fast, uncrowded boats. It's the difference between watching a bait ball and being in it. Exact boat numbers confirmed with your quote.",
  },
  {
    q: "Do I need scuba certification?",
    a: "No. Most encounters are snorkel and freedive at the surface, where the action is. Certified divers (Open Water with experience, or Advanced) can drop on stable bait balls when the skipper calls it. Read [the run without scuba](/guides/sardine-run-without-scuba).",
  },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={[tripSchema(), faqSchema(PKG_FAQS)]} />

      {/* Hero */}
      <header className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        <Image src="/images/hero-baitball.webp" alt="A sardine bait ball surrounded by dolphins and diving gannets" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/40 to-abyss-950/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "The Expedition", href: "/packages" }]} />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">The 2027 Expedition · May to July</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Seven days. Five launches. The greatest shoal on Earth.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-abyss-50">
            A full week structured around one goal: maximum hours on the water while the run passes our coast first.
            Lodge, meals, transfers and crew included. You bring a wetsuit-sized appetite for the wild.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-full bg-coral-500 px-8 py-4 text-center font-display font-semibold text-white shadow-xl shadow-coral-500/30 transition hover:bg-coral-600">
              Request 2027 availability
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-white/40 bg-abyss-950/30 px-8 py-4 text-center font-display font-semibold text-white backdrop-blur-sm transition hover:border-white/80">
              WhatsApp us
            </a>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section className="border-b border-white/10 bg-abyss-900/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-8 text-center sm:px-6 lg:grid-cols-5 lg:px-8">
          {[
            ["7 days", "6 nights"],
            ["5", "sea days"],
            ["May-Jul", "2027 season"],
            ["ELS", "40 min from airport"],
            ["ZAR/USD", "dual pricing"],
          ].map(([a, b]) => (
            <div key={a as string} className="p-3">
              <p className="font-display text-2xl font-extrabold text-white">{a}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-abyss-200">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Day by day</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Built around the water, not the brochure</h2>
          <p className="mt-4 text-lg leading-8 text-abyss-100">
            The run doesn&apos;t keep office hours. The week flexes with the forecast. This is the shape of it.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {ITINERARY.map((d, i) => (
            <div key={d.day} className={`rounded-2xl border border-white/10 bg-abyss-900/50 p-6 ${i === ITINERARY.length - 1 ? "lg:col-span-2 lg:max-w-[calc(50%-0.5rem)]" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-coral-500/15 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-coral-400">{d.day}</span>
                <h3 className="font-display text-lg font-bold text-white">{d.title}</h3>
              </div>
              <p className="mt-3 leading-7 text-abyss-100">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Included / excluded */}
      <section className="border-y border-white/10 bg-abyss-900/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-ocean-500/25 bg-abyss-950/60 p-8">
            <h2 className="font-display text-2xl font-bold text-white">What&apos;s included</h2>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((x) => (
                <li key={x} className="flex gap-3 leading-7 text-abyss-50">
                  <svg viewBox="0 0 24 24" className="mt-1.5 h-4 w-4 shrink-0 stroke-ocean-400" fill="none" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5 5L20 6.5" /></svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-abyss-950/60 p-8">
            <h2 className="font-display text-2xl font-bold text-white">What&apos;s not</h2>
            <ul className="mt-6 space-y-3">
              {EXCLUDED.map((x) => (
                <li key={x} className="flex gap-3 leading-7 text-abyss-100">
                  <svg viewBox="0 0 24 24" className="mt-1.5 h-4 w-4 shrink-0 stroke-abyss-300" fill="none" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-coral-500/25 bg-coral-500/[0.06] p-5">
              <p className="font-display font-semibold text-white">Honesty clause</p>
              <p className="mt-2 text-sm leading-6 text-abyss-100">
                Nobody can guarantee bait balls, and anyone who does is selling you weather. What we sell is time on the
                water, in the right place, earlier than the fleet, with a crew that has run these coasts for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">2027 pricing</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Launch rate: first enquiries, first served</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-abyss-100">
          We&apos;re finalising 2027 rates now. Comparable Wild Coast expeditions sold between{" "}
          <strong className="text-white">R38,000 and R53,000</strong> per person sharing in 2026. Our package will be
          priced to be the obvious value in that bracket, in ZAR or USD. Early enquiries lock the launch rate before
          public release and get first pick of peak weeks.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="rounded-full bg-coral-500 px-8 py-4 font-display font-semibold text-white shadow-xl shadow-coral-500/30 transition hover:bg-coral-600">
            Get the launch rate
          </Link>
          <Link href="/guides/sardine-run-cost" className="rounded-full border border-white/25 px-8 py-4 font-display font-semibold text-white transition hover:border-white/60">
            See the full market price guide
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="text-center font-display text-3xl font-extrabold text-white">Expedition questions</h2>
        <div className="mt-8">
          <FaqAccordion faqs={PKG_FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
