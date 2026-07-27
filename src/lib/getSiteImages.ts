import db from "@/db/db";

export const DEFAULT_SITE_IMAGES = [
  { key: "home_hero", url: "/general/generalPages/mainImage.jpg", label: "Home Page Hero" },
  { key: "catering_hero", url: "/general/catering/schoolevent.png", label: "Catering — Hero" },
  { key: "brand_marketing_hero", url: "/general/brand-marketing/nightfestival.png", label: "Brand Marketing — Hero" },
];

async function seedDefaults() {
  await Promise.all(
    DEFAULT_SITE_IMAGES.map((img) =>
      db.siteImage.upsert({ where: { key: img.key }, update: {}, create: img }),
    ),
  );
}

// Falls back to seeding from DEFAULT_SITE_IMAGES if the row is missing (fresh
// DB, or the seed script was never run) instead of returning an empty string.
export async function getSiteImage(key: string): Promise<string> {
  const img = await db.siteImage.findUnique({ where: { key } });
  if (img) return img.url;

  await seedDefaults();
  const seeded = await db.siteImage.findUnique({ where: { key } });
  return seeded?.url ?? "";
}

export async function getAllSiteImages() {
  const images = await db.siteImage.findMany({ orderBy: { key: "asc" } });
  if (images.length > 0) return images;

  await seedDefaults();
  return db.siteImage.findMany({ orderBy: { key: "asc" } });
}
