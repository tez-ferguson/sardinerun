"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-abyss-950/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-gradient-to-b from-abyss-950/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label="Sardine Run Africa - home" className="text-white">
          <Logo className="h-8 w-auto lg:h-10" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-white bg-white/10"
                  : "text-abyss-100 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.7c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2-.8 3.3a11.6 11.6 0 0 0 4.4 5.2c1.6 1 2.9 1.3 3.9 1.1.7-.1 1.5-.6 1.7-1.3.2-.6.2-1.2.1-1.3l-.5-.6Z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-coral-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-coral-500/25 transition hover:bg-coral-600 lg:px-5"
          >
            Enquire now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"} h-[calc(100dvh-4rem)] overflow-y-auto bg-abyss-950/98 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-4 font-display text-xl font-semibold text-white active:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6">
            <Link
              href="/contact"
              className="rounded-full bg-coral-500 px-6 py-4 text-center font-semibold text-white"
            >
              Enquire about 2027
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-4 text-center font-semibold text-white"
            >
              Chat on WhatsApp
            </a>
            <a href={SITE.phoneHref} className="py-2 text-center text-abyss-200">
              {SITE.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
