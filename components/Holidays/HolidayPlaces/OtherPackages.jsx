"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, ChevronRight, ArrowRight,
  Flame, Plane, Hotel, Coffee, Car,
} from "lucide-react";
import { otherPackages } from "./HolidayData";
import { AmenityPill } from "./Holidayui";


export default function OtherPackages() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-white dark:bg-[#030712]">

      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#F6931F]/2 dark:bg-[#F6931F]/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame size={13} className="text-[#F6931F]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-[#F6931F] to-[#0070A1] rounded-full p-6 ">
                Explore More
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              More Adventures
              <br />
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">
                  Await You

                </span>
            </h2>
          </div>

          <Link
            href="/holidays"
            className="flex items-center gap-2 text-sm font-bold text-[#0070A1] hover:text-[#F6931F] transition-colors group whitespace-nowrap"
          >
            Browse All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── 3-column Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {otherPackages.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/holidays/${pkg.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#0b101b] border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-lg dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-1 cursor-pointer">

                  {/* ── Image ── */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    {/* Icon + destination */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-xl">{pkg.icon}</span>
                      <span className="text-xs font-bold text-white/90 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {pkg.destination}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black text-slate-700 dark:text-white">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {pkg.title}
                    </h3>

                    {/* Hotel / Food / Duration */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <Hotel size={11} className="text-slate-400 shrink-0" />
                        <span className="truncate font-medium">{pkg.hotel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <Coffee size={11} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{pkg.food}</span>
                        <span className="mx-1 text-slate-300 dark:text-slate-600">·</span>
                        <Car size={11} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{pkg.days} Days</span>
                      </div>
                    </div>

                    {/* Amenity pills */}
                    <div className="flex flex-wrap gap-1">
                      {pkg.amenities.map((a) => (
                        <AmenityPill key={a} label={a} />
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 line-through">
                          {pkg.originalPrice}
                        </span>
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {pkg.price}
                          <span className="text-[10px] font-medium text-slate-400 ml-0.5">/ pp</span>
                        </span>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold group-hover:bg-[#F6931F] dark:group-hover:bg-[#F6931F] dark:group-hover:text-white transition-all duration-300"
                      >
                        Book Now <ChevronRight size={11} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  );
}