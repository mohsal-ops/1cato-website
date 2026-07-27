"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ContentMap } from "@/lib/pageCms";

// Static image + label pairs for the "We Cater To" grid. Titles could be moved
// into the CMS later; the images live in /public/general/catering.
const CATEGORIES = [
  { img: "/general/catering/schoolevent.png", title: "Schools & Fundraisers" },
  { img: "/general/catering/corporate.jpeg", title: "Corporate Events" },
  { img: "/general/catering/private-parties.png", title: "Weddings & Private Parties" },
  { img: "/general/catering/festivals.jpeg", title: "Festivals & Fairs" },
  { img: "/general/catering/sports.webp", title: "Sports & Competitions" },
  { img: "/general/catering/community.webp", title: "Community Gatherings" },
];

export default function CateringPageClient({
  content,
  heroUrl,
}: {
  content: ContentMap;
  heroUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const packagesRef = useRef<HTMLDivElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    EventType: "",
    Date: "",
    Guests: "",
    Notes: "",
  });

  const c = (key: string) => content[key] ?? "";

  const why = [1, 2, 3, 4].map((i) => ({
    title: c(`catering_why_${i}_title`),
    desc: c(`catering_why_${i}_desc`),
  }));
  const tiers = [1, 2, 3].map((i) => ({
    name: c(`catering_tier_${i}_name`),
    desc: c(`catering_tier_${i}_desc`),
    price: c(`catering_tier_${i}_price`),
  }));

  const scrollToPackages = () => {
    if (!packagesRef.current) return;
    const top = packagesRef.current.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const loadingToast = toast.loading("Sending your request...");
    try {
      const res = await fetch("/api/sendCateringEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Your quote request has been sent!", { id: loadingToast });
        setOpen(false);
        setFormData({ Name: "", Email: "", Phone: "", EventType: "", Date: "", Guests: "", Notes: "" });
      } else {
        toast.error("Failed to send. Please try again.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to send. Please try again.", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full md:w-[90vw] pt-20 p-2 space-y-16">
      {/* Hero */}
      <section className="relative w-full max-w-6xl h-[80vh] min-h-[28rem] overflow-hidden rounded-3xl flex items-center justify-center text-center">
        <Image src={heroUrl} alt="1Cato snow cone catering at a community event" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />
        <div className="relative z-10 px-5 sm:px-8 max-w-3xl space-y-5 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">{c("catering_hero_title")}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">{c("catering_hero_subtitle")}</p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button variant="mainButton" size="lg" className="text-md px-6" onClick={() => setOpen(true)}>
              Request a Quote
            </Button>
            <Button variant="outline" size="lg" className="text-md px-6 bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white" onClick={scrollToPackages}>
              See Packages
            </Button>
          </div>
          <p className="text-sm text-white/70 pt-1">{c("catering_hero_badge")}</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-center max-w-6xl w-11/12 sm:w-full space-y-10">
        <h2 className="text-3xl font-bold">{c("catering_why_title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {why.map((f, i) => (
            <Card key={i} className="rounded-2xl shadow-md bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* We Cater To */}
      <section className="w-full max-w-6xl space-y-10">
        <h2 className="text-3xl font-bold text-center">{c("catering_categories_title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Card key={cat.title} className="rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition duration-300">
              <div className="relative w-full h-48">
                <Image src={cat.img} alt={cat.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <CardContent className="p-5 text-center font-semibold text-lg">{cat.title}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Packages & Pricing */}
      <section ref={packagesRef} className="w-full max-w-6xl space-y-10 scroll-mt-24">
        <h2 className="text-3xl font-bold text-center">{c("catering_packages_title")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((p, i) => (
            <Card key={i} className="rounded-2xl shadow-md bg-white flex flex-col">
              <CardContent className="p-6 space-y-3 flex flex-col flex-1">
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <p className="text-gray-500 flex-1">{p.desc}</p>
                <p className="text-xl font-semibold">{p.price}</p>
                <Button variant="mainButton" className="rounded-full mt-2" onClick={() => setOpen(true)}>
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle>Request a Catering Quote</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input aria-label="Your name" placeholder="Your Name" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required />
            <Input aria-label="Your email" placeholder="Email" type="email" value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} required />
            <Input aria-label="Your phone number" placeholder="Phone" type="tel" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} required />
            <Input aria-label="Event type" placeholder="Event Type (e.g. School, Festival, Birthday Party)" value={formData.EventType} onChange={(e) => setFormData({ ...formData, EventType: e.target.value })} required />
            <Input aria-label="Event date" placeholder="Date" type="date" value={formData.Date} onChange={(e) => setFormData({ ...formData, Date: e.target.value })} required />
            <Input aria-label="Number of guests" placeholder="Estimated Guests" type="number" min={1} value={formData.Guests} onChange={(e) => setFormData({ ...formData, Guests: e.target.value })} required />
            <Textarea aria-label="Additional notes" placeholder="Additional Notes" value={formData.Notes} onChange={(e) => setFormData({ ...formData, Notes: e.target.value })} />
            <Button type="submit" variant="mainButton" className="w-full text-md" disabled={submitting}>
              {submitting ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
