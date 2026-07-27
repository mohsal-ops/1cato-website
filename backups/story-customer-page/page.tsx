import type { Metadata } from "next";
import db from "@/db/db";
import StoryClient from "./_components/StoryClient";
import { getSiteImage } from "@/lib/getSiteImages";

export const metadata: Metadata = {
  title: "Our Story | Family-Owned Caribbean Kitchen in Brooklyn",
  description:
    "Meet the family behind 1Cato Snow Cones — a Brooklyn, NY restaurant serving jerk chicken and Caribbean-inspired comfort food rooted in generations of home cooking.",
  keywords: [
    "Caribbean restaurant Brooklyn story",
    "family owned restaurant Brooklyn",
    "jerk chicken restaurant history",
    "1Cato Snow Cones owners",
  ],
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Our Story | 1Cato Snow Cones Brooklyn",
    description:
      "The family story behind 1Cato Snow Cones' jerk chicken and Caribbean-inspired cooking in Brooklyn, NY.",
    url: "/story",
  },
};

export default async function Page() {
  const [partners, storyHero, storyOrigin, storyClosing] = await Promise.all([
    db.partner.findMany({ orderBy: { order: "asc" } }),
    getSiteImage("story_hero"),
    getSiteImage("story_origin"),
    getSiteImage("story_closing"),
  ]);

  return (
    <StoryClient
      partners={partners}
      images={{ story_hero: storyHero, story_origin: storyOrigin, story_closing: storyClosing }}
    />
  );
}