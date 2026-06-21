"use client";

import { useRef, useState, useEffect, useCallback, memo, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard from "./PackageCard";

// Debounce hook for expensive operations
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

// Throttle hook for high-frequency events
function useThrottle(callback, delay) {
  const lastRunRef = useRef(null);
  
  return useCallback((...args) => {
    const now = Date.now();
    
    // Initialize on first run
    if (lastRunRef.current === null) {
      lastRunRef.current = now;
      callback(...args);
      return;
    }
    
    if (now - lastRunRef.current >= delay) {
      lastRunRef.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}

const PackageGrid = memo(function PackageGrid({ packages = [], onBook, theme }) {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none)").matches;
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPending, startTransition] = useTransition();
  const scrollStateRef = useRef({ left: false, right: true });

  // Setup mobile detection (only run once)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none)");
    
    const handleChange = (e) => {
      startTransition(() => {
        setIsMobile(e.matches);
      });
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Optimized scroll check with RAF
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const hasScrollLeft = scrollLeft > 5;
    const hasScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
    
    // Only update state if values changed
    if (scrollStateRef.current.left !== hasScrollLeft) {
      setCanScrollLeft(hasScrollLeft);
      scrollStateRef.current.left = hasScrollLeft;
    }
    if (scrollStateRef.current.right !== hasScrollRight) {
      setCanScrollRight(hasScrollRight);
      scrollStateRef.current.right = hasScrollRight;
    }
  }, []);

  // Throttle scroll events (max 60fps)
  const throttledCheckScroll = useThrottle(checkScroll, 16);

  // Debounce resize events
  const debouncedCheckScroll = useDebounce(checkScroll, 150);

  // Setup listeners with passive flag for better performance
  useEffect(() => {
    checkScroll(); // Initial check
    const el = scrollRef.current;
    if (!el) return;

    // Passive listener for better scroll performance
    el.addEventListener("scroll", throttledCheckScroll, { passive: true });
    window.addEventListener("resize", debouncedCheckScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", throttledCheckScroll);
      window.removeEventListener("resize", debouncedCheckScroll);
    };
  }, [throttledCheckScroll, debouncedCheckScroll, checkScroll]);

  const scrollByCard = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstChild?.offsetWidth || el.clientWidth;
    const scrollAmount = cardWidth + 20;

    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    
    // Check scroll state after animation completes
    setTimeout(checkScroll, 300);
  }, [checkScroll]);

  // Memoize theme values
  const scrollButtonProps = useMemo(() => ({
    borderColor: theme?.border || "rgba(245,158,11,0.2)",
    accentColor: theme?.accent || "#f59e0b"
  }), [theme?.border, theme?.accent]);

  // Memoize animation config
  const animationConfig = useMemo(() => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -50px 0px" },
    transition: { duration: 0.4 }
  }), []);

  // Memoize packages to prevent unnecessary re-renders
  const memoizedPackages = useMemo(() => packages, [packages]);

  return (
    <div className="relative w-full">
      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {memoizedPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              {...animationConfig}
              transition={{ ...animationConfig.transition, delay: 0.05 }}
              className="snap-center shrink-0 w-[85%]"
            >
              <PackageCard 
                pkg={pkg} 
                onBook={onBook} 
                theme={theme}
                isLoading={false}
                isMobile={true}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft || isPending}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: scrollButtonProps.borderColor }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} color={scrollButtonProps.accentColor} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight || isPending}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: scrollButtonProps.borderColor }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} color={scrollButtonProps.accentColor} />
          </motion.button>
        </div>
      </div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {memoizedPackages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            {...animationConfig}
            transition={{ ...animationConfig.transition, delay: Math.min(i * 0.03, 0.2) }}
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
});

PackageGrid.displayName = "PackageGrid";

export default PackageGrid;