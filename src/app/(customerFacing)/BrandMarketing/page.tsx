import type { Metadata } from "next";
import BrandMarketingClient from "./_components/BrandMarketingClient";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getPageContent } from "@/lib/pageCms";
import { getSiteImage } from "@/lib/getSiteImages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Brand Marketing & Sponsorships | ${SITE_CONFIG.name}`,
  description: `Partner with ${SITE_CONFIG.name} to get your brand in front of thousands at parades, festivals, and event activations across NYC. Branded cups, banners, and co-branding packages available.`,
  keywords: [
    "brand activation NYC",
    "festival sponsorship NYC",
    "parade brand marketing New York",
    "event co-branding Brooklyn",
    "experiential marketing NYC",
  ],
  alternates: { canonical: "/BrandMarketing" },
  openGraph: {
    title: `Brand Marketing & Sponsorships | ${SITE_CONFIG.name}`,
    description: `Get your brand noticed at the biggest parades and festivals in the U.S. with ${SITE_CONFIG.name} event activations.`,
    url: "/BrandMarketing",
    images: [{ url: "/general/brand-marketing/nightfestival.png", width: 1200, height: 630, alt: "1Cato brand activation at a night festival" }],
  },
};

export default async function Page() {
  const [content, heroUrl] = await Promise.all([
    getPageContent("brand_marketing"),
    getSiteImage("brand_marketing_hero").catch(() => "/general/brand-marketing/nightfestival.png"),
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Brand marketing and event sponsorship activations",
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      url: SITE_CONFIG.siteUrl,
    },
    areaServed: "United States",
    description: content["bm_hero_subtitle"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BrandMarketingClient content={content} heroUrl={heroUrl || "/general/brand-marketing/nightfestival.png"} />
    </>
  );
}
