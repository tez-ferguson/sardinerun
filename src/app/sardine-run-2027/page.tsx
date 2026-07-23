import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqSchema, tripSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sardine Run 2027: Dates, Availability & Early Booking",
  description:
    "Sardine run 2027 dates and booking: the season runs May-July, with early action off East London and Chintsa from late May. Weekly 7-day departures. Early enquiries get the launch rate.",
  alternates: { canonical: "/sardine-run-2027" },
};

const WINDOWS = [
  ["Late May 2027", "The first shoals reach our water. Quietest boats of the whole season, moody light, big dolphin numbers scouting ahead of the main run.", "Open"],
  ["Early June 2027", "The run builds week on week. Gannet numbers stack up; whales are moving through in numbers.", "Open"],
  ["Mid June 2027", "Peak window begins on the southern Wild Coast. Historically the shoals passed the Bashee River around 8-9 June.", "Expected to fill first"],
  ["Late June 2027", "Peak continues. Bait-ball probability at its best as bigger pockets of fish hold on our stretch.", "Expected to fill first"],
  ["Early July 2027", "The main body moves north; strong action can persist locally. Sharper weather, dramatic seas.", "Open"],
];

const FAQS_2027 = [
  {
    q: "What are the sardine run 2027 dates?",
    a: "The 2027 season will run May to July, as it does every year. From our Chintsa base the prime booking window is late May to early July, with mid-to-late June the historical peak on the southern Wild Coast. Weekly 7-day expeditions depart throughout.",
  },
  {
    q: "When should I book for 2027?",
    a: "Now, honestly. Sardine run boats are small and the market's prime weeks sold out months ahead for 2026 across most operators. Early enquiries also lock our launch rate before public pricing.",
  },
  {
    q: "Is 2027 expected to be a good run?",
    a: "Nobody can promise a wild migration a year out. The run depends on winter water temperatures staying below about 21°C inshore. What you can control is the odds: five sea days, an early-season base the shoals reach first, and a crew that moves with the forecast.",
  },
  {
    q: "Can I hold a week without paying?",
    a: "An enquiry costs nothing and doesn't commit you. Once you confirm, a deposit locks the week and the balance follows 60 days before arrival.",
  },
  {
    q: "What happened in the 2026 season?",
    a: "Read our [2026 season report](/guides/sardine-run-2026-season-report) for the shape of the year and what it suggests for 2027.",
  },
];

export default function SardineRun2027() {
  return (
    <>
      <JsonLd data={[tripSchema(), faqSchema(FAQS_2027)]} />
      <header className="relative flex min-h-[62vh] items-end overflow-hidden pt-24">
        <Image src="/images/dolphins-surface.webp" alt="A superpod of common dolphins running at the surface off the Wild Coast" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/40 to-abyss-950/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Sardine Run 2027", href: "/sardine-run-2027" }]} />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Season planner</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Sardine Run 2027: dates &amp; early booking
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-abyss-50">
            May to July 2027. Weekly 7-day expeditions from Chintsa, where the shoals arrive before the fleet does.
            Boats are small and the best weeks go early; this page is updated as availability moves.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold text-white">The 2027 windows</h2>
        <p className="mt-3 max-w-2xl text-abyss-100">
          Every week is a 7-day package with 5 sea days. Here&apos;s how the season typically unfolds on our stretch of coast, and
          where each window stands.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {WINDOWS.map(([week, note, status], i) => (
            <div key={week} className={`flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:gap-6 ${i % 2 ? "bg-abyss-900/40" : "bg-abyss-950/40"}`}>
              <div className="sm:w-44 sm:shrink-0">
                <p className="font-display font-bold text-white">{week}</p>
                <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${status === "Open" ? "bg-ocean-500/15 text-ocean-300" : "bg-coral-500/15 text-coral-300"}`}>
                  {status}
                </span>
              </div>
              <p className="leading-7 text-abyss-100">{note}</p>
              <Link href="/contact" className="shrink-0 rounded-full border border-white/20 px-5 py-2 text-center text-sm font-semibold text-white transition hover:border-coral-400 hover:text-coral-300 sm:ml-auto">
                Enquire
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-abyss-300">
          Timing context comes from decades of run records. See the{" "}
          <Link href="/guides/sardine-run-season-dates" className="text-ocean-400 underline underline-offset-4">
            full season guide
          </Link>{" "}
          for the month-by-month evidence.
        </p>
      </section>

      <section className="border-y border-white/10 bg-abyss-900/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-extrabold text-white">2027 questions</h2>
          <div className="mt-8">
            <FaqAccordion faqs={FAQS_2027} />
          </div>
        </div>
      </section>

      <CtaBand heading="Lock a 2027 week before pricing goes public" body="Early enquiries get the launch rate and first pick of mid-June. No payment now, just your window and group size." />
    </>
  );
}
