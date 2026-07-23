import { rich } from "./rich";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-abyss-900/60">
      {faqs.map((f, i) => (
        <details key={i} className="group px-6 py-1 open:bg-white/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display font-semibold text-white [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-coral-400 transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="pb-6 leading-7 text-abyss-100 [&_a]:text-ocean-400 [&_a]:underline">{rich(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
