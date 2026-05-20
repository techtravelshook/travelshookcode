"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, PhoneCall, FileText, CheckSquare, Luggage } from "lucide-react";
import Link from "next/link";

const stepsData = [
  {
    id: "01",
    title: "Explore Packages",
    description: "Browse our carefully curated Hajj & Umrah packages to find your perfect spiritual match.",
    icon: Compass,
  },
  {
    id: "02",
    title: "Contact Our Team",
    description: "Get personalised guidance from our dedicated Umrah specialists available around the clock.",
    icon: PhoneCall,
  },
  {
    id: "03",
    title: "Receive Quotation",
    description: "Get a fully itemised breakdown of all costs — transparent pricing, zero hidden charges.",
    icon: FileText,
  },
  {
    id: "04",
    title: "Confirm Booking",
    description: "Secure your sacred journey with a simple flexible deposit and tailored payment plan.",
    icon: CheckSquare,
  },
  {
    id: "05",
    title: "Prepare for Journey",
    description: "We handle every logistic detail while you focus fully on your spiritual preparation.",
    icon: Luggage,
  },
];

function StepCard({ step, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col w-full"
    >
      {/* Desktop dotted connector line */}
      {index < total - 1 && (
        <div className="hidden xl:block absolute top-[52px] left-[calc(100%-8px)] w-[calc(100%-64px)] z-0 pointer-events-none">
          <div className="h-px w-full border-t-2 border-dashed border-orange-200 dark:border-orange-900/40" />
          <motion.div
            className="absolute -top-[3px] w-1.5 h-1.5 rounded-full bg-[#F6931F]"
            animate={inView ? { left: ["0%", "100%"] } : { left: "0%" }}
            transition={{
              duration: 1.8,
              delay: index * 0.12 + 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
        </div>
      )}

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl border min-h-[270px] flex flex-col
          bg-white dark:bg-[#020d14]
          border-slate-200/70 dark:border-white/[0.06]
          transition-all duration-500 cursor-default
          hover:border-orange-300/60 dark:hover:border-orange-500/20
          hover:shadow-[0_8px_40px_-8px_rgba(246,147,31,0.2)]
          dark:hover:shadow-[0_8px_40px_-8px_rgba(246,147,31,0.08)]"
      >
        {/* Gradient top bar */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-1 font-black text-[80px] leading-none select-none pointer-events-none
            text-slate-100 dark:text-white/[0.025]
            group-hover:text-orange-100 dark:group-hover:text-orange-500/[0.04]
            transition-colors duration-500"
        >
          {step.id}
        </span>

        <div className="relative z-10 flex flex-col h-full p-6 gap-5">
          {/* Icon + Badge */}
          <div className="flex items-start justify-between">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-2xl
                bg-slate-100 dark:bg-white/[0.04]
                border border-slate-200/60 dark:border-white/[0.06]
                group-hover:bg-gradient-to-br group-hover:from-[#F6931F] group-hover:to-[#0070A1]
                group-hover:border-transparent
                transition-all duration-500"
            >
              <Icon
                className="w-5 h-5 text-[#0070A1] dark:text-[#F6931F] group-hover:text-white transition-colors duration-500"
                strokeWidth={1.8}
              />
            </div>

            <span
              className="text-[10px] font-black tracking-[0.18em] font-mono px-2.5 py-1 rounded-full
                bg-slate-100 dark:bg-white/[0.04]
                text-slate-400 dark:text-white/30
                group-hover:text-[#F6931F] group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10
                transition-all duration-300"
            >
              STEP {step.id}
            </span>
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-2 mt-auto">
            <h3
              className="text-[15px] font-black tracking-tight leading-snug
                text-slate-900 dark:text-white
                group-hover:text-[#0070A1] dark:group-hover:text-[#F6931F]
                transition-colors duration-300"
            >
              {step.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile flow indicator */}
      {index < total - 1 && (
        <div className="xl:hidden flex items-center justify-center gap-2 mt-4 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F6931F] opacity-50" />
          <div className="h-px w-8 border-t-2 border-dashed border-orange-200 dark:border-orange-900/40" />
        </div>
      )}
    </motion.div>
  );
}

export default function BookingProcess() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 w-full overflow-hidden bg-[#FAFAF8] dark:bg-[#01080C] transition-colors duration-500">

      {/* Decorative rings — top left */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 opacity-30 dark:opacity-10">
        <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
          {[40, 70, 100, 130, 160].map((r) => (
            <circle key={r} cx="170" cy="170" r={r} stroke="#F6931F" strokeWidth="0.8" opacity="0.5" />
          ))}
          <polygon
            points="170,20 310,100 310,240 170,320 30,240 30,100"
            stroke="#F6931F"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Decorative rings — bottom right */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 opacity-20 dark:opacity-10">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
          {[30, 55, 80, 105].map((r) => (
            <circle key={r} cx="130" cy="130" r={r} stroke="#0070A1" strokeWidth="0.8" opacity="0.5" />
          ))}
        </svg>
      </div>

      {/* FIXED: Changed to full fluid viewport width alignment matching upper panels */}
      <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-12">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-3 mb-16 max-w-xl"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-0.5 rounded-full bg-[#F6931F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#F6931F]">
              Seamless Journey
            </span>
          </div>

          <h2 className="text-3xl sm:text-[2.6rem] font-black text-jost tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            Simple Booking{" "}
            <em className="not-italic font-serif normal-case font-bold bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">
              Process
            </em>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            We have simplified every operational milestone so you can plan your spiritual pilgrimage with absolute peace of mind.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 w-full items-start">
          {stepsData.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} total={stepsData.length} />
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-8 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ready to begin your sacred journey?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Our specialists are here to guide you every single step of the way.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/packages" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#0070A1] dark:hover:text-[#F6931F] transition-colors">
              View Packages
            </Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-orange-500 hover:opacity-90 transition-all font-bold text-xs text-white shadow-md shadow-orange-500/10">
              Get Started Now
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
