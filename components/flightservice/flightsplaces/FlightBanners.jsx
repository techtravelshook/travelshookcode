"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wallet, RefreshCw, Clock, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function BookNowPayLaterBanner({ 
  onBookClick, 
  destination = "Cape Town",
  // Default values provided automatically if no custom tags are passed
  floatingTags = [
    { label: "London", price: "£25", color: "#E68213", left: "52%", top: "top-8", animY: [0, -12, 0], delay: 0, duration: 4 },
    { label: "Dubai", price: "£35", color: "#0070A1", left: "58%", top: "top-28", animY: [0, -20, 0], delay: 0.3, duration: 4.8 },
    { label: "Makkah", price: "£49", color: "#E68213", left: "68%", top: "top-10", animY: [0, 15, 0], delay: 0.7, duration: 5.5 },
    { label: "Accra", price: "£29", color: "#0070A1", left: "75%", top: "top-24", animY: [0, -4, 0], delay: 1.1, duration: 4.2 }
  ]
}) {
 const whatsappNumber = "923124928496";
  
  // Dynamically injects the destination name into your message string safely
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking flights to ${destination} with the Book Now Pay Later option. Please help me with more details.`
  );

  // FIXED: Added missing '/' and corrected string placeholder format to ${whatsappNumber}

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const features = [
    {
      icon: <ShieldCheck className="text-[#0070A1] dark:text-[#E68213]" size={20} />,
      title: "Price Locked",
      desc: "Your fare is frozen at today's rate — no surprises later.",
    },
    {
      icon: <Wallet className="text-[#0070A1] dark:text-[#E68213]" size={20} />,
      title: "Just £25 Deposit",
      desc: "Reserve your seat with a small deposit and pay the rest later.",
    },
    {
      icon: <RefreshCw className="text-[#0070A1] dark:text-[#E68213]" size={20} />,
      title: "Free Cancellation",
      desc: "Plans change — cancel within 48 hours for a full refund.",
    },
    {
      icon: <Clock className="text-[#0070A1] dark:text-[#E68213]" size={20} />,
      title: "Pay in 48 Hours",
      desc: "Complete your payment securely within 48 hours of booking.",
    },
  ];

  return (
    <div className="w-full py-6 font-mulish">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#091220] shadow-xl">
        
        {/* ───────────────── AMBIENT GLOW BACKDROP ───────────────── */}
        <div className="absolute pointer-events-none rounded-full w-[400px] h-[400px] bg-[#0070A1]/12 -top-[120px] -right-[60px] blur-[100px]" />
        <div className="absolute pointer-events-none rounded-full w-[250px] h-[250px] bg-[#E68213]/10 -bottom-[80px] left-20 blur-[80px]" />

        {/* ───────────────── DYNAMIC FLOATING PRICE TAGS ───────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block z-0">
          {floatingTags.map((tag, idx) => (
            <motion.div
              key={idx}
              className={`absolute border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5 text-center shadow-lg rounded-xl ${tag.top}`}
              style={{ left: tag.left }}
              animate={{ y: tag.animY }}
              transition={{ duration: tag.duration, delay: tag.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block text-[10px] font-bold text-white/40 uppercase tracking-wider">{tag.label}</span>
              <span className="text-sm font-black" style={{ color: tag.color }}>
                {tag.price} <span className="text-xs font-normal text-white">Dep</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* ───────────────── MAIN TOP CONTENT ROW ───────────────── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-6 py-8 sm:p-10 border-b border-white/[0.06]">
          
          {/* Left Text Block */}
          <div className="flex-1 max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E68213]/15 border border-[#E68213]/35 px-4 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E68213] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#E68213]">
                Book Now · Pay Later
              </span>
            </div>

            {/* Typography Heading */}
            <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-3">
              Fares to {destination} rising fast?{" "}
              <span className="bg-gradient-to-r from-[#E68213] to-[#F7931E] bg-clip-text text-transparent block sm:inline">
                Lock yours now.
              </span>
            </h2>

            {/* Paragraph Subtext */}
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl">
              Do not lose your seat to sudden airline price hikes. Reserve today with a flexible low deposit 
              and settle your final balance securely when you are ready. Zero stress, maximum coverage.
            </p>
          </div>

          {/* Right Action Booking Wrapper */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:w-full lg:w-auto min-w-[260px] shrink-0">
           <Link href="/contact">
            <button
              onClick={onBookClick}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#E68213] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#c96a0a] hover:-translate-y-0.5 active:scale-95"
            >
              Lock in My Seat 
              <ArrowRight size={16} />
            </button>
           </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/20 border border-[#25D366]/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#25D366] transition-all duration-300 hover:from-[#25D366]/20 hover:to-[#25D366]/30 hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle size={16} fill="currentColor" />
              WhatsApp Inquiry
            </a>
          </div>

        </div>

        {/* ───────────────── BOTTOM RESPONSIVE FEATURES MATRIX ───────────────── */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-10 bg-white/[0.02]">
          {features.map((feat, index) => (
            <div 
              key={index} 
              className="flex gap-3.5 items-start p-3 rounded-xl transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.05] shrink-0 shadow-inner">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {feat.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed mt-1">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
