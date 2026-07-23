/** Structured guide content. Authors export a `guide: Guide` from src/content/guides/<slug>.ts */

export type GuideSection = {
  /** H2 heading */
  h2: string;
  /** anchor id (kebab-case). Defaults to slugified h2 */
  id?: string;
  /** paragraphs of prose. Plain text; use **bold** and [text](/href) markdown-lite inline. */
  paragraphs?: string[];
  list?: { title?: string; ordered?: boolean; items: string[] };
  table?: { caption?: string; header: string[]; rows: string[][] };
  callout?: { title: string; body: string; variant: "tip" | "warning" | "info" };
  image?: { src: string; alt: string; caption?: string };
  /** optional H3 subsections */
  subsections?: { h3: string; paragraphs: string[] }[];
};

export type Guide = {
  slug: string;
  /** on-page H1 */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** small label above H1, e.g. "Field Guide" */
  eyebrow: string;
  heroImage: { src: string; alt: string };
  /** 1-3 intro paragraphs rendered large */
  intro: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  cta: { heading: string; body: string };
  /** slugs of related guides */
  related: string[];
  datePublished: string;
  dateModified: string;
  /** reading time in minutes */
  readingTime: number;
};
