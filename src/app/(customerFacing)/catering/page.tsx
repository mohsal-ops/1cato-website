import type { Metadata } from "next";
import CateringPageClient from "./_components/CateringPageClient";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getPageContent } from "@/lib/pageCms";
import { getSiteImage } from "@/lib/getSiteImages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Catering | Snow Cones for ${SITE_CONFIG.city} Events`,
  description: `${SITE_CONFIG.name} caters refreshing, gluten-free, fat-free snow cones for schools, corporate events, festivals, and private parties in ${SITE_CONFIG.city}, ${SITE_CONFIG.state}. Fast service, 20+ exotic flavors — request a custom quote.`,
  keywords: [
    `snow cone catering ${SITE_CONFIG.city}`,
    `event snow cones ${SITE_CONFIG.city}`,
    `school fundraiser snow cones ${SITE_CONFIG.city}`,
    `festival catering ${SITE_CONFIG.city} ${SITE_CONFIG.state}`,
    `corporate event dessert ${SITE_CONFIG.city}`,
  ],
  alternates: { canonical: "/catering" },
  openGraph: {
    title: `Catering | ${SITE_CONFIG.name}`,
    description: `Snow cone catering for schools, corporate events, festivals, and private parties in ${SITE_CONFIG.city}, ${SITE_CONFIG.state}.`,
    url: "/catering",
    images: [{ url: "/general/catering/schoolevent.png", width: 1200, height: 630, alt: "1Cato snow cone catering at an event" }],
  },
};

export default async function Page() {
  const [content, heroUrl] = await Promise.all([
    getPageContent("catering"),
    getSiteImage("catering_hero").catch(() => "/general/catering/schoolevent.png"),
  ]);

  // schema.org Service — helps this page show up for "snow cone catering" searches
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Snow cone catering",
    provider: {
      "@type": "FoodEstablishment",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.street,
        addressLocality: SITE_CONFIG.city,
        addressRegion: SITE_CONFIG.state,
        postalCode: SITE_CONFIG.zip,
        addressCountry: "US",
      },
    },
    areaServed: "New York City",
    description: content["catering_hero_subtitle"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <CateringPageClient content={content} heroUrl={heroUrl || "/general/catering/schoolevent.png"} />
    </>
  );
}
