"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { submitEnquiry } from "@/lib/supabase";
import { SITE } from "@/lib/site";

const WEEKS = [
  "Late May 2027 (first shoals, quietest water)",
  "Early June 2027",
  "Mid June 2027 (peak window)",
  "Late June 2027 (peak window)",
  "Early July 2027",
  "Flexible — advise me",
];

const EXPERIENCE = [
  "Snorkeler / confident swimmer",
  "Freediver",
  "Open Water diver",
  "Advanced / Rescue diver",
  "Professional / photographer",
  "Boat-based only (non-swimmer)",
];

export default function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: bots fill hidden fields
    if (fd.get("website")) return;
    setState("sending");
    try {
      await submitEnquiry({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim() || null,
        country: String(fd.get("country") ?? "").trim() || null,
        group_size: fd.get("group_size") ? Number(fd.get("group_size")) : null,
        preferred_week: String(fd.get("preferred_week") ?? "") || null,
        experience_level: String(fd.get("experience_level") ?? "") || null,
        message: String(fd.get("message") ?? "").trim() || null,
        source_page: pathname,
      });
      setState("done");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-ocean-500/30 bg-abyss-800/60 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ocean-500/15">
          <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-ocean-400" fill="none" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-white">Enquiry received</h3>
        <p className="mt-2 text-abyss-100">
          We&apos;ll come back to you within one working day with 2027 availability and the launch rate.
        </p>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
        >
          Want it faster? WhatsApp us
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Expedition enquiry form">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Full name *</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={200}
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            placeholder="Jane Diver"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Email *</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={320}
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            placeholder="jane@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Phone / WhatsApp</span>
          <input
            name="phone"
            autoComplete="tel"
            maxLength={40}
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            placeholder="+27 ..."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Country</span>
          <input
            name="country"
            autoComplete="country-name"
            maxLength={100}
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            placeholder="South Africa"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Group size</span>
          <input
            type="number"
            name="group_size"
            min={1}
            max={50}
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
            placeholder="2"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-abyss-100">Preferred week</span>
          <select
            name="preferred_week"
            defaultValue=""
            className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
          >
            <option value="" disabled>
              Select a window
            </option>
            {WEEKS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-abyss-100">In-water experience</span>
        <select
          name="experience_level"
          defaultValue=""
          className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
        >
          <option value="" disabled>
            How comfortable are you in open water?
          </option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-abyss-100">Anything else?</span>
        <textarea
          name="message"
          rows={4}
          maxLength={5000}
          className="w-full rounded-xl border border-white/10 bg-abyss-900/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
          placeholder="Camera gear, dietary needs, questions about the run..."
        />
      </label>

      {state === "error" && (
        <p className="rounded-xl border border-coral-500/40 bg-coral-500/10 px-4 py-3 text-sm text-coral-200">
          Couldn&apos;t send that ({errorMsg}). Try again, or reach us on{" "}
          <a href={SITE.whatsapp} className="underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-full bg-coral-500 px-8 py-4 font-display font-semibold text-white shadow-lg shadow-coral-500/30 transition hover:bg-coral-600 disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : "Request 2027 availability"}
      </button>
      <p className="text-xs text-abyss-300">
        No payment now. We reply within one working day — usually much faster in season.
      </p>
    </form>
  );
}
