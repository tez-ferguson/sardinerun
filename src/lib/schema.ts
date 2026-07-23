import { SITE } from "./site";

/** JSON-LD builders. Every page embeds via <script type="application/ld+json">. */

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/logo.svg`,
    image: `${SITE.domain}/og/home.jpg`,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chintsa",
      addressRegion: "Eastern Cape",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube, SITE.sisterCompany.url],
    parentOrganization: {
      "@type": "Organization",
      name: SITE.sisterCompany.name,
      url: SITE.sisterCompany.url,
    },
    areaServed: "Wild Coast, Eastern Cape, South Africa",
  };
}

export function tripSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${SITE.domain}/packages#trip`,
    name: `${SITE.currentSeasonYear} Sardine Run Expedition — 7 Days, Chintsa`,
    description: `Seven-day sardine run expedition from Chintsa, East London: ${SITE.seaDays} sea days chasing the greatest shoal on Earth, plus lodge accommodation, meals and airport transfers.`,
    provider: { "@id": `${SITE.domain}/#organization` },
    touristType: ["Snorkelers", "Scuba divers", "Wildlife photographers", "Adventure travellers"],
    itinerary: {
      "@type": "ItemList",
      numberOfItems: 7,
      itemListElement: [
        "Arrival & briefing in Chintsa",
        "Sea day 1 — first launch at dawn",
        "Sea day 2 — following the shoals",
        "Sea day 3 — bait ball window",
        "Sea day 4 — bait ball window",
        "Sea day 5 — final launch",
        "Departure day",
      ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    },
    subjectOf: { "@id": `${SITE.domain}/#website` },
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: "0",
      description: `${SITE.currentSeasonYear} pricing on request — enquire for the launch rate`,
      availability: "https://schema.org/PreOrder",
      url: `${SITE.domain}/contact`,
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image ? `${SITE.domain}${opts.image}` : `${SITE.domain}/og/home.jpg`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Organization", name: SITE.name, url: SITE.domain },
    publisher: { "@id": `${SITE.domain}/#organization` },
    mainEntityOfPage: `${SITE.domain}/guides/${opts.slug}`,
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.domain}${c.href}`,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    publisher: { "@id": `${SITE.domain}/#organization` },
  };
}
