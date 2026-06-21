"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import PackageCard from "./PackageCardModal";


const PackageGrid = memo(function PackageGrid({ packages = [], onBook, theme, isLoading = false, error = null }) {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollByCard = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstChild?.offsetWidth || el.clientWidth;
    const scrollAmount = cardWidth + 20;

    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });

    setTimeout(checkScroll, 300);
  }, [checkScroll]);

  const scrollButtonProps = {
    borderColor: theme?.border || "rgba(245,158,11,0.2)",
    accentColor: theme?.accent || "#f59e0b"
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader size={40} color={scrollButtonProps.accentColor} />
        </motion.div>
        <p className="mt-4 text-gray-600">Loading packages...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-semibold mb-2">⚠️ Error Loading Packages</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  // Empty State
  if (!packages || packages.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-12 text-center">
        <p className="text-amber-900 font-semibold mb-2">📦 No Packages Available</p>
        <p className="text-amber-700 text-sm">Check back soon for new holiday packages!</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg?.id || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
              className="snap-center shrink-0 w-[85%]"
            >
              <PackageCard
                pkg={pkg}
                onBook={onBook}
                theme={theme}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-50"
            style={{ borderColor: scrollButtonProps.borderColor }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} color={scrollButtonProps.accentColor} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-50"
            style={{ borderColor: scrollButtonProps.borderColor }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} color={scrollButtonProps.accentColor} />
          </motion.button>
        </div>
      </div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg?.id || i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
          >
            <PackageCard
              pkg={pkg}
              onBook={onBook}
              theme={theme}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

PackageGrid.displayName = "PackageGrid";

export default PackageGrid;