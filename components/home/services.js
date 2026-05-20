"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Users, Headset, Map, Plane, Hotel, MoonStar, ArrowUpRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Hajj & Umrah Packages",
    desc: "Customizable travel packages ranging from carefully curated budget tracks to absolute luxury experiences.",
    icon: <MoonStar size={24} />,
    span: "lg:col-span-2 lg:row-span-2 min-h-[420px]",
    badge: "Most Popular",
    isHero: true, // Special flag to inject premium layout UI elements
  },
  {
    title: "Guided Tours",
    desc: "Step-by-step ritual guidance by knowledgeable professionals.",
    icon: <Map size={24} />,
    span: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
  },
  {
    title: "Accommodation",
    desc: "Comfortable, premium, well-located hotels directly near the Holy Sites.",
    icon: <Hotel size={24} />,
    span: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
  },
  {
    title: "Travel Logistics",
    desc: "End-to-end priority visa processing & coordinated flight booking for a completely hassle-free journey.",
    icon: <Plane size={24} />,
    span: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
  },
  {
    title: "24/7 Premium Support",
    desc: "Dedicated ground assistance teams ready for seamless travel logistics and real-time emergency resolution.",
    icon: <Headset size={24} />,
    span: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
  },
  {
    title: "Custom Group Formations",
    desc: "Exclusive tailored pricing matrix and synchronized arrangements for families or corporate delegations.",
    icon: <Users size={24} />,
    span: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

function ServiceCard({ service }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const radialSpotlight = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(230, 130, 19, 0.09),
      transparent 80%
    )
  `;

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(230, 130, 19, 0.4),
      transparent 75%
    )
  `;

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      className={`group relative flex flex-col justify-between p-8 overflow-hidden rounded-[32px] 
        border border-slate-200/60 dark:border-white/10 
        bg-white dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-md
        transition-all duration-500 will-change-transform ${service.span}`}
    >
      {/* GLOW OVERLAYS */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: radialSpotlight }}
      />
      <motion.div 
        className="absolute -inset-[1px] rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{ background: borderSpotlight }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div>
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E68213] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              {service.icon}
            </div>

            {service.badge && (
              <div className="rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E68213]">
                {service.badge}
              </div>
            )}
          </div>

          {/* MAIN CONTENT SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`${service.isHero ? "lg:col-span-6" : "lg:col-span-12"} space-y-4`}>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-gray-400">
                {service.desc}
              </p>
            </div>

            {/* UPGRADE INTERACTIVE DASHBOARD GRAPHIC FOR LARGE BLOCK */}
            {service.isHero && (
              <div className="lg:col-span-6 w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Route Overview</span>
                  <span className="text-xs font-extrabold text-[#0070A1]">Premium Inclusive</span>
                </div>
                {/* Simulated Track Line */}
                <div className="flex items-center justify-between relative py-2">
                  <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-[2px] bg-dashed border-b border-dashed border-slate-300 dark:border-zinc-700 -z-10" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-slate-800 dark:text-white">LHE</span>
                    <span className="text-[10px] text-slate-400">Departure</span>
                  </div>
                  <Plane size={14} className="text-[#E68213] animate-pulse" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-slate-800 dark:text-white">JED</span>
                    <span className="text-[10px] text-slate-400">Arrival</span>
                  </div>
                </div>
                {/* Feature Checklist Tags */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#E68213]" /> 5-Star Luxury Hotels</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#E68213]" /> Full Visa Approval</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#E68213]" /> Guided Ziyarats</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#E68213]" /> 24/7 Logistics</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER BUTTON ACTION LINK */}
        <div className="mt-6 flex justify-end w-full">
          <div className="h-10 w-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 
            text-slate-500 dark:text-gray-400 group-hover:text-white group-hover:bg-[#E68213] group-hover:border-[#E68213] 
            transition-all duration-300"
          >
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesBentoGrid() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black 
    py-24 text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* AMBIENT LAYOUT FLOW GLOW GRADIENTS */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#E68213]/10 dark:bg-[#E68213]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#0070A1]/10 dark:bg-[#0070A1]/15 blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        
        {/* BANNER CONTENT CAP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#E68213] font-bold">
              Exclusive Services
            </span>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              Your Holy Journey,
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent"> Refined & Perfected</span>
            </h2>
          </div>
        </div>

        {/* GRID LAYOUT MOUNT FRAME */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
