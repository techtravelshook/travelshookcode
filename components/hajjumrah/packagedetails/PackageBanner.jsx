"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Star,
  Plane,
  Hotel,
  Users,
  FileCheck,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: FileCheck,
    label: "Visa Processing",
    desc: "Fast-track visa approvals with complete documentation support",
  },
  {
    icon: Hotel,
    label: "Luxury Hotels",
    desc: "Premium stays near Haram & Masjid-e-Nabawi",
  },
  {
    icon: Plane,
    label: "Flight Packages",
    desc: "Flexible UK departures with trusted airline partners",
  },
  {
    icon: Users,
    label: "Family Guidance",
    desc: "Dedicated support for families, seniors & groups",
  },
];

export default function PackageBanner({
  onContactClick,

}) {
  const whatsappNumber = "442038766846";
  const whatsappMsg = encodeURIComponent(
    "As-salamu alaykum! I am interested in your Umrah Packages."
  );

 const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `all 0.6s ${delay}s ease`,
  });

  return (
    <section ref={ref} className="relative w-full px-2 py-2 lg:px-4">

      {/* MAIN CONTAINER */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-white/10 min-h-[420px] lg:min-h-[460px] bg-cover bg-center bg-no-repeat"
        style={{
          // FIXED: Uses fixed background attachment so the picture locks perfectly on scroll
          backgroundImage: "url('/imgs/hajj/hajj2.jpg')",
          backgroundAttachment: "fixed",
        }}
      >

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/55 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0" />

        {/* GLOW EFFECTS */}
        <div className="absolute -top-20 -left-20 w-[240px] h-[240px] rounded-full bg-[#F6931F]/15 blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[260px] h-[260px] rounded-full bg-[#0070A1]/15 blur-3xl pointer-events-none z-0" />

        {/* CONTENT GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[420px] lg:min-h-[460px] items-center">

          {/* LEFT SIDE (Span 7) */}
          <div className="flex items-center px-4 py-6 sm:px-8 lg:px-10 lg:col-span-7">
            <div className="max-w-xl">

              {/* TOP BADGE */}
              <div
                style={fade(0)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F6931F]/30 bg-[#F6931F]/10 backdrop-blur-md mb-3"
              >
                <Star
                  size={12}
                  fill="#F6931F"
                  className="text-[#F6931F]"
                />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#F6931F]">
                  Trusted UK Umrah Specialists
                </span>
              </div>

              {/* HEADING */}
              <div style={fade(0.1)}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none uppercase text-white">
                  Your Sacred{" "}
                  <span className="bg-gradient-to-r from-[#F6931F] via-orange-400 to-[#0070A1] bg-clip-text text-transparent">
                    Journey
                  </span>{" "}
                  Starts Here
                </h1>
              </div>

              {/* DESCRIPTION */}
              <p
                style={fade(0.2)}
                className="mt-2.5 text-xs sm:text-sm text-zinc-200 font-medium leading-normal max-w-lg drop-shadow-md"
              >
                Discover luxury and affordable Umrah packages with flights,
                visa processing, premium hotels, guided tours, and complete
                spiritual assistance tailored for your journey.
              </p>

              {/* DESTINATION TAGS */}
              <div
                style={fade(0.3)}
                className="flex flex-wrap gap-1.5 mt-4"
              >
                {[
                  "Makkah Hotels",
                  "Madinah Hotels",
                  "VIP Transport",
                  "UK Flights",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md"
                  >
                    <MapPin size={12} className="text-[#0070A1]" />
                    <span className="text-[11px] font-bold text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* BUTTONS */}
              <div
                style={fade(0.4)}
                className="flex flex-wrap gap-3 mt-5"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-102 shadow-lg"
                >
                  <MessageCircle size={16} />
                  WhatsApp Now
                </a>
<Link href="/contact">
                <button
                  onClick={onContactClick}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F6931F] hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-102 shadow-[0_8px_20px_rgba(246,147,31,0.2)]"
                >
                  <Phone size={14} />
                  Request Quote
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FEATURE CARDS */}
          <div className="relative flex items-center justify-center px-4 pb-6 lg:pb-0 lg:col-span-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md lg:max-w-none">
              {features.map((item, idx) => {
                const Icon = item.icon;
                const isEven = idx % 2 === 0;
                
                const themeBg = isEven ? "bg-[#F6931F]/5" : "bg-[#0070A1]/5";
                const themeBorder = isEven ? "hover:border-[#F6931F]/30" : "hover:border-[#0070A1]/30";
                const iconHoverBg = isEven ? "group-hover:bg-[#F6931F]" : "group-hover:bg-[#0070A1]";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 ${themeBg} backdrop-blur-sm p-6 min-h-[130px] flex items-center transition-all duration-300 ${themeBorder}`}
                  >
                    <div className="flex items-start gap-3.5 w-full">
                      <div className={`p-3 rounded-xl bg-white/5 text-[#F6931F] group-hover:text-white ${iconHoverBg} transition-all duration-300 shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                          {item.label}
                        </h3>
                        <p className="text-[11px] text-zinc-300 mt-1.5 leading-normal font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
