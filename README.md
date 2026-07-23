# Sardine Run Africa - sardinerunafrica.co.za

Sales-optimised marketing site for Sardine Run Africa: 7-day sardine run expeditions from Chintsa, East London. Sister brand of [Offshore Adventures](https://offshoreadventures.co.za) (Plettenberg Bay), sharing its orange/navy identity.

## Stack

- **Next.js 15** (App Router, static generation) + **Tailwind CSS v4**
- **Supabase**: enquiry form submissions (`enquiries` table, anon insert-only via RLS)
- **Scroll-scrubbed cinematic hero**: three chained AI-generated ocean film legs (surface → the great shoal → the hunt), scrubbed by scroll position. Desktop plays native 16:9 1080p encodes; phones get a separately rendered native 9:16 portrait chain (720p, tight GOP for smooth phone seeking).

## Develop

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel (zero config needed; Next.js auto-detected).
3. Optional env vars (defaults are baked in for this project):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Point `sardinerunafrica.co.za` at the Vercel project (A/CNAME per Vercel dashboard).

## Content model

- Hub guides live in `src/content/guides/*.ts` as typed `Guide` objects (see `src/content/types.ts`), registered in `src/content/registry.ts`, rendered by `src/components/GuideArticle.tsx` at `/guides/[slug]`. Adding a guide = add the file + one import line; sitemap, schema (Article + FAQPage + BreadcrumbList), and hub index update automatically.
- Bespoke pages: `/` (scroll hero), `/packages`, `/sardine-run-2027`, `/sardine-run-tracker`, `/guides`, `/gallery`, `/about`, `/contact`.

## SEO notes

- JSON-LD: Organization + WebSite (layout), TouristTrip (home/packages), FAQPage (every page with FAQs), Article + Breadcrumb (guides).
- `sitemap.xml` and `robots.txt` generated from code (`src/app/sitemap.ts`, `robots.ts`).
- Year-dated strategy: `/sardine-run-2027` is the live money page; `/guides/sardine-run-2026-season-report` catches past-year searches. Each new season: add the new year page, convert the old one to a report, 301 as needed.
- The tracker page (`/sardine-run-tracker`) targets "where is the sardine run currently/today/update" queries; update it in season after each sea day.

## Enquiries

Form posts to Supabase `enquiries` (write-only for anon). Read them in the Supabase dashboard, or wire a notification (DB webhook → email/WhatsApp) later. Honeypot field included; server-side constraints cap field lengths.

## Video pipeline (for future re-renders)

Hero legs were generated with Higgsfield Seedance 2.0 using frame-locked chaining (each leg starts from the previous leg's actual last frame, per architecture A of the scroll-world method). Encodes: desktop `crf 20 -g 8` 1080p; mobile `crf 23 -g 4` 720w native portrait. Posters are each leg's first frame. See `src/components/ScrollHero.tsx` for the scrub engine.
