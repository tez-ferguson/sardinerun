export const SITE = {
  name: "Sardine Run Africa",
  legalName: "Sardine Run Africa (Pty) Ltd",
  domain: "https://sardinerunafrica.co.za",
  tagline: "The Greatest Shoal on Earth. First.",
  description:
    "7-day sardine run expeditions from Chintsa, East London, 40 minutes from King Phalo Airport. Snorkel the world's greatest marine migration with the sister company of Offshore Adventures.",
  phone: "+27 82 829 0809",
  phoneHref: "tel:+27828290809",
  whatsapp: "https://wa.me/27828290809?text=Hi%20Sardine%20Run%20Africa%2C%20I%27d%20like%20to%20enquire%20about%20the%202027%20expedition",
  email: "bookings@sardinerunafrica.co.za",
  base: "Chintsa, East London, Eastern Cape, South Africa",
  geo: { lat: -32.8383, lng: 28.1123 },
  season: "May to July",
  sisterCompany: {
    name: "Offshore Adventures",
    url: "https://offshoreadventures.co.za",
    base: "Plettenberg Bay",
  },
  social: {
    instagram: "https://www.instagram.com/offshoreadventures",
    facebook: "https://www.facebook.com/offshoreadventures",
    youtube: "https://www.youtube.com/@offshoreadventures",
  },
  packageDays: 7,
  seaDays: 5,
  currentSeasonYear: 2027,
} as const;

export const NAV = [
  { label: "The Expedition", href: "/packages" },
  { label: "Sardine Run 2027", href: "/sardine-run-2027" },
  { label: "Tracker", href: "/sardine-run-tracker" },
  { label: "Guides", href: "/guides" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
] as const;
