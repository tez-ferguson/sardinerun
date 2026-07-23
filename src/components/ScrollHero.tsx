"use client";

/**
 * Cinematic hero. Two modes:
 *
 * DESKTOP (fine pointer, wide viewport): scroll-scrubbed film. Three chained
 * legs rendered as one continuous camera flight (surface, the great shoal,
 * the hunt); scroll position drives video.currentTime.
 *  - clips fetched as Blobs and played from object URLs (always seekable)
 *  - rAF-smoothed scrubbing with seek coalescing
 *
 * MOBILE (coarse pointer or <=860px): the native 9:16 portrait renders PLAY
 * (muted, looped, playsinline) full-screen, one per scene; scroll switches
 * scenes with a crossfade and drives the copy. No currentTime scrubbing on
 * phones: seek-painting on never-played videos is unreliable on iOS Safari
 * and low-end Android, while muted inline autoplay is universally supported.
 *
 * Shared hardening: posters stay until the video paints a real frame,
 * height-only resizes (mobile URL bar) never re-run layout, and
 * prefers-reduced-motion gets stills + copy only.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Leg = {
  clip: string;
  clipMobile: string;
  poster?: string;
  posterMobile?: string;
  /** viewport-heights of scroll this leg occupies */
  scroll: number;
  /** 0..1: settle the camera mid-scene while copy peaks (desktop scrub only) */
  linger: number;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta?: boolean;
};

const LEGS: Leg[] = [
  {
    clip: "/video/leg1.mp4",
    clipMobile: "/video/leg1-m.mp4",
    poster: "/video/poster-1.webp",
    posterMobile: "/video/poster-1-m.webp",
    scroll: 1.7,
    linger: 0.35,
    eyebrow: "Chintsa · Wild Coast · May to July",
    title: "The Greatest Shoal on Earth",
    body: "Each winter, billions of sardines pour up South Africa's Wild Coast, and the ocean's fastest hunters follow. This is the world's biggest marine migration, and it passes our beach first.",
    tags: ["7-day expeditions", "40 min from the airport", "Small groups"],
  },
  {
    clip: "/video/leg2.mp4",
    clipMobile: "/video/leg2-m.mp4",
    poster: "/video/poster-2.webp",
    posterMobile: "/video/poster-2-m.webp",
    scroll: 1.7,
    linger: 0.4,
    eyebrow: "Beneath the surface",
    title: "Then the water turns silver",
    body: "Shoals up to seven kilometres long move like one animal: a flashing wall of fish you can see from the air. Down here, you're inside it.",
    tags: ["Snorkel-first", "No dive cert needed"],
  },
  {
    clip: "/video/leg3.mp4",
    clipMobile: "/video/leg3-m.mp4",
    poster: "/video/poster-3.webp",
    posterMobile: "/video/poster-3-m.webp",
    scroll: 1.9,
    linger: 0.42,
    eyebrow: "The hunt",
    title: "And the ocean explodes",
    body: "Common dolphins carve the shoal into bait balls. Gannets rain from the sky. Whales, sharks and seals join a feeding event nothing else on Earth matches.",
    cta: true,
  },
];

const CROSSFADE_VH = 0.14;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};
const lingerEase = (x: number, L: number) => {
  const c = x - 0.5;
  return (1 - L) * x + L * (4 * c * c * c + 0.5);
};

type LegState = {
  el: HTMLDivElement | null;
  video: HTMLVideoElement | null;
  loading: boolean;
  ready: boolean;
  playing: boolean;
  cur: number;
  target: number;
  visible: boolean;
  start: number;
  end: number;
};

export default function ScrollHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      return;
    }

    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const smallMQ = window.matchMedia("(max-width: 860px)");
    const isMobile = () => coarse || smallMQ.matches;

    const states: LegState[] = LEGS.map(() => ({
      el: null,
      video: null,
      loading: false,
      ready: false,
      playing: false,
      cur: 0,
      target: 0,
      visible: false,
      start: 0,
      end: 0,
    }));

    let vh = window.innerHeight;
    let laidOutW = window.innerWidth;
    let totalVh = 0;
    let raf = 0;
    let ticking = false;
    let disposed = false;
    const objectUrls: string[] = [];

    function layout() {
      vh = window.innerHeight;
      laidOutW = window.innerWidth;
      let off = 0;
      LEGS.forEach((l, i) => {
        states[i].start = off * vh;
        off += l.scroll;
        states[i].end = off * vh;
      });
      totalVh = off;
      if (trackRef.current) trackRef.current.style.height = `${totalVh * 100}vh`;
      read();
    }

    function markPainted(i: number) {
      states[i].el?.classList.add("sra-painted");
    }

    function loadClip(i: number) {
      const s = states[i];
      if (s.loading || disposed) return;
      s.loading = true;
      const mobile = isMobile();
      const url = mobile ? LEGS[i].clipMobile : LEGS[i].clip;

      const attach = (v: HTMLVideoElement) => {
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.setAttribute("muted", "");
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        if (mobile) v.loop = true;
        v.className = "absolute inset-0 h-full w-full object-cover";
        v.addEventListener("loadedmetadata", () => {
          s.ready = true;
          read();
        });
        // Poster hides once a real frame exists: first successful seek
        // (desktop scrub) or actual playback (mobile).
        v.addEventListener("seeked", () => markPainted(i), { once: true });
        v.addEventListener("playing", () => markPainted(i), { once: true });
        v.addEventListener("timeupdate", () => markPainted(i), { once: true });
        s.el?.appendChild(v);
        s.video = v;
        if (mobile) syncMobilePlayback();
      };

      if (mobile) {
        // Phones: plain src + native progressive playback. No blob needed
        // (we never seek), and streaming starts frames sooner on cellular.
        const v = document.createElement("video");
        v.src = url;
        attach(v);
      } else {
        // Desktop: blob URL so the clip is fully seekable for scrubbing.
        fetch(url)
          .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
          .then((blob) => {
            if (disposed) return;
            const v = document.createElement("video");
            const obj = URL.createObjectURL(blob);
            objectUrls.push(obj);
            v.src = obj;
            attach(v);
          })
          .catch(() => {
            s.loading = false;
          });
      }
    }

    /** Mobile: exactly the visible scenes play; everything else pauses. */
    function syncMobilePlayback() {
      if (!isMobile()) return;
      for (const s of states) {
        if (!s.video) continue;
        if (s.visible && !s.playing) {
          s.playing = true;
          const p = s.video.play();
          if (p?.catch) p.catch(() => { s.playing = false; });
        } else if (!s.visible && s.playing) {
          s.playing = false;
          try { s.video.pause(); } catch {}
        }
      }
    }

    function read() {
      const y = window.scrollY;
      const fade = CROSSFADE_VH * vh;
      let current = 0;
      for (let i = 0; i < LEGS.length; i++) if (y >= states[i].start) current = i;

      for (let i = 0; i < LEGS.length; i++) {
        const s = states[i];
        if (!s.el) s.el = sceneRefs.current[i];
        if (y > s.start - 1.7 * vh && y < s.end + 1.7 * vh) loadClip(i);
        const local = clamp((y - s.start) / (s.end - s.start));
        s.target = LEGS[i].linger ? lingerEase(local, LEGS[i].linger) : local;
        let outside = 0;
        if (y < s.start) outside = s.start - y;
        else if (y > s.end) outside = y - s.end;
        const op = smooth(1 - outside / fade);
        if (s.el) {
          s.el.style.opacity = String(op);
          s.el.style.zIndex = i === current ? "12" : String(10 + Math.round(op));
        }
        s.visible = op > 0.001;

        const c = copyRefs.current[i];
        if (c) {
          const pr = local;
          const before = y < s.start;
          const after = y > s.end;
          let cop: number;
          if (i === 0) cop = after ? 0 : smooth(1 - pr / 0.55);
          else if (i === LEGS.length - 1) cop = before ? 0 : smooth(pr / 0.38);
          else cop = before || after ? 0 : smooth(1 - Math.abs(pr - 0.5) / 0.5);
          c.style.opacity = String(cop);
          c.style.transform = `translateY(${(0.5 - pr) * 3.2}vh)`;
          c.style.pointerEvents = cop > 0.5 ? "auto" : "none";
        }
      }

      if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - y / (0.45 * vh)));
      syncMobilePlayback();
      ticking = false;
    }

    /** Desktop only: rAF loop maps smoothed scroll progress to currentTime. */
    function frame() {
      if (!isMobile()) {
        for (let i = 0; i < LEGS.length; i++) {
          const s = states[i];
          if (!s.ready || !s.video) continue;
          if (s.video.seeking) continue;
          if (!s.visible && Math.abs(s.cur - s.target) < 0.002) continue;
          s.cur += (s.target - s.cur) * 0.18;
          const dur = s.video.duration || 1;
          const t = clamp(s.cur, 0, 0.999) * dur;
          if (Math.abs(s.video.currentTime - t) > 0.008) {
            try {
              s.video.currentTime = t;
            } catch {}
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    const onResize = () => {
      if (coarse && window.innerWidth === laidOutW) return; // URL-bar height change only
      layout();
    };
    const onVisibility = () => {
      if (document.hidden) {
        states.forEach((s) => {
          if (s.playing && s.video) {
            s.playing = false;
            try { s.video.pause(); } catch {}
          }
        });
      } else {
        syncMobilePlayback();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", layout);
    document.addEventListener("visibilitychange", onVisibility);

    layout();
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", layout);
      document.removeEventListener("visibilitychange", onVisibility);
      objectUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  /* Reduced motion: calm stills with the same copy, stacked normally. */
  if (reduce) {
    return (
      <div>
        {LEGS.map((l, i) => (
          <section key={i} className="relative flex min-h-[92svh] items-end overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/35 to-transparent" />
            <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
              <HeroCopy leg={l} h1={i === 0} />
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      {/* Fixed stage */}
      <div className="fixed inset-0 z-0" aria-hidden>
        {LEGS.map((l, i) => (
          <div
            key={i}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="sra-scene absolute inset-0 overflow-hidden opacity-0 will-change-[opacity]"
          >
            {/* poster stays until the clip paints (iOS blank-frame guard) */}
            <picture>
              {l.posterMobile && <source media="(max-width: 860px)" srcSet={l.posterMobile} />}
              <img src={l.poster} alt="" className="sra-poster absolute inset-0 h-full w-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
            </picture>
          </div>
        ))}
        {/* legibility scrims */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-abyss-950/85 via-transparent to-abyss-950/40" />
      </div>

      {/* Copy layer */}
      <div className="pointer-events-none fixed inset-0 z-20">
        {LEGS.map((l, i) => (
          <article
            key={i}
            ref={(el) => {
              copyRefs.current[i] = el;
            }}
            className="absolute inset-x-0 bottom-[calc(clamp(56px,12dvh,110px)+env(safe-area-inset-bottom))] mx-auto max-w-7xl px-4 opacity-0 will-change-[opacity,transform] sm:px-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:px-8"
          >
            <HeroCopy leg={l} h1={i === 0} />
          </article>
        ))}

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-[calc(18px+env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70"
        >
          <span>Scroll to dive</span>
          <span className="relative h-9 w-6 rounded-full border-2 border-white/30">
            <span className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-coral-500" />
          </span>
        </div>
      </div>

      {/* Scroll track (defines the flight length) */}
      <div ref={trackRef} className="relative z-10 w-full" />

      <style jsx global>{`
        .sra-scene.sra-painted .sra-poster {
          opacity: 0;
        }
        .sra-scene video {
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

function HeroCopy({ leg, h1 }: { leg: Leg; h1: boolean }) {
  const Title = h1 ? "h1" : "h2";
  return (
    <div className="pointer-events-auto max-w-xl">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-coral-400 sm:text-sm">{leg.eyebrow}</p>
      <Title className="mt-3 font-display text-4xl font-extrabold leading-[1.02] text-white drop-shadow-[0_2px_24px_rgba(5,23,36,0.8)] sm:text-6xl lg:text-7xl">
        {leg.title}
      </Title>
      <p className="mt-4 max-w-[46ch] text-base leading-7 text-abyss-50/95 drop-shadow-[0_1px_12px_rgba(5,23,36,0.9)] sm:mt-5 sm:text-lg sm:leading-8">
        {leg.body}
      </p>
      {leg.tags && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {leg.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/25 bg-abyss-950/40 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      {leg.cta && (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/packages"
            className="rounded-full bg-coral-500 px-8 py-4 text-center font-display font-semibold text-white shadow-xl shadow-coral-500/30 transition hover:bg-coral-600"
          >
            See the 7-day expedition
          </Link>
          <Link
            href="/contact"
            className="rounded-full border-2 border-white/40 bg-abyss-950/30 px-8 py-4 text-center font-display font-semibold text-white backdrop-blur-sm transition hover:border-white/80"
          >
            Request 2027 dates
          </Link>
        </div>
      )}
    </div>
  );
}
