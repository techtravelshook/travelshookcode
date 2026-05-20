"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

export default function FloatingActionBanner() {
  return (
    <section className="w-full px-6 py-12 transition-colors duration-500 bg-white dark:bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative group"
      >
        {/* Dynamic Background Glow - Changes based on theme */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A84C] via-[#0B2747] dark:via-white/20 to-[#F29323] rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-1000" />

        {/* Main Content Container */}
        <div className="relative bg-slate-50/90 dark:bg-[#0B2747]/80 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[35px] p-2 sm:p-3 overflow-hidden shadow-2xl transition-all duration-500">
          
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
            
            {/* Left Section: Visual & Main Text */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-6 px-6 py-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#F29323] to-[#E68213] flex items-center justify-center shadow-lg shrink-0">
                <Sparkles className="text-white h-8 w-8 animate-pulse" />
              </div>
              
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <ShieldCheck size={14} className="text-[#F29323]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    100% ATOL Protected
                  </span>
                </div>
                {/* Heading Color Switch */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">
                  Reserve for <span className="text-[#F29323]">£99</span>. 
                  <span className="font-light opacity-70 ml-2 text-slate-600 dark:text-white/60">
                    Pay the rest in interest-free monthly slices.
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Section: Action & Quick Info */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 px-6 pb-6 lg:pb-0">
              {/* TrustScore Border Color Switch */}
              <div className="hidden xl:flex flex-col items-end px-6 border-r border-slate-300 dark:border-white/10 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">TrustScore</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">4.9/5</span>
              </div>

              {/* Button Color Inversion */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-[#0B2747] dark:bg-white text-white dark:text-[#0B2747] px-8 py-5 rounded-[25px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all duration-500"
              >
                <CreditCard size={18} />
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-[#F29323]/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        </div>
      </motion.div>

      {/* Trustpilot Small Text - Color Switch */}
      <p className="text-center mt-6 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium transition-colors">
        Join 10,000+ satisfied pilgrims who chose Travelshook for their sacred journey.
      </p>
    </section>
  );
}
