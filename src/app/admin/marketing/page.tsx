import db from "@/db/db";
import PageHeader from "../_components/pageHeader";
import MarketingInbox from "./_components/MarketingInbox";

export const dynamic = "force-dynamic";

export default async function MarketingPage() {
  const [leads, newCount] = await Promise.all([
    db.marketingLead.findMany({ orderBy: { createdAt: "desc" } }),
    db.marketingLead.count({ where: { status: "new" } }),
  ]);

  return (
    <div className="lg:flex justify-center">
      <div className="p-5 space-y-3 w-full lg:w-[80%]">
        <div className="flex items-center gap-3 px-4 md:px-0">
          <PageHeader>Brand Marketing Leads</PageHeader>
          {newCount > 0 && (
            <span className="inline-flex items-center justify-center text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
              {newCount} new
            </span>
          )}
        </div>
        <MarketingInbox leads={leads} />
      </div>
    </div>
  );
}
