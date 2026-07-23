import Link from "next/link";
import { SITE } from "@/lib/site";

export default function CtaBand({
  heading = "Ready for the 2027 run?",
  body = "Five sea days from Chintsa, 40 minutes from King Phalo Airport. Small boat, early launches, first crack at the shoals before the fleet follows them north.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-coral-600 via-coral-500 to-coral-400" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 15% 85%, rgba(5,23,36,0.55), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/90">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-full bg-abyss-950 px-8 py-4 font-display font-semibold text-white shadow-xl transition hover:bg-abyss-900 sm:w-auto"
          >
            Request availability
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border-2 border-white/70 px-8 py-4 font-display font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            WhatsApp the skipper&apos;s desk
          </a>
        </div>
        <p className="mt-5 text-sm text-white/75">Boats carry small groups only, and prime weeks go 6-12 months out.</p>
      </div>
    </section>
  );
}
