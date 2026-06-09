"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle, Clock, Star, Plane, FileCheck, Bus,
  Hotel, Utensils, Headphones, CheckCircle2, XCircle,
} from "lucide-react";
import { useHolidayPackages } from "@/hooks/useHolidayPackages";

/* ── Star label helper ─────────────────────────────────────── */
function starLabel(star) {
  const map = { STAR_3: "3 Star", STAR_4: "4 Star", STAR_5: "5 Star" };
  return map[star] || null;
}

/* ── Fixed features ─────────────────────────────────────────── */
const FIXED_FEATURES = [
  { icon: Plane,      label: "Return Flights"     },
  { icon: FileCheck,  label: "Visa Processing"    },
  { icon: Bus,        label: "Airport Transfers"  },
  { icon: Hotel,      label: "Hotel Stay"         },
  { icon: Utensils,   label: "Meals Included"     },
  { icon: Headphones, label: "24/7 Support"       },
];

/* ── ZigzagCard ─────────────────────────────────────────────── */
function ZigzagCard({ pkg, index }) {
  const isEven = index % 2 === 0;

  const rawSrc = pkg.images?.[0]?.url || "";
  const imageSrc = rawSrc
    ? rawSrc.startsWith("http") || rawSrc.startsWith("/") ? rawSrc : `/${rawSrc}`
    : "/imgs/placeholder.jpg";

  const starText = starLabel(pkg.star);
  const inclusions = pkg.inclusions || [];
  const exclusions = pkg.exclusions || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col md:grid md:grid-cols-2 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/30 transition-all duration-500"
    >
      {/* ── Image ── */}
      <div
        className={`relative w-full h-56 sm:h-72 md:h-auto md:min-h-[420px] overflow-hidden shrink-0 ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={imageSrc}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {pkg.duration && (
          <div className="absolute top-3 left-3 bg-[#F6931F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Clock size={11} />
            {pkg.duration} Days
          </div>
        )}

        {starText && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 font-bold">
            <Star size={11} className="text-[#F6931F]" fill="#F6931F" />
            {starText}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div
        className={`flex flex-col p-5 sm:p-7 md:p-10 bg-white dark:bg-[#01080C] ${
          isEven ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Badge + title + desc */}
        <div className="space-y-2.5">
          {pkg.type && (
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold text-[#0070A1] bg-[#0070A1]/10 dark:bg-white/[0.05] px-3 py-1 rounded-full border border-[#0070A1]/20">
              {pkg.type}
            </span>
          )}

          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight group-hover:text-[#F6931F] transition-colors duration-300">
            {pkg.title}
          </h3>

          {pkg.shortDesc && (
            <p className="text-sm font-semibold text-[#0070A1] dark:text-[#5fb8e0] leading-relaxed">
              {pkg.shortDesc}
            </p>
          )}

          {pkg.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
              {pkg.description}
            </p>
          )}
        </div>

        {/* Fixed Features Grid */}
        <div className="mt-5">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 mb-3">
            What&apos;s Included
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FIXED_FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05]"
              >
                <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#0070A1]/10 dark:bg-white/[0.06] flex items-center justify-center">
                  <Icon size={12} className="text-[#0070A1] dark:text-[#5fb8e0]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic inclusions/exclusions */}
        {(inclusions.length > 0 || exclusions.length > 0) && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/[0.05]">
            {inclusions.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-600 dark:text-green-400 mb-2">
                  Inclusions
                </p>
                <ul className="space-y-1.5">
                  {inclusions.map((inc) => (
                    <li key={inc.id} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      <CheckCircle2 size={13} className="text-green-500 shrink-0 mt-0.5" />
                      {inc.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {exclusions.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-500 dark:text-rose-400 mb-2">
                  Exclusions
                </p>
                <ul className="space-y-1.5">
                  {exclusions.map((exc) => (
                    <li key={exc.id} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      <XCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                      {exc.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex flex-col xs:flex-row items-start xs:items-end justify-between gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.05]">
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
              Starting from
            </p>
            <p className="text-3xl font-black text-[#F6931F] leading-none tracking-tight font-mono">
              £{pkg.price}
            </p>
            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-1">
              ✔ Secure Booking
            </p>
          </div>

          <Link
            href="/contact"
            className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[11px] font-black uppercase tracking-widest shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            BOOK NOW
            <CheckCircle2 size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skeleton ───────────────────────────────────────────────── */
function SkeletonCard({ flip }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-100 dark:border-white/[0.05] animate-pulse">
      <div
        className={`h-56 sm:h-72 md:h-80 bg-slate-200 dark:bg-white/[0.05] ${
          flip ? "md:order-2" : "md:order-1"
        }`}
      />
      <div
        className={`p-5 sm:p-8 space-y-4 bg-white dark:bg-[#01080C] ${
          flip ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="h-4 w-20 bg-slate-200 dark:bg-white/[0.05] rounded-full" />
        <div className="h-8 w-3/4 bg-slate-200 dark:bg-white/[0.05] rounded-xl" />
        <div className="h-4 w-full bg-slate-100 dark:bg-white/[0.03] rounded-lg" />
        <div className="h-4 w-5/6 bg-slate-100 dark:bg-white/[0.03] rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 dark:bg-white/[0.03] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────── */
export default function HolidaysSec({ slug }) {
  const { packages, loading, error } = useHolidayPackages({ type: "HOLIDAY" });
  const filtered = slug ? packages.filter((p) => p.slug === slug) : packages;

  return (
    <section className="w-full py-8 sm:py-12 bg-slate-50 dark:bg-[#01080C] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex rounded-full bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213] mb-3">
            Explore the World
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
            Holiday{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-serif">
              Places
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            Handpicked destinations crafted for every kind of traveller — from desert adventures to island escapes.
          </p>
        </div>

        {loading && (
          <div className="space-y-5 sm:space-y-6">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} flip={i % 2 !== 0} />)}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <AlertCircle size={36} className="text-rose-400" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-semibold text-slate-400">No holiday packages found.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-5 sm:space-y-8">
            {filtered.map((pkg, i) => (
              <ZigzagCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}