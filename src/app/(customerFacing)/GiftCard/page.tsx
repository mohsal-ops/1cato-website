import type { Metadata } from "next";
import GiftCardPageClient from "./_components/GiftCardPageClient";

export const metadata: Metadata = {
  title: "Gift Cards | Send Snow Cones to a Friend",
  description:
    "Buy a 1Cato Snow Cones gift card online — perfect for snow cone lovers in Brooklyn, NY. Instant delivery, no expiration.",
  keywords: [
    "snow cone gift card Brooklyn",
    "1Cato Snow Cones gift card",
    "dessert gift card NYC",
  ],
  alternates: {
    canonical: "/GiftCard",
  },
  openGraph: {
    title: "Gift Cards | 1Cato Snow Cones Brooklyn",
    description:
      "Send a 1Cato Snow Cones gift card instantly — great for snow cone lovers in Brooklyn, NY.",
    url: "/GiftCard",
  },
};

export default function Page() {
  return <GiftCardPageClient />;
}
