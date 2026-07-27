import db from "@/db/db";

// Editable copy for the Catering + Brand Marketing pages. Defaults live here so
// the pages always render (even before `prisma db push` creates the table);
// values saved from the admin override them. Prices are owner-approved.
export type PageKey = "catering" | "brand_marketing";

export type ContentField = {
  page: PageKey;
  key: string;
  label: string;
  value: string;
  multiline?: boolean;
  order: number;
};

export const DEFAULT_PAGE_CONTENT: ContentField[] = [
  // ── Catering ──────────────────────────────────────────────────────────────
  { page: "catering", key: "catering_hero_title", label: "Hero heading", value: "Bring Snow Cones to Your Event", order: 1 },
  { page: "catering", key: "catering_hero_subtitle", label: "Hero subheading", value: "Schools, corporate events, festivals — we serve joy in every scoop!", multiline: true, order: 2 },
  { page: "catering", key: "catering_hero_badge", label: "Hero trust line", value: "Serving NYC & surrounding areas • Fully licensed & insured", order: 3 },
  { page: "catering", key: "catering_why_title", label: "\"Why choose us\" heading", value: "Why Choose Us?", order: 4 },
  { page: "catering", key: "catering_why_1_title", label: "Reason 1 — title", value: "Fast Service", order: 5 },
  { page: "catering", key: "catering_why_1_desc", label: "Reason 1 — text", value: "500+ servings per hour.", order: 6 },
  { page: "catering", key: "catering_why_2_title", label: "Reason 2 — title", value: "Custom Flavors", order: 7 },
  { page: "catering", key: "catering_why_2_desc", label: "Reason 2 — text", value: "Over 20 unique snow cone flavors.", order: 8 },
  { page: "catering", key: "catering_why_3_title", label: "Reason 3 — title", value: "Friendly Staff", order: 9 },
  { page: "catering", key: "catering_why_3_desc", label: "Reason 3 — text", value: "Our team handles setup & cleanup.", order: 10 },
  { page: "catering", key: "catering_why_4_title", label: "Reason 4 — title", value: "Branded Packaging", order: 11 },
  { page: "catering", key: "catering_why_4_desc", label: "Reason 4 — text", value: "Custom cups and banners available.", order: 12 },
  { page: "catering", key: "catering_categories_title", label: "\"We cater to\" heading", value: "We Cater To", order: 13 },
  { page: "catering", key: "catering_packages_title", label: "Packages heading", value: "Packages & Pricing", order: 14 },
  { page: "catering", key: "catering_tier_1_name", label: "Package 1 — name", value: "Starter", order: 15 },
  { page: "catering", key: "catering_tier_1_desc", label: "Package 1 — details", value: "Perfect for small parties (50–150 guests).", multiline: true, order: 16 },
  { page: "catering", key: "catering_tier_1_price", label: "Package 1 — price", value: "From $350", order: 17 },
  { page: "catering", key: "catering_tier_2_name", label: "Package 2 — name", value: "Event", order: 18 },
  { page: "catering", key: "catering_tier_2_desc", label: "Package 2 — details", value: "Medium events (300–600 guests).", multiline: true, order: 19 },
  { page: "catering", key: "catering_tier_2_price", label: "Package 2 — price", value: "From $1,200", order: 20 },
  { page: "catering", key: "catering_tier_3_name", label: "Package 3 — name", value: "Festival", order: 21 },
  { page: "catering", key: "catering_tier_3_desc", label: "Package 3 — details", value: "Large-scale service (1000+ guests).", multiline: true, order: 22 },
  { page: "catering", key: "catering_tier_3_price", label: "Package 3 — price", value: "Custom Quote", order: 23 },

  // ── Brand Marketing ─────────────────────────────────────────────────────────
  { page: "brand_marketing", key: "bm_hero_title", label: "Hero heading", value: "Get Your Brand Noticed at the Biggest Parades in the U.S.", order: 1 },
  { page: "brand_marketing", key: "bm_hero_subtitle", label: "Hero subheading", value: "Custom branding opportunities across event activations and high-visibility parade placements at iconic celebrations like:", multiline: true, order: 2 },
  { page: "brand_marketing", key: "bm_hero_events", label: "Featured events line", value: "Labody · WIADCA (New York Carnival) · Tropicalfete", order: 3 },
  { page: "brand_marketing", key: "bm_how_title", label: "\"How it works\" heading", value: "How It Works", order: 4 },
  { page: "brand_marketing", key: "bm_how_1_title", label: "Step 1 — title", value: "1. Choose Visibility", order: 5 },
  { page: "brand_marketing", key: "bm_how_1_desc", label: "Step 1 — text", value: "Select options such as branded cups, event banners, flyers, and other graphics.", multiline: true, order: 6 },
  { page: "brand_marketing", key: "bm_how_2_title", label: "Step 2 — title", value: "2. Launch Activation", order: 7 },
  { page: "brand_marketing", key: "bm_how_2_desc", label: "Step 2 — text", value: "We deploy at high-energy events and drive brand awareness.", multiline: true, order: 8 },
  { page: "brand_marketing", key: "bm_how_3_title", label: "Step 3 — title", value: "3. Measure Impact", order: 9 },
  { page: "brand_marketing", key: "bm_how_3_desc", label: "Step 3 — text", value: "Social media posts and real customer engagement.", multiline: true, order: 10 },
  { page: "brand_marketing", key: "bm_stat_1_number", label: "Stat 1 — number", value: "1000", order: 11 },
  { page: "brand_marketing", key: "bm_stat_1_suffix", label: "Stat 1 — suffix (+/%)", value: "+", order: 12 },
  { page: "brand_marketing", key: "bm_stat_1_label", label: "Stat 1 — label", value: "Happy Customers", order: 13 },
  { page: "brand_marketing", key: "bm_stat_2_number", label: "Stat 2 — number", value: "50", order: 14 },
  { page: "brand_marketing", key: "bm_stat_2_suffix", label: "Stat 2 — suffix (+/%)", value: "+", order: 15 },
  { page: "brand_marketing", key: "bm_stat_2_label", label: "Stat 2 — label", value: "Events Served", order: 16 },
  { page: "brand_marketing", key: "bm_stat_3_number", label: "Stat 3 — number", value: "100", order: 17 },
  { page: "brand_marketing", key: "bm_stat_3_suffix", label: "Stat 3 — suffix (+/%)", value: "%", order: 18 },
  { page: "brand_marketing", key: "bm_stat_3_label", label: "Stat 3 — label", value: "Satisfaction Rate", order: 19 },
  { page: "brand_marketing", key: "bm_videos_title", label: "Videos heading", value: "Examples of Our Popularity", order: 20 },
  { page: "brand_marketing", key: "bm_videos_subtitle", label: "Videos subheading", value: "Real footage from live events, showcasing crowd engagement and brand visibility.", multiline: true, order: 21 },
  { page: "brand_marketing", key: "bm_packages_title", label: "Packages heading", value: "Collab Packages", order: 22 },
  { page: "brand_marketing", key: "bm_tier_1_name", label: "Package 1 — name", value: "Bronze", order: 23 },
  { page: "brand_marketing", key: "bm_tier_1_benefits", label: "Package 1 — benefits (one per line)", value: "Product sampling table\nSocial media shout-out", multiline: true, order: 24 },
  { page: "brand_marketing", key: "bm_tier_1_price", label: "Package 1 — price", value: "From $2,500", order: 25 },
  { page: "brand_marketing", key: "bm_tier_2_name", label: "Package 2 — name", value: "Silver", order: 26 },
  { page: "brand_marketing", key: "bm_tier_2_benefits", label: "Package 2 — benefits (one per line)", value: "All Bronze features\nCo-branding", multiline: true, order: 27 },
  { page: "brand_marketing", key: "bm_tier_2_price", label: "Package 2 — price", value: "From $4,000", order: 28 },
  { page: "brand_marketing", key: "bm_tier_3_name", label: "Package 3 — name", value: "Gold", order: 29 },
  { page: "brand_marketing", key: "bm_tier_3_benefits", label: "Package 3 — benefits (one per line)", value: "All Bronze & Silver features\nFull branding on cups", multiline: true, order: 30 },
  { page: "brand_marketing", key: "bm_tier_3_price", label: "Package 3 — price", value: "From $6,000", order: 31 },
  { page: "brand_marketing", key: "bm_footer_cta", label: "Closing line", value: "Have a custom idea? We'd love to hear it.", order: 32 },
];

const DEFAULTS_BY_KEY: Record<string, string> = Object.fromEntries(
  DEFAULT_PAGE_CONTENT.map((f) => [f.key, f.value]),
);

export type ContentMap = Record<string, string>;

// Public read: defaults overlaid with any DB overrides. Resilient — if the table
// doesn't exist yet (pre `prisma db push`) or the DB is unreachable, returns
// defaults so the page still renders.
export async function getPageContent(page: PageKey): Promise<ContentMap> {
  const map: ContentMap = {};
  for (const f of DEFAULT_PAGE_CONTENT) {
    if (f.page === page) map[f.key] = f.value;
  }
  try {
    const rows = await db.pageContent.findMany({ where: { page } });
    for (const r of rows) map[r.key] = r.value;
  } catch {
    // table not migrated yet or DB unreachable — defaults are fine
  }
  return map;
}

// Admin read: every field (defaults merged with saved values) so the editor can
// render all inputs even before anything has been saved.
export async function getEditableFields(page: PageKey): Promise<ContentField[]> {
  const fields = DEFAULT_PAGE_CONTENT.filter((f) => f.page === page).map((f) => ({ ...f }));
  try {
    const rows = await db.pageContent.findMany({ where: { page } });
    const saved: Record<string, string> = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    for (const f of fields) if (saved[f.key] !== undefined) f.value = saved[f.key];
  } catch {
    // fall back to defaults
  }
  return fields.sort((a, b) => a.order - b.order);
}

export function defaultValue(key: string): string {
  return DEFAULTS_BY_KEY[key] ?? "";
}
