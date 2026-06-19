// components/Holidays/PackageGrid.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard from "./PackageCard";

export default function PackageGrid({ packages, onBook, theme }) {
  const scrollRef = useRef(null);
  

  // Detect if device supports hover (touch devices don't)
  // ✅ No warning, cleaner
const [isMobile] = useState(() => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
});

  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || el.clientWidth;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Mobile: horizontal scroll-snap carousel */}
      <div
        ref={scrollRef}
        className="flex sm:hidden gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="snap-center shrink-0 w-[85%]"
          >
            <PackageCard 
              pkg={pkg} 
              onBook={onBook} 
              theme={theme}
              isMobile={isMobile}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile arrows */}
      <div className="flex sm:hidden justify-center gap-3 mt-4">
        <button
          onClick={() => scrollByCard(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors active:bg-opacity-10"
          style={{ borderColor: theme?.border || "rgba(245,158,11,0.2)" }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors active:bg-opacity-10"
          style={{ borderColor: theme?.border || "rgba(245,158,11,0.2)" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Desktop/tablet: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <PackageCard 
              pkg={pkg} 
              onBook={onBook} 
              theme={theme}
              isMobile={false}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}