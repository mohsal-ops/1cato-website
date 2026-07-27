import type { MetadataRoute } from "next";
import db from "@/db/db";

const BASE_URL = "https://1cato.com";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/Menu", priority: 0.9, changeFrequency: "daily" },
  { path: "/catering", priority: 0.9, changeFrequency: "weekly" },
  { path: "/BrandMarketing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/GiftCard", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/KidsZone", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts are a best-effort enrichment. If the DB is unreachable at build
  // time (env not set, a cold Neon instance timing out, or the table not
  // migrated yet), still emit the static sitemap rather than failing the build.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.post.findMany({
      select: { id: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    postEntries = posts.map((post) => ({
      url: `${BASE_URL}/Blog/${post.id}/post`,
      lastModified: post.createdAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("sitemap: could not load blog posts, emitting static routes only:", err);
  }

  return [...staticEntries, ...postEntries];
}
