import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GUIDES } from "@/content/registry";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sardine Run Guides: Everything About the Greatest Shoal on Earth",
  description:
    "The most complete sardine run knowledge hub online: season dates, locations, marine life, packing lists, water conditions, photography and honest planning advice from the crew.",
  alternates: { canonical: "/guides" },
};

const FEATURED_SLUGS = [
  "what-is-the-sardine-run",
  "sardine-run-season-dates",
  "where-to-see-the-sardine-run",
];

const GROUPS: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: "Understand the run",
    blurb: "What it is, why it happens, and where the shoals actually go.",
    slugs: ["what-is-the-sardine-run", "why-does-the-sardine-run-happen", "sardine-run-route", "sardine-run-marine-life", "sardine-run-2026-season-report"],
  },
  {
    title: "Plan your expedition",
    blurb: "Dates, places, prices and the honest trade-offs between them.",
    slugs: ["sardine-run-season-dates", "where-to-see-the-sardine-run", "sardine-run-east-london-chintsa", "sardine-run-port-st-johns", "sardine-run-cost", "moalboal-vs-south-africa"],
  },
  {
    title: "Get ready for the water",
    blurb: "Kit, conditions, fitness and skills. Arrive prepared, leave with the story.",
    slugs: ["sardine-run-packing-list", "sardine-run-water-conditions", "sardine-run-fitness-preparation", "sardine-run-without-scuba", "sardine-run-photography"],
  },
  {
    title: "The practical stuff",
    blurb: "Local knowledge and every question we get asked, answered straight.",
    slugs: ["chintsa-travel-guide", "sardine-run-faq"],
  },
];

export default function GuidesIndex() {
  const bySlug = new Map(GUIDES.map((g) => [g.slug, g]));
  const featured = FEATURED_SLUGS.map((s) => bySlug.get(s)!).filter(Boolean);

  return (
    <div className="pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
        <div className="mt-8 max-w-3xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">The knowledge hub</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
            Everything about the sardine run
          </h1>
          <p className="mt-5 text-lg leading-8 text-abyss-100">
            Eighteen field guides written from the water, not from a desk: seasons, locations, species, kit, conditions and costs. Read what you need, then come see it from our boat.
          </p>
        </div>

        {/* Featured */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((g, i) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[16/10] lg:h-full lg:min-h-[480px]" : "aspect-[16/10]"}`}>
                <Image
                  src={g.heroImage.src}
                  alt={g.heroImage.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/95 via-abyss-950/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-coral-400">{g.eyebrow}</p>
                <h2 className={`mt-2 font-display font-bold leading-snug text-white ${i === 0 ? "text-2xl lg:text-3xl" : "text-lg"}`}>
                  {g.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-abyss-100">{g.metaDescription}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Groups */}
        <div className="mt-20 space-y-16 pb-20">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{group.title}</h2>
                  <p className="mt-1.5 text-abyss-200">{group.blurb}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.slugs.map((slug) => {
                  const g = bySlug.get(slug);
                  if (!g) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/guides/${slug}`}
                      className="group flex gap-4 rounded-2xl border border-white/10 bg-abyss-900/50 p-4 transition hover:border-white/25 hover:bg-abyss-900"
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                        <Image src={g.heroImage.src} alt="" fill sizes="112px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-coral-400">{g.eyebrow}</p>
                        <p className="mt-1 line-clamp-2 font-display text-[15px] font-semibold leading-snug text-white group-hover:text-ocean-300">
                          {g.title}
                        </p>
                        <p className="mt-1 text-xs text-abyss-300">{g.readingTime} min read</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </div>
  );
}
