import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us: The Crew Behind Sardine Run Africa",
  description:
    "Sardine Run Africa is the Wild Coast expedition arm of Offshore Adventures, Plettenberg Bay — Blue Flag operators, NSRI partners, and thousands of ocean safaris deep. Meet the crew.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Sea time over sales talk",
    body: "The run can't be guaranteed, so we don't. We sell what we control: launches at first light, five sea days a week, and a crew that reads water for a living.",
  },
  {
    title: "Small boats, small groups",
    body: "Bait balls rarely last ten minutes. Small fast boats with few guests get you in the water while it's happening, not queuing behind another operator.",
  },
  {
    title: "The ocean comes first",
    body: "Our Plettenberg Bay operation holds WESSA Blue Flag status, partners with the NSRI, supports seal rehabilitation and sits on the Plett Hope Spot committee. The same rules travel with us to the Wild Coast: wildlife sets the terms of every encounter.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="relative flex min-h-[56vh] items-end overflow-hidden pt-24">
        <Image src="/images/beach-briefing.webp" alt="Guests in wetsuits at a dawn briefing beside the expedition boat on Chintsa beach" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/45 to-abyss-950/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">Who we are</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Built by people who work on the ocean every day
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose-dark space-y-5 text-lg">
          <p>
            Sardine Run Africa is the new Wild Coast expedition arm of{" "}
            <a href={SITE.sisterCompany.url} target="_blank" rel="noopener noreferrer">
              Offshore Adventures
            </a>
            , the Plettenberg Bay operation known for its seal swims, ocean safaris and marine research work. For years we
            ran seasonal sardine run charters alongside the Plett business; guests kept telling us the same thing on the way
            home — <strong>this deserves its own operation, closer to the early fish.</strong>
          </p>
          <p>
            So we built one. Chintsa gives us what Plett taught us to value: a protected beach launch, honest access to the
            early-season shoals, and a coastline that hasn&apos;t been queued up by a fleet. King Phalo Airport is 40 minutes
            away, which means guests step off a morning flight from Johannesburg and watch the sunset from the lodge deck
            the same day.
          </p>
          <p>
            The operating standards come with us: SAMSA-certified skippers, oxygen and first aid on board, briefings that
            treat you like an adult, and a hard rule that the animals decide how close the encounter gets. That approach
            earned the Plett operation three consecutive years of WESSA Blue Flag status, an NSRI partnership, and a seat on
            the Plett Hope Spot committee.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-abyss-900/50 p-6">
              <h2 className="font-display text-lg font-bold text-white">{v.title}</h2>
              <p className="mt-3 text-sm leading-6 text-abyss-100">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10">
          <div className="relative aspect-[16/9]">
            <Image src="/images/lodge-dawn.webp" alt="Dawn coffee on the lodge deck at Chintsa before a sea day" fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
          <div className="bg-abyss-900 p-6">
            <p className="text-sm leading-7 text-abyss-100">
              Expedition mornings start here: coffee at 05:45, forecast on the table, wetsuits already on the rail. If
              that sounds like your kind of week, <Link href="/contact" className="text-ocean-400 underline underline-offset-4">come find out</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand heading="Come meet the crew on the water" body="Seven days in Chintsa, five of them at sea. Enquire for 2027 and we'll take it from there." />
    </>
  );
}
