import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sardine Run Gallery: Bait Balls, Dolphins, Whales & Gannets",
  description:
    "What the sardine run looks like from our side of the mask: bait balls, super-pods, diving gannets, Bryde's whales and the Wild Coast at first light.",
  alternates: { canonical: "/gallery" },
};

const SHOTS: { src: string; alt: string; caption: string; wide?: boolean }[] = [
  { src: "/images/hero-baitball.webp", alt: "Sardine bait ball with dolphins and diving gannets", caption: "The full show: dolphins, gannets and the ball", wide: true },
  { src: "/images/dolphins-hunt.webp", alt: "Common dolphins hunting sardines underwater", caption: "Common dolphins on the charge" },
  { src: "/images/gannets-dive.webp", alt: "Cape gannets diving underwater trailing bubbles", caption: "Gannet rain, seen from below" },
  { src: "/images/brydes-whale.webp", alt: "Bryde's whale lunge-feeding through a bait ball", caption: "A Bryde's whale takes its turn" },
  { src: "/images/shoal-shimmer.webp", alt: "Close-up wall of shimmering sardines", caption: "A wall of silver, moving as one", wide: true },
  { src: "/images/copper-shark.webp", alt: "Copper shark swimming through sardines", caption: "Copper shark, the run's signature escort" },
  { src: "/images/cape-fur-seal.webp", alt: "Cape fur seal darting through a sardine shoal", caption: "Cape fur seal, uninvited and unbothered" },
  { src: "/images/dolphins-surface.webp", alt: "Superpod of dolphins at the surface at dawn", caption: "The morning commute, Wild Coast style", wide: true },
  { src: "/images/humpback-breach.webp", alt: "Humpback whale breaching off the Wild Coast", caption: "Humpbacks pass through daily in season" },
  { src: "/images/orca.webp", alt: "Pair of orcas surfacing offshore", caption: "Some days the apex shows up too" },
  { src: "/images/spotter-view.webp", alt: "Sardine shoal seen from the spotter plane", caption: "The shoal from above — the spotter's view" },
  { src: "/images/rib-launch.webp", alt: "Expedition RIB launching at dawn", caption: "06:30, Chintsa beach. Office hours" },
  { src: "/images/photographer-uw.webp", alt: "Freediver photographing a distant bait ball", caption: "Working the ball on one breath" },
  { src: "/images/wild-coast-aerial.webp", alt: "Aerial view of the Wild Coast cliffs", caption: "The commute home", wide: true },
];

const CLEAN_SHOTS = SHOTS.filter((s) => s.alt);

export default function GalleryPage() {
  return (
    <>
      <div className="pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">From our side of the mask</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">The run, as you&apos;ll see it</h1>
            <p className="mt-5 text-lg leading-8 text-abyss-100">
              No stock clichés, no aquarium shots. This is the world the expedition takes you into — and the homepage
              film shows it in motion.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {CLEAN_SHOTS.map((s) => (
              <figure key={s.src} className={`group overflow-hidden rounded-2xl border border-white/10 ${s.wide ? "sm:col-span-2" : ""}`}>
                <div className={`relative ${s.wide ? "aspect-[2/1]" : "aspect-[4/3]"} overflow-hidden`}>
                  <Image src={s.src} alt={s.alt} fill sizes={s.wide ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="bg-abyss-900/80 px-5 py-3.5 text-sm text-abyss-100">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <CtaBand heading="Want these in your own camera roll?" body="Five sea days in peak season. Bring the housing — we'll find the fish." />
    </>
  );
}
