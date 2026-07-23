import Image from "next/image";
import Link from "next/link";
import type { Guide, GuideSection } from "@/content/types";
import { rich, slugify } from "./rich";
import FaqAccordion from "./FaqAccordion";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import CtaBand from "./CtaBand";
import { articleSchema, faqSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

function CalloutIcon({ variant }: { variant: "tip" | "warning" | "info" }) {
  const cls = "h-5 w-5 shrink-0";
  if (variant === "warning")
    return (
      <svg viewBox="0 0 24 24" className={`${cls} stroke-coral-400`} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      </svg>
    );
  if (variant === "tip")
    return (
      <svg viewBox="0 0 24 24" className={`${cls} stroke-ocean-400`} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M9 18h6m-5 4h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={`${cls} stroke-abyss-300`} fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
  );
}

function SectionBlock({ s }: { s: GuideSection }) {
  const id = s.id ?? slugify(s.h2);
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{s.h2}</h2>
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="mt-5 leading-8 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-coral-400 [&_strong]:text-white">
          {rich(p)}
        </p>
      ))}
      {s.subsections?.map((sub, i) => (
        <div key={i} className="mt-8">
          <h3 className="font-display text-xl font-semibold text-white">{sub.h3}</h3>
          {sub.paragraphs.map((p, j) => (
            <p key={j} className="mt-4 leading-8 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-white">
              {rich(p)}
            </p>
          ))}
        </div>
      ))}
      {s.list && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-abyss-900/50 p-6">
          {s.list.title && <p className="mb-3 font-display font-semibold text-white">{s.list.title}</p>}
          {s.list.ordered ? (
            <ol className="list-decimal space-y-2.5 pl-5 marker:font-semibold marker:text-coral-400">
              {s.list.items.map((it, i) => (
                <li key={i} className="leading-7 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline [&_strong]:text-white">
                  {rich(it)}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="space-y-2.5">
              {s.list.items.map((it, i) => (
                <li key={i} className="flex gap-3 leading-7 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline [&_strong]:text-white">
                  <svg viewBox="0 0 24 24" className="mt-1.5 h-4 w-4 shrink-0 stroke-coral-400" fill="none" strokeWidth="3" strokeLinecap="round">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  <span>{rich(it)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {s.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            {s.table.caption && <caption className="bg-abyss-900 px-5 py-3 text-left font-display font-semibold text-white">{s.table.caption}</caption>}
            <thead>
              <tr className="bg-abyss-800/80">
                {s.table.header.map((h, i) => (
                  <th key={i} className="px-5 py-3.5 font-display font-semibold text-white">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 ? "bg-abyss-900/40" : "bg-abyss-950/40"}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-5 py-3.5 align-top leading-6 text-abyss-100 [&_strong]:text-white">
                      {rich(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.callout && (
        <div
          className={`mt-6 flex gap-4 rounded-2xl border p-6 ${
            s.callout.variant === "warning"
              ? "border-coral-500/30 bg-coral-500/[0.07]"
              : s.callout.variant === "tip"
                ? "border-ocean-500/30 bg-ocean-500/[0.07]"
                : "border-white/15 bg-white/[0.04]"
          }`}
        >
          <CalloutIcon variant={s.callout.variant} />
          <div>
            <p className="font-display font-semibold text-white">{s.callout.title}</p>
            <p className="mt-1.5 leading-7 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline">{rich(s.callout.body)}</p>
          </div>
        </div>
      )}
      {s.image && (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <Image src={s.image.src} alt={s.image.alt} width={1600} height={900} className="h-auto w-full" />
          {s.image.caption && <figcaption className="bg-abyss-900 px-5 py-3 text-sm text-abyss-200">{s.image.caption}</figcaption>}
        </figure>
      )}
    </section>
  );
}

export default function GuideArticle({ guide, related }: { guide: Guide; related: Guide[] }) {
  return (
    <article>
      <JsonLd
        data={[
          articleSchema({
            slug: guide.slug,
            title: guide.title,
            description: guide.metaDescription,
            image: guide.heroImage.src,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          }),
          ...(guide.faqs.length ? [faqSchema(guide.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden pt-24">
        <Image
          src={guide.heroImage.src}
          alt={guide.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/45 to-abyss-950/20" />
        <div className="relative mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Guides", href: "/guides" },
              { name: guide.title, href: `/guides/${guide.slug}` },
            ]}
          />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral-400">{guide.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-sm text-abyss-200">
            Updated {new Date(guide.dateModified).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })} · {guide.readingTime} min read · By the {SITE.name} crew
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Intro */}
        <div className="border-l-2 border-coral-500/60 py-10 pl-6 sm:pl-8">
          {guide.intro.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-8 text-abyss-50 first:mt-0 [&_a]:text-ocean-400 [&_a]:underline [&_strong]:text-white">
              {rich(p)}
            </p>
          ))}
        </div>

        {/* On this page */}
        <nav aria-label="On this page" className="mb-4 rounded-2xl border border-white/10 bg-abyss-900/50 p-6">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-abyss-200">On this page</p>
          <ol className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {guide.sections.map((s) => (
              <li key={s.h2}>
                <a href={`#${s.id ?? slugify(s.h2)}`} className="text-sm text-ocean-400 transition hover:text-coral-400">
                  {s.h2}
                </a>
              </li>
            ))}
            {guide.faqs.length > 0 && (
              <li>
                <a href="#faqs" className="text-sm text-ocean-400 transition hover:text-coral-400">
                  Frequently asked questions
                </a>
              </li>
            )}
          </ol>
        </nav>

        <div className="space-y-14 py-10">
          {guide.sections.map((s, i) => (
            <SectionBlock key={i} s={s} />
          ))}

          {guide.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6">
                <FaqAccordion faqs={guide.faqs} />
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-white">Keep reading</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/guides/${r.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-abyss-900/60 transition hover:border-white/25"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={r.heroImage.src}
                    alt={r.heroImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-xs font-semibold uppercase tracking-wider text-coral-400">{r.eyebrow}</p>
                  <p className="mt-2 font-display font-semibold leading-snug text-white">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <CtaBand heading={guide.cta.heading} body={guide.cta.body} />
    </article>
  );
}
