"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function updateMarketingStatus(id: string, status: string) {
  await db.marketingLead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/marketing");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteMarketingLead(id: string) {
  await db.marketingLead.delete({ where: { id } });
  revalidatePath("/admin/marketing");
  revalidatePath("/admin");
  return { ok: true };
}
