import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { SITE_CONFIG } from "@/lib/siteConfig";
import {
  GetCartItems,
  GetFeaturedProducts,
} from "./Menu/_actions/getDataNeeded";
import GetPlaces from "./_components/getPlaces";
import ThirdSectionClient from "./_components/ThirdSectionClient";
import FadeIn from "@/components/FadeIn";
import { OurLocation } from "./_components/OurLocation";
import HomeFeaturedSkeleton from "./_skeletons/HomeFeaturedSkeleton";
import db from "@/db/db";
import { getBusinessHours } from "@/lib/getHours";
import { getSiteImage } from "@/lib/getSiteImages";
import {
  TopSection,
  SecondSection,
  ReviewsSection,
  OrderDirectlyfromOUrWebsite,
  DistinctiveFeatures,
  Featuring,
  Frequentlyaskedquestions,
} from "./_components/HomeSections";
import {
  Item,
  SideGroup,
  SideOption,
} from "generated/prisma";

export type ItemWithSides = Item & {
  sideGroups: (SideGroup & {
    options: SideOption[];
  })[];
};

export const metadata: Metadata = {
  title: "1Cato Snow Cones | Refreshing Snow Cones in Brooklyn, NYC",
  description:
    "1Cato Snow Cones serves refreshing, gluten-free, fat-free snow cones with exotic natural flavors in Brooklyn, NY. Order online for pickup or book catering for schools, events, and festivals.",
  keywords: [
    "snow cones Brooklyn",
    "snow cones NYC",
    "gluten-free snow cones",
    "fat-free snow cones",
    "exotic snow cone flavors",
    "event catering Brooklyn",
    "festival snow cones New York",
    "1Cato Snow Cones Brooklyn",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "1Cato Snow Cones | Refreshing Snow Cones in Brooklyn, NYC",
    description:
      "Refreshing, gluten-free, fat-free snow cones with exotic natural flavors, made fresh at 1Cato Snow Cones in Brooklyn.",
    url: "/",
    siteName: "1Cato Snow Cones",
    images: [
      {
        url: "/general/generalPages/mainImage.jpg",
        width: 1200,
        height: 630,
        alt: "1Cato Snow Cones — refreshing snow cones in Brooklyn, NY",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1Cato Snow Cones | Snow Cones in Brooklyn",
    description:
      "Refreshing, gluten-free, fat-free snow cones with exotic natural flavors you'll crave.",
    images: ["/general/generalPages/mainImage.jpg"],
  },
};

function FaqSchema() {
  // Mirrors the questions/answers rendered in Frequentlyaskedquestions below —
  // keep these in sync if that content changes.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          // Derived from SITE_CONFIG so the structured data always matches the
          // visible FAQ (no more drift).
          mainEntity: SITE_CONFIG.home.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      }}
    />
  );
}

function SectionDivider() {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="h-px w-full max-w-[85vw] bg-linear-to-r from-transparent via-stone-300 to-transparent" />
    </div>
  );
}

async function FeaturedProductsSection() {
  const cartId = (await cookies()).get("cart_id")?.value;
  const [products, cart] = await Promise.all([
    GetFeaturedProducts(),
    cartId ? GetCartItems(cartId) : Promise.resolve(null),
  ]);

  return <SecondSection products={products} cartItems={cart?.items ?? []} />;
}

async function LocationSection() {
  const [placesRes, hours] = await Promise.all([GetPlaces(), getBusinessHours()]);
  const places = placesRes?.places ?? [];
  const lat = places[0]?.lat ?? 0;
  const lng = places[0]?.lng ?? 0;

  return <OurLocation places={places} lat={lat} lng={lng} hours={hours} />;
}

async function GallerySection() {
  const images = await db.galleryImage.findMany({ orderBy: { order: "asc" } });
  return <ThirdSectionClient images={images} />;
}

async function ReviewsDataSection() {
  const reviews = await db.review.findMany({ orderBy: { order: "asc" } });
  return <ReviewsSection reviews={reviews} />;
}

export default async function Home() {
  // TopSection and the static sections below render immediately; the two
  // heavier DB-backed sections stream in behind Suspense so they aren't
  // blocked on the featured-products and places queries. The hero image is a
  // single indexed lookup, cheap enough to await directly here.
  const heroImage = await getSiteImage("home_hero");

  return (
    <div className="flex  pt-20 flex-col gap-5 items-center justify-center    [&>*:not(:first-child)]:m-2">
      <FaqSchema />
      <TopSection heroImage={heroImage} />
      <SectionDivider />
      <Suspense fallback={<HomeFeaturedSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<div className="w-[85%] h-100 bg-gray-200 rounded-3xl animate-pulse" />}>
        <GallerySection />
      </Suspense>
      <SectionDivider />
      <FadeIn delay={100}>
        <Suspense fallback={<div className="h-96 w-full md:w-[85vw] bg-gray-100 rounded-4xl animate-pulse" />}>
          <ReviewsDataSection />
        </Suspense>
      </FadeIn>
      <SectionDivider />
      <FadeIn delay={200}>
        <div className="p-2 w-full flex justify-center">
          <OrderDirectlyfromOUrWebsite />
        </div>
      </FadeIn>
      <SectionDivider />
      <FadeIn delay={300}>
        <div className="w-full flex justify-center">
          <Featuring />
        </div>
      </FadeIn>
      <SectionDivider />
      <FadeIn delay={400}>
        <DistinctiveFeatures />
      </FadeIn>
      <SectionDivider />
      <FadeIn delay={500}>
        <div className="p-4 w-full flex justify-center">
          <Frequentlyaskedquestions />
        </div>
      </FadeIn>
      <SectionDivider />
      <Suspense fallback={<div className="h-40 w-full sm:w-[75%] animate-pulse bg-stone-100 rounded-4xl" />}>
        <LocationSection />
      </Suspense>
    </div>
  );
}
