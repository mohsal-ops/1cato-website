import PageHeader from "../_components/pageHeader";
import PageContentEditor from "./_components/PageContentEditor";
import { getEditableFields } from "@/lib/pageCms";

export const dynamic = "force-dynamic";

export default async function PagesAdmin() {
  const [catering, brandMarketing] = await Promise.all([
    getEditableFields("catering"),
    getEditableFields("brand_marketing"),
  ]);

  return (
    <div className="lg:flex justify-center">
      <div className="p-5 space-y-3 w-full lg:w-[80%]">
        <PageHeader>Pages</PageHeader>
        <p className="text-sm text-stone-500 px-4 md:px-0">
          Edit the copy and pricing on the Catering &amp; Brand Marketing pages. Hero photos are
          managed under Images.
        </p>
        <PageContentEditor catering={catering} brandMarketing={brandMarketing} />
      </div>
    </div>
  );
}
