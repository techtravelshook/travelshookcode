import React from "react";
import { notFound } from "next/navigation";
import {
  MapPin, Star, Hotel,
  PlaneTakeoff, Car, ShieldCheck, CheckCircle,
  Compass, Clock, Moon,
} from "lucide-react";
import ImageGallery from "@/components/Holidays/HoneymoonSlider";

async function getPackageData(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/honeymoon/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const payload = await res.json();
    return payload.success ? payload.data : null;
  } catch (error) {
    console.error("Fetch failure error trace:", error);
    return null;
  }
}

export default async function SinglePackagePage(context) {
  const { slug } = await context.params;
  const pkg = await getPackageData(slug);

  if (!pkg) notFound();

  return (

    
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* ── 1. Hero — title overlay on dark bg, NO image here ─────────────── */}
      <div className="pt-12 relative bg-[#0B1F33] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 bg-[#F6931F] text-[#0B1F33] text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-[0.15em] shadow-lg">
            {pkg.type}
            <span className="opacity-40">·</span>
            {pkg.month}
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-[1.05] text-white max-w-3xl">
            {pkg.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm md:text-base text-slate-300 font-medium">
            <MapPin size={16} className="text-[#F6931F]" />
            {pkg.city}, {pkg.country}
          </p>
        </div>
      </div>

      {/* ── 2. Image Gallery — full-width dedicated section ───────────────── */}
      <div className="w-full bg-[#0D1E2E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">

          {/* Section label */}
          <div className="flex items-center justify-between py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Photo gallery
            </p>
            <p className="text-[11px] text-slate-500">
              {pkg.images?.length ?? 0} photos
            </p>
          </div>

          {/* Gallery component — drives its own hero + thumbnails + lightbox */}
        
        </div>
      </div>

      {/* ── 3. Body layout ────────────────────────────────────────────────── */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

      
        
        <div className="lg:col-span-2 space-y-6">

          {/* Overview */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E7E2D6] shadow-sm">
            
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0B1F33]/5 text-[#0B1F33]">
                <Compass size={18} />
              </span>
              
              <h3 className="text-lg md:text-xl font-black text-[#0B1F33] tracking-tight">
                Journey overview
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-[15px]">
              {pkg.description}
            </p>
          </section>
<div className="rounded-2xl overflow-hidden" style={{ height: "460px" }}>
            <ImageGallery images={pkg.images} title={pkg.title} />
          </div>
          {/* Hotels */}
          {pkg.hotels?.length > 0 && (
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E7E2D6] shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600">
                  <Hotel size={18} />
                </span>
                <h3 className="text-lg md:text-xl font-black text-[#0B1F33] tracking-tight">
                  Premium accommodation
                </h3>
              </div>

  



              <div className="space-y-3">
                {pkg.hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="relative pl-5 py-4 pr-4 rounded-2xl bg-[#F7F5F0] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-full before:bg-[#0B1F33]"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h4 className="font-bold text-[#0B1F33] text-sm md:text-base">
                        {hotel.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1F33] bg-[#F6931F]/20 px-2.5 py-1 rounded-full">
                        <Star size={12} className="fill-[#F6931F] text-[#F6931F]" />
                        {hotel.starRating} · {hotel.city}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#F6931F] mt-1.5 tracking-wide">
                      {hotel.durationNights} Nights &middot; {hotel.roomType}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sightseeing */}
          {pkg.sightseeing && (
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E7E2D6] shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600">
                  <CheckCircle size={18} />
                </span>
                <h3 className="text-lg md:text-xl font-black text-[#0B1F33] tracking-tight">
                  Handpicked excursions
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.sightseeing.items?.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs md:text-sm text-slate-700 flex items-start gap-2.5 bg-[#F7F5F0] p-3 rounded-2xl"
                  >
                    <CheckCircle size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN — sticky booking summary */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">

          {/* Price card */}
          <section className="bg-[#0B1F33] p-6 md:p-7 rounded-3xl shadow-lg text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F6931F]/10 blur-2xl" />
            <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              All-inclusive cost
            </span>
            <p className="text-4xl md:text-5xl font-black text-[#F6931F] mt-2 tracking-tight">
              £{pkg.price?.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Per person &middot; Twin-share basis
            </p>
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-bold text-white">
              <div className="bg-white/5 p-3 rounded-xl flex flex-col items-center gap-1">
                <Clock size={14} className="text-[#F6931F]" />
                {pkg.durationDays} Days
              </div>
              <div className="bg-white/5 p-3 rounded-xl flex flex-col items-center gap-1">
                <Moon size={14} className="text-[#F6931F]" />
                {pkg.durationNights} Nights
              </div>
            </div>
          </section>

          {/* Logistics */}
          <section className="bg-white p-5 md:p-6 rounded-3xl border border-[#E7E2D6] shadow-sm space-y-4">
            <h4 className="font-bold text-[#0B1F33] uppercase tracking-[0.15em] text-[11px]">
              Logistics &amp; transit
            </h4>

            {pkg.flights && (
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 text-sky-500 shrink-0">
                  <PlaneTakeoff size={16} />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-[#0B1F33]">Return flights included</p>
                  <p className="text-slate-500 mt-0.5">
                    Destination: {pkg.flights.destination}
                  </p>
                  <p className="text-slate-400 mt-0.5">
                    Departing from: {pkg.flights.departureCities?.join(", ")}
                  </p>
                </div>
              </div>
            )}

            {pkg.transportation && (
              <div className="flex gap-3 pt-4 border-t border-[#E7E2D6]">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 shrink-0">
                  <Car size={16} />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-[#0B1F33]">{pkg.transportation.type}</p>
                  <p className="text-slate-500 mt-0.5">{pkg.transportation.routeDetails}</p>
                </div>
              </div>
            )}

            {pkg.visaAssistance && (
              <div className="flex gap-3 pt-4 border-t border-[#E7E2D6]">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 text-orange-500 shrink-0">
                  <ShieldCheck size={16} />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-[#0B1F33]">Visa support assistance</p>
                  <p className="text-slate-500 mt-0.5">
                    {pkg.visaAssistance.supportedRegion}
                  </p>
                  <p className="text-slate-400 mt-0.5">
                    Processed by: {pkg.visaAssistance.agency}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}