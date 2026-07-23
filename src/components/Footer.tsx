import Link from "next/link";
import Logo from "./Logo";
import { NAV, SITE } from "@/lib/site";

const GUIDE_LINKS = [
  { label: "What is the sardine run?", href: "/guides/what-is-the-sardine-run" },
  { label: "Season & dates", href: "/guides/sardine-run-season-dates" },
  { label: "Where to see it", href: "/guides/where-to-see-the-sardine-run" },
  { label: "Marine life", href: "/guides/sardine-run-marine-life" },
  { label: "Packing list", href: "/guides/sardine-run-packing-list" },
  { label: "Snorkelers & non-divers", href: "/guides/sardine-run-without-scuba" },
  { label: "All guides", href: "/guides" },
];

export default function Footer() {
  return (
    // relative + z-index gives the footer its own stacking context so it always
    // sits above any position:fixed decorative layers earlier in the page (e.g.
    // the cinematic hero's background stage), even if one is ever added without
    // pointer-events-none. Unpositioned elements would otherwise still be
    // click-through-able underneath any positioned sibling regardless of DOM order.
    <footer className="relative z-30 border-t border-white/10 bg-abyss-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-white">
              <Logo className="h-10 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-abyss-200">
              Seven-day sardine run expeditions from Chintsa, East London, by the team behind{" "}
              <a
                href={SITE.sisterCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean-400 hover:text-coral-400"
              >
                Offshore Adventures
              </a>
              , Plettenberg Bay.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-abyss-200 transition hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-abyss-200 transition hover:text-white">
                  Contact & bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Field guides</h3>
            <ul className="mt-4 space-y-2.5">
              {GUIDE_LINKS.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-sm text-abyss-200 transition hover:text-white">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-abyss-200">
              <li>
                <a href={SITE.phoneHref} className="transition hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  WhatsApp us
                </a>
              </li>
              <li className="pt-2 text-abyss-300">
                Chintsa East, Eastern Cape
                <br />
                South Africa
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-abyss-300 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Season runs {SITE.season}. Sea days are weather-dependent. That&apos;s the Wild Coast.
          </p>
          <div className="flex gap-5">
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Facebook
            </a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
