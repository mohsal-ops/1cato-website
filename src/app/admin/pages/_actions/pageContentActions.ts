"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { DEFAULT_PAGE_CONTENT, type PageKey } from "@/lib/pageCms";

const META_BY_KEY = Object.fromEntries(DEFAULT_PAGE_CONTENT.map((f) => [f.key, f]));

// Upserts the edited fields. Enriches each with its label/page/order/multiline
// from the defaults so we only trust known keys (ignores anything unexpected).
export async function savePageContent(
  page: PageKey,
  values: { key: string; value: string }[],
) {
  try {
    for (const { key, value } of values) {
      const meta = META_BY_KEY[key];
      if (!meta || meta.page !== page) continue;
      await db.pageContent.upsert({
        where: { key },
        update: { value },
        create: {
          key,
          value,
          page: meta.page,
          label: meta.label,
          multiline: !!meta.multiline,
          order: meta.order,
        },
      });
    }
    revalidatePath("/catering");
    revalidatePath("/BrandMarketing");
    revalidatePath("/admin/pages");
    return { ok: true, message: "Saved" };
  } catch (error) {
    console.error("savePageContent error:", error);
    return {
      ok: false,
      message:
        "Could not save. If this is the first time, run `npx prisma db push` to create the content table.",
    };
  }
}
