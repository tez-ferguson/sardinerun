import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sardine Run Tracker: Where Are the Sardines Right Now?",
  description:
    "Live sardine run tracking: where the shoals are, current sea conditions and the latest sightings along the Wild Coast — updated through the May-July season from our boats and network.",
  alternates: { canonical: "/sardine-run-tracker" },
};

const TRACKER_FAQS = [
  {
    q: "Where is the sardine run currently?",
    a: "The 2026 season has wrapped up — the main body of fish passed through the Wild Coast in June and July, and the late remnants have dispersed north and offshore. This tracker goes live again as the first 2027 shoals appear off the Eastern Cape, typically in May.",
  },
  {
    q: "How do you know where the sardines are?",
    a: "During the season we combine our own sea days, spotter reports, the operator network up and down the coast, sea-surface temperature data and gannet behaviour. The birds always know first.",
  },
  {
    q: "How often is this page updated?",
    a: "In season (May-July): after every sea day. Out of season: monthly, with pre-season temperature outlooks from about March.",
  },
  {
    q: "Can the run be predicted in advance?",
    a: "Broad shape, yes; daily precision, no. The run needs inshore water below about 21°C, so cold-water pulses and wind direction move the fish day to day. That's why expeditions run five sea days — you fish the week, not the hour.",
  },
];

const PHASES = [
  { phase: "March – April", state: "Pre-season", note: "Watching Agulhas Bank temperatures and early bait reports from Gqeberha. Outlook posts begin." },
  { phase: "May", state: "Early season", note: "First pockets typically show off the southern Eastern Cape. Our water. Early expeditions launch." },
  { phase: "June", state: "Peak", note: "The main body moves through East London and Chintsa toward the Kei and beyond. Daily reports." },
  { phase: "July", state: "Late season", note: "Action concentrates north around Port St Johns and Mbotyi, tapering late in the month." },
  { phase: "August – February", state: "Off season", note: "The ocean rests. We publish the season report and open the next year's weeks." },
];

export default function TrackerPage() {
  return (
    <>
      <JsonLd data={faqSchema(TRACKER_FAQS)} />
      <header className="relative flex min-h-[56vh] items-end overflow-hidden pt-24">
        <Image src="/images/spotter-view.webp" alt="A sardine shoal seen from a spotter plane off the Wild Coast" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/45 to-abyss-950/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Tracker", href: "/sardine-run-tracker" }]} />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Field reports</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Where are the sardines right now?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-abyss-50">
            The honest answer, updated from the water. In season this page carries our latest sea-day reports and shoal
            positions; out of season, the outlook for the year ahead.
          </p>
        </div>
      </header>

      {/* Current status */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-coral-500/30 bg-coral-500/[0.06] p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-3 w-3 rounded-full bg-coral-400" />
            <p className="font-display text-sm font-bold uppercase tracking-wider text-coral-300">Season status · 23 July 2026</p>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-white">The 2026 run is winding down</h2>
          <p className="mt-3 max-w-3xl leading-8 text-abyss-50">
            The main pulses have passed through the Wild Coast and the late-season action has concentrated north of Port St
            Johns, tapering as the water warms. Our full{" "}
            <Link href="/guides/sardine-run-2026-season-report" className="text-ocean-400 underline underline-offset-4">
              2026 season report
            </Link>{" "}
            breaks down how the year unfolded. This tracker goes live again for 2027 as the first cold-water pulses arrive —
            typically May.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/sardine-run-2027" className="rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-600">
              Plan for 2027 instead
            </Link>
            <Link href="/guides/sardine-run-season-dates" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60">
              How the season works
            </Link>
          </div>
        </div>

        {/* Season rhythm */}
        <h2 className="mt-16 font-display text-3xl font-extrabold text-white">The tracker year</h2>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {PHASES.map((p, i) => (
            <div key={p.phase} className={`grid gap-2 p-6 sm:grid-cols-[160px_130px_1fr] sm:items-center ${i % 2 ? "bg-abyss-900/40" : "bg-abyss-950/40"}`}>
              <p className="font-display font-bold text-white">{p.phase}</p>
              <span className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${p.state === "Peak" ? "bg-coral-500/20 text-coral-300" : p.state === "Off season" ? "bg-white/10 text-abyss-200" : "bg-ocean-500/15 text-ocean-300"}`}>
                {p.state}
              </span>
              <p className="leading-7 text-abyss-100">{p.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-abyss-900/50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-white">Get the 2027 reports first</h2>
          <p className="mx-auto mt-2 max-w-xl text-abyss-100">
            Enquire for 2027 and we&apos;ll keep you on the pre-season list — temperature outlooks from March, first-shoal
            alerts in May.
          </p>
          <Link href="/contact" className="mt-5 inline-block rounded-full bg-coral-500 px-7 py-3.5 font-display font-semibold text-white transition hover:bg-coral-600">
            Join the list
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
