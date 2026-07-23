import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollHero from "@/components/ScrollHero";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { faqSchema, tripSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sardine Run South Africa 2027 | Expeditions from Chintsa, East London",
  description:
    "Join the sardine run, the greatest shoal on Earth. 7-day expeditions from Chintsa, East London: first to the shoals, 40 minutes from the airport, snorkelers welcome. Enquire for 2027.",
  alternates: { canonical: "/" },
};

const HOME_FAQS = [
  {
    q: "When is the sardine run?",
    a: "May to July each year. The action starts in the south, on the Gqeberha to East London stretch (our home water), in May and June, then moves north to Port St Johns through July. See our [season and dates guide](/guides/sardine-run-season-dates) for the month-by-month picture.",
  },
  {
    q: "Do I need to be a scuba diver?",
    a: "No. Most of the sardine run happens at or near the surface, and snorkelers often see more than divers because bait balls move fast. Scuba is used on stable bait balls at the skipper's discretion. Non-swimmers can experience the whole event from the boat.",
  },
  {
    q: "Why run from Chintsa instead of Port St Johns?",
    a: "The shoals pass our stretch of coast first, in the early season, while the big fleet is still waiting up north. We launch off Chintsa beach, 40 minutes from King Phalo Airport with daily direct flights from Johannesburg and Cape Town. Fewer boats, earlier action, easier travel.",
  },
  {
    q: "Are sightings guaranteed?",
    a: "No honest operator guarantees bait balls. This is a wild migration driven by water temperature and wind. What we can say: dolphins, whales and gannets are seen on most sea days in season, and five sea days gives the run every chance to deliver.",
  },
  {
    q: "How much does it cost?",
    a: "2027 pricing is being finalised. Comparable 7-day Wild Coast expeditions run roughly R38,000 to R53,000 per person sharing. [Enquire now](/contact) for the launch rate; early enquiries get first pick of peak weeks. Full market breakdown in our [price guide](/guides/sardine-run-cost).",
  },
  {
    q: "How fit do I need to be?",
    a: "Moderately: 6 to 8 hours a day on a RIB, quick entries and exits, and the strength to climb back aboard. If you can swim confidently in open water, you can do this. Our [preparation guide](/guides/sardine-run-fitness-preparation) has an 8-week plan.",
  },
];

const SPECIES = [
  { img: "/images/dolphins-hunt.webp", name: "Common dolphins", note: "Super-pods thousands strong, the bait-ball architects", likelihood: "Most sea days" },
  { img: "/images/gannets-dive.webp", name: "Cape gannets", note: "Hit the water from 30 metres like white arrows", likelihood: "Most sea days" },
  { img: "/images/brydes-whale.webp", name: "Bryde's whales", note: "The bait-ball freight train, mouth first", likelihood: "Regular" },
  { img: "/images/humpback-breach.webp", name: "Humpback whales", note: "Migrating north alongside the run", likelihood: "Almost daily" },
  { img: "/images/copper-shark.webp", name: "Copper sharks", note: "The signature shark of the run", likelihood: "Regular" },
  { img: "/images/cape-fur-seal.webp", name: "Cape fur seals", note: "Fast, curious, everywhere the fish are", likelihood: "Regular" },
];

const DAY_TIMELINE = [
  { time: "05:45", what: "Coffee on the deck, kit check, sea briefing" },
  { time: "06:30", what: "Beach launch into first light" },
  { time: "07:00", what: "Reading the signs: gannet lines, dolphin runs, whale blows" },
  { time: "09:00", what: "On the fish: snorkel entries when the ball sets up" },
  { time: "13:00", what: "Lunch on the water, following the action" },
  { time: "15:00", what: "Last drops, then home through the swell" },
  { time: "18:30", what: "Fire, food, and the day's footage" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={[tripSchema(), faqSchema(HOME_FAQS)]} />

      <ScrollHero />

      {/* Everything below scrolls over the fixed hero stage */}
      <div className="relative z-30 bg-abyss-950">
        {/* Positioning strip */}
        <section className="border-b border-white/10 bg-abyss-900/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              ["7 days", "5 sea days chasing the run"],
              ["40 min", "from King Phalo Airport, East London"],
              ["First", "the shoals reach our coast before the fleet"],
              ["Snorkel-first", "no dive certification required"],
            ].map(([big, small]) => (
              <div key={big} className="p-4 text-center lg:p-6">
                <p className="font-display text-3xl font-extrabold text-coral-400 lg:text-4xl">{big}</p>
                <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-5 text-abyss-100">{small}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Chintsa */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Why Chintsa</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                See the run first, before the fleet follows it north
              </h2>
              <div className="prose-dark mt-6 space-y-4">
                <p>
                  Every winter the sardines move up the coast from the Agulhas Bank, and the southern Wild Coast gets them
                  first. While the boats crowd Port St Johns waiting for mid-season, the early shoals are already off
                  our beach, with the dolphins, gannets and whales working them.
                </p>
                <p>
                  Chintsa is the easiest sardine run base in the country to reach: fly direct from Johannesburg or Cape Town
                  to King Phalo Airport and you&apos;re at the lodge 40 minutes later. No connecting flights to Mthatha, no
                  five-hour transfers.
                </p>
                <p>
                  And we&apos;re not new to this. Sardine Run Africa is built by the crew behind{" "}
                  <a href={SITE.sisterCompany.url} target="_blank" rel="noopener noreferrer">
                    Offshore Adventures
                  </a>{" "}
                  in Plettenberg Bay: thousands of ocean safaris, seal swims and sardine run charters over the years,
                  with Blue Flag status and an NSRI partnership to show for it.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/guides/sardine-run-east-london-chintsa"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
                >
                  Why the southern Wild Coast wins
                </Link>
                <Link
                  href="/packages"
                  className="rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-600"
                >
                  The 7-day expedition
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image src="/images/chintsa-aerial.webp" alt="Aerial view of Chintsa beach and lagoon on the Wild Coast" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-abyss-900 p-5 shadow-2xl sm:block">
                <p className="font-display text-sm font-semibold text-white">Chintsa, Eastern Cape</p>
                <p className="mt-1 text-xs text-abyss-200">32.84°S, where the Wild Coast begins</p>
              </div>
            </div>
          </div>
        </section>

        {/* Marine life */}
        <section className="border-y border-white/10 bg-abyss-900/40 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">The cast</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Every predator in the book, on one migration
                </h2>
                <p className="mt-4 text-lg leading-8 text-abyss-100">
                  The run isn&apos;t about sardines. It&apos;s about what the sardines bring.
                </p>
              </div>
              <Link href="/guides/sardine-run-marine-life" className="font-semibold text-ocean-400 transition hover:text-coral-400">
                Full species guide →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SPECIES.map((s) => (
                <div key={s.name} className="group overflow-hidden rounded-2xl border border-white/10 bg-abyss-950/60">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={s.img} alt={s.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute right-3 top-3 rounded-full bg-abyss-950/80 px-3 py-1 text-xs font-semibold text-ocean-300 backdrop-blur-sm">
                      {s.likelihood}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-white">{s.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-abyss-100">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A sea day */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image src="/images/rib-launch.webp" alt="Expedition RIB launching through the surf at dawn" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">A sea day</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Dark start. Silver morning.
              </h2>
              <ol className="mt-8 space-y-0 border-l border-white/15">
                {DAY_TIMELINE.map((d) => (
                  <li key={d.time} className="relative pb-6 pl-8 last:pb-0">
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-coral-500" />
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ocean-400">{d.time}</p>
                    <p className="mt-1 leading-7 text-abyss-50">{d.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Guides teaser */}
        <section className="border-y border-white/10 bg-abyss-900/40 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Do your homework</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">The sardine run, explained properly</h2>
              </div>
              <Link href="/guides" className="font-semibold text-ocean-400 transition hover:text-coral-400">
                All 18 field guides →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { href: "/guides/what-is-the-sardine-run", img: "/images/hero-baitball.webp", eyebrow: "Start here", title: "What is the sardine run? The greatest shoal on Earth, explained" },
                { href: "/guides/sardine-run-season-dates", img: "/images/dolphins-surface.webp", eyebrow: "Timing", title: "When to go: season, dates and the honest odds, month by month" },
                { href: "/guides/where-to-see-the-sardine-run", img: "/images/wild-coast-aerial.webp", eyebrow: "Locations", title: "Where to see it: Wild Coast vs Durban vs KZN, compared" },
              ].map((g) => (
                <Link key={g.href} href={g.href} className="group overflow-hidden rounded-2xl border border-white/10 bg-abyss-950/60 transition hover:border-white/25">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={g.img} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-coral-400">{g.eyebrow}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white group-hover:text-ocean-300">{g.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Straight answers</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Questions everyone asks</h2>
          </div>
          <div className="mt-10">
            <FaqAccordion faqs={HOME_FAQS} />
          </div>
          <p className="mt-6 text-center text-abyss-200">
            Twenty-five more answered in the{" "}
            <Link href="/guides/sardine-run-faq" className="text-ocean-400 underline underline-offset-4 hover:text-coral-400">
              full FAQ
            </Link>
            .
          </p>
        </section>

        <CtaBand
          heading="2027 weeks open soon. Get in first"
          body="Tell us your preferred window and group size. Early enquiries get first pick of the peak weeks and the launch rate when pricing is confirmed."
        />
      </div>
    </>
  );
}
