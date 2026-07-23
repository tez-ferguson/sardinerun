"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  // The homepage hero has its own CTA stack; keep the float off the cinematic experience.
  if (pathname === "/") return null;
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat to us on WhatsApp"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-black/30 transition hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.7c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2-.8 3.3a11.6 11.6 0 0 0 4.4 5.2c1.6 1 2.9 1.3 3.9 1.1.7-.1 1.5-.6 1.7-1.3.2-.6.2-1.2.1-1.3l-.5-.6Z" />
      </svg>
    </a>
  );
}
