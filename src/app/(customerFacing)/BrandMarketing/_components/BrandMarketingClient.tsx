"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ContentMap } from "@/lib/pageCms";

// Lightweight count-up (no extra dependency) — animates once when scrolled into view.
function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export default function BrandMarketingClient({
  content,
  heroUrl,
}: {
  content: ContentMap;
  heroUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ Company: "", Name: "", Email: "", Phone: "", Budget: "", Notes: "" });

  const c = (key: string) => content[key] ?? "";

  const steps = [1, 2, 3].map((i) => ({ title: c(`bm_how_${i}_title`), desc: c(`bm_how_${i}_desc`) }));
  const stats = [1, 2, 3].map((i) => ({
    number: parseInt(c(`bm_stat_${i}_number`) || "0", 10),
    suffix: c(`bm_stat_${i}_suffix`),
    label: c(`bm_stat_${i}_label`),
  }));
  const tiers = [1, 2, 3].map((i) => ({
    name: c(`bm_tier_${i}_name`),
    benefits: c(`bm_tier_${i}_benefits`).split("\n").filter(Boolean),
    price: c(`bm_tier_${i}_price`),
  }));
  const videos = ["/videos/video-1.mp4", "/videos/video-2.mp4", "/videos/video-3.mp4"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const loadingToast = toast.loading("Sending your request...");
    try {
      const res = await fetch("/api/sendMarketingEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Thanks! Your collaboration request has been sent.", { id: loadingToast });
        setOpen(false);
        setFormData({ Company: "", Name: "", Email: "", Phone: "", Budget: "", Notes: "" });
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
    <main className="flex flex-col items-center w-full md:w-[90vw] pt-20 p-2 space-y-16">
      {/* Hero */}
      <section className="relative w-full max-w-6xl h-[80vh] min-h-[28rem] overflow-hidden rounded-3xl flex items-center justify-center text-center">
        <Image src={heroUrl} alt="1Cato brand activation at a night festival" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/50" />
        <div className="relative z-10 px-5 sm:px-8 max-w-3xl space-y-5 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{c("bm_hero_title")}</h1>
          <p className="text-lg md:text-xl text-white/90">{c("bm_hero_subtitle")}</p>
          <p className="text-orange-400 font-semibold text-md md:text-lg">{c("bm_hero_events")}</p>
          <div className="pt-2">
            <Button variant="mainButton" size="lg" className="rounded-full text-md px-8" onClick={() => setOpen(true)}>
              Collaborate Now
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-6xl text-center space-y-10">
        <h2 className="text-3xl font-bold">{c("bm_how_title")}</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={i} className="rounded-2xl shadow-md">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="text-center w-full max-w-4xl space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-orange-500">
                <CountUp end={s.number} suffix={s.suffix} />
              </p>
              <p className="font-semibold text-stone-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popularity videos */}
      <section className="w-full max-w-6xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{c("bm_videos_title")}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{c("bm_videos_subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((src, i) => (
            <div
              key={i}
              className="aspect-video rounded-2xl overflow-hidden bg-stone-100"
              onMouseEnter={(e) => {
                const v = e.currentTarget.querySelector("video");
                if (v) { v.controls = true; v.play().catch(() => {}); }
              }}
              onMouseLeave={(e) => {
                const v = e.currentTarget.querySelector("video");
                if (v) { v.pause(); v.currentTime = 0; v.controls = false; }
              }}
            >
              <video src={src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="w-full max-w-6xl space-y-10">
        <h2 className="text-3xl font-bold text-center">{c("bm_packages_title")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Card key={i} className="rounded-2xl shadow-md flex flex-col">
              <CardContent className="p-6 space-y-3 flex flex-col flex-1">
                <h3 className="text-2xl font-bold">{t.name}</h3>
                <ul className="text-gray-600 space-y-1 flex-1">
                  {t.benefits.map((b, j) => (
                    <li key={j}>• {b}</li>
                  ))}
                </ul>
                <p className="text-xl font-semibold">{t.price}</p>
                <Button variant="mainButton" className="rounded-full mt-2" onClick={() => setOpen(true)}>
                  Request Collab
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center space-y-4 pb-8">
        <p className="text-lg">{c("bm_footer_cta")}</p>
        <Button variant="mainButton" className="rounded-full px-8" onClick={() => setOpen(true)}>
          Let&apos;s Talk Collab
        </Button>
      </section>

      {/* Collab form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle>Request a Collaboration</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input aria-label="Company name" placeholder="Company Name" value={formData.Company} onChange={(e) => setFormData({ ...formData, Company: e.target.value })} required />
            <Input aria-label="Your name" placeholder="Your Name" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required />
            <Input aria-label="Your email" placeholder="Email" type="email" value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} required />
            <Input aria-label="Your phone number" placeholder="Phone" type="tel" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} required />
            <Input aria-label="Budget or desired exposure" placeholder="Budget / Desired Exposure" value={formData.Budget} onChange={(e) => setFormData({ ...formData, Budget: e.target.value })} />
            <Textarea aria-label="About your brand and goals" placeholder="Tell us about your brand and goals" value={formData.Notes} onChange={(e) => setFormData({ ...formData, Notes: e.target.value })} />
            <Button type="submit" variant="mainButton" className="w-full text-md" disabled={submitting}>
              {submitting ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
