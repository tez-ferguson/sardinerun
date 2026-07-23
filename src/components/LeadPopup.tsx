"use client";

/**
 * Lead-capture popup for visitors about to leave.
 *
 * Trigger conditions (whichever fires first):
 *  - Desktop "exit intent": mouse leaves through the top of the viewport
 *    (the classic "closing the tab / typing a new URL" gesture).
 *  - Deep scroll: reached ~60% down the page — a proxy for "engaged, but
 *    exit-intent doesn't exist on touch devices".
 *  - Timed fallback: 45s on the page, for anyone who never triggers the
 *    above (short pages, no mouse movement, etc).
 *
 * Shown once per visit, then snoozed in localStorage for 14 days so return
 * visitors aren't nagged on every session.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { submitEnquiry } from "@/lib/supabase";
import { SITE } from "@/lib/site";
import { WEEKS } from "./EnquiryForm";

const STORAGE_KEY = "sra_lead_popup_seen_at";
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const MIN_DWELL_MS = 8000; // ignore triggers before this — avoids firing on a drive-by mouse flick
const TIMED_FALLBACK_MS = 45000;
const SCROLL_DEPTH_TRIGGER = 0.6;
// The contact page already has the full enquiry form front and centre.
const EXCLUDED_PATHS = new Set(["/contact"]);

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const shownRef = useRef(false);
  const mountedAtRef = useRef(0);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (EXCLUDED_PATHS.has(pathname)) return;

    let lastShown = 0;
    try {
      lastShown = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    } catch {
      // localStorage unavailable (privacy mode etc.) — fall through and allow the popup.
    }
    if (lastShown && Date.now() - lastShown < SNOOZE_MS) return;

    const timer = window.setTimeout(trigger, TIMED_FALLBACK_MS);

    function trigger() {
      if (shownRef.current) return;
      if (Date.now() - mountedAtRef.current < MIN_DWELL_MS) return;
      shownRef.current = true;
      setOpen(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }

    function onMouseOut(e: MouseEvent) {
      // Only "leaving through the top edge" — not every mouseout between elements.
      if (e.relatedTarget || e.clientY > 0) return;
      trigger();
    }

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_DEPTH_TRIGGER) trigger();
    }

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("website")) return; // honeypot
    setState("sending");
    try {
      await submitEnquiry({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        preferred_week: String(fd.get("preferred_week") ?? "") || null,
        source_page: `${pathname} (exit-intent popup)`,
      });
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="2027 season enquiry"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-abyss-900 p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-abyss-300 transition hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {state === "done" ? (
          <div className="py-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ocean-500/15">
              <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-ocean-400" fill="none" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">Got it — enquiry received</h3>
            <p className="mt-2 text-abyss-100">
              We&apos;ll come back to you within one working day with 2027 availability and the launch rate.
            </p>
          </div>
        ) : (
          <>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-coral-400">Before you go</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-white">2027 weeks are already filling</h3>
            <p className="mt-3 text-sm leading-6 text-abyss-100">
              Leave your details and we&apos;ll hold your place in the queue — early enquiries get first pick of peak
              weeks and the launch rate.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-abyss-100">Full name *</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  maxLength={200}
                  className="w-full rounded-xl border border-white/10 bg-abyss-950/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
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
                  className="w-full rounded-xl border border-white/10 bg-abyss-950/80 px-4 py-3 text-white placeholder-abyss-300 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
                  placeholder="jane@example.com"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-abyss-100">Preferred week</span>
                <select
                  name="preferred_week"
                  defaultValue=""
                  className="w-full rounded-xl border border-white/10 bg-abyss-950/80 px-4 py-3 text-white outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30"
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

              {state === "error" && (
                <p className="rounded-xl border border-coral-500/40 bg-coral-500/10 px-4 py-3 text-sm text-coral-200">
                  Couldn&apos;t send that. Try again, or reach us on{" "}
                  <a href={SITE.whatsapp} className="underline" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-full bg-coral-500 px-8 py-4 font-display font-semibold text-white shadow-lg shadow-coral-500/30 transition hover:bg-coral-600 disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Hold my spot in the queue"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-center text-sm text-abyss-300 transition hover:text-white"
              >
                No thanks, maybe later
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
