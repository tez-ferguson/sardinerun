import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { orgSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Sardine Run Africa | Sardine Run Expeditions from Chintsa, East London",
    template: "%s | Sardine Run Africa",
  },
  description: SITE.description,
  keywords: [
    "sardine run",
    "sardine run south africa",
    "sardine run 2027",
    "sardine run east london",
    "sardine run chintsa",
    "sardine run packages",
    "sardine run expedition",
    "wild coast diving",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_ZA",
    url: SITE.domain,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "The sardine run off the Wild Coast, South Africa" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#051724",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <JsonLd data={[orgSchema(), websiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
