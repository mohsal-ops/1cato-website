import type { Metadata } from "next";
import GamesSection from "./components/sections/GamesSection";
import HeroSection from "./components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Kids Zone | Free Games for Kids at 1Cato Snow Cones",
  description:
    "1Cato Snow Cones is a family-friendly snow cone spot in Brooklyn, NY. While you wait for your snow cones, play free games in our Kids Zone.",
  keywords: [
    "kids snow cones Brooklyn",
    "family dessert Brooklyn",
    "kids games 1Cato Snow Cones",
  ],
  alternates: {
    canonical: "/KidsZone",
  },
  openGraph: {
    title: "Kids Zone | 1Cato Snow Cones Brooklyn",
    description:
      "A family-friendly Brooklyn restaurant with a Kids Zone full of free games.",
    url: "/KidsZone",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black w-full">
      <main>
        <HeroSection />
        <GamesSection />
      </main>
    </div>
  );
};

export default Index;
