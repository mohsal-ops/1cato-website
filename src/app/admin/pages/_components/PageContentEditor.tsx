"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { savePageContent } from "../_actions/pageContentActions";
import type { ContentField, PageKey } from "@/lib/pageCms";

function Section({ page, title, fields }: { page: PageKey; title: string; fields: ContentField[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );
  const [isPending, startTransition] = useTransition();

  const dirty = fields.some((f) => values[f.key] !== f.value);

  const save = () => {
    startTransition(async () => {
      const res = await savePageContent(
        page,
        fields.map((f) => ({ key: f.key, value: values[f.key] ?? "" })),
      );
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-stone-900">{title}</h2>
        <Button variant="mainButton" size="sm" onClick={save} disabled={isPending || !dirty}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.multiline ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
            <Label className="text-xs font-medium text-stone-500">{f.label}</Label>
            {f.multiline ? (
              <Textarea
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={3}
              />
            ) : (
              <Input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageContentEditor({
  catering,
  brandMarketing,
}: {
  catering: ContentField[];
  brandMarketing: ContentField[];
}) {
  return (
    <div className="space-y-6">
      <Section page="catering" title="Catering page" fields={catering} />
      <Section page="brand_marketing" title="Brand Marketing page" fields={brandMarketing} />
    </div>
  );
}
