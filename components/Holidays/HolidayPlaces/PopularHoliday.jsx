"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, MapPin, Sparkles, Shield, Clock, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ── Sample data (swap with your real import) ── */
const locationData = {
  slug: "spain",
  name: "Spain",
  heroImage: "/imgs/holidays/spain-barcelona.jpg",
  packages: [
    {
      id: "pkg-01",
      title: "Barcelona City Break",
      subtitle: "3 Nights • 4 Star",
      desc: "Explore Gaudí, tapas bars, and the Gothic Quarter. Hotel in city center with daily breakfast and expert city guides.",
      image: "/imgs/holidays/dubai.jpg",
      tags: ["Flights Included", "Breakfast", "City Tour"],
      price: "£499",
      originalPrice: "£649",
      rating: 4.5,
      reviews: 312,
      highlights: ["Sagrada Familia Tour", "24/7 Support", "Skip-the-line Tickets"],
      duration: "3N / 4D",
      accent: "#E68213",
    },
    {
      id: "pkg-02",
      title: "Thailand Beach Escape",
      subtitle: "7 Nights • 5 Star",
      desc: "Beachfront resort with unlimited food, drinks, and pool access. Perfect for summer with exclusive beach parties.",
      image: "/imgs/holidays/thailand.jpg",
      tags: ["All Inclusive", "Beachfront", "Airport Transfer"],
      price: "£899",
      originalPrice: "£1,149",
      rating: 4.8,
      reviews: 541,
      highlights: ["Private Beach", "Free Cancellation", "Watersports Included"],
      duration: "7N / 8D",
      accent: "#0070A1",
    },
    {
      id: "pkg-03",
      title: "Madrid & Toledo",
      subtitle: "5 Nights • 4 Star",
      desc: "2 days in Madrid plus a day trip to historic Toledo. Rail passes and fully guided tours included throughout.",
      image: "/imgs/holidays/spain.jpg",
      tags: ["Rail Pass", "Guided Tour", "Hotel + Breakfast"],
      price: "£749",
      originalPrice: "£949",
      rating: 4.6,
      reviews: 228,
      highlights: ["Expert Guide", "Museum Passes", "Flexible Dates"],
      duration: "5N / 6D",
      accent: "#E68213",
    },
  ],
};

/* ── Stars ── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < Math.floor(rating)
              ? "fill-amber-400 stroke-amber-400"
              : "fill-transparent stroke-white/30"
          }
        />
      ))}
    </div>
  );
}

/* ── Content panel (left side, changes per package) ── */
function ContentPanel({ pkg, index, total }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pkg.id}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -28 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center h-full max-w-xl"
      >
        {/* Index + rating row */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border"
            style={{
              color: pkg.accent,
              borderColor: `${pkg.accent}55`,
              background: `${pkg.accent}18`,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <Stars rating={pkg.rating} />
            <span className="text-white/60 text-xs font-semibold">
              {pkg.rating} ({pkg.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Duration badge */}
        <div className="flex items-center gap-2 mb-4">
          <Clock size={13} style={{ color: pkg.accent }} />
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">
            {pkg.subtitle}
          </span>
        </div>

        {/* Big title */}
        <h3
          className="text-[clamp(2.8rem,5vw,5rem)] font-black leading-[0.95] tracking-tight text-white mb-5"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}
        >
          {pkg.title}
        </h3>

        {/* Accent divider */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="h-[3px] w-14 rounded-full"
            style={{ background: pkg.accent }}
          />
          <div
            className="h-[3px] w-4 rounded-full opacity-40"
            style={{ background: pkg.accent }}
          />
        </div>

        {/* Description */}
        <p className="text-[15px] text-white/75 leading-relaxed mb-6 font-light">
          {pkg.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/15 bg-white/8 text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-8">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-sm text-white/70">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: pkg.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">From</p>
            <div className="flex items-end gap-2">
              <span
                className="text-5xl font-black leading-none"
                style={{
                  color: pkg.accent,
                  filter: `drop-shadow(0 0 16px ${pkg.accent}80)`,
                }}
              >
                {pkg.price}
              </span>
              <span className="text-white/40 text-sm mb-1 line-through">
                {pkg.originalPrice}
              </span>
              <span className="text-white/50 text-xs mb-1">pp</span>
            </div>
          </div>

          <Link href={`/book/${locationData.slug}/${pkg.id}`}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl overflow-hidden cursor-pointer shadow-2xl text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)` }}
            >
              {/* shine sweep */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <Shield size={15} />
              <span>Book Now</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Image panel (right side, changes per package) ── */
function ImagePanel({ pkg }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pkg.id}
        initial={{ opacity: 0, scale: 0.94, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.94, x: -40 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      >
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="45vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
              <MapPin size={12} style={{ color: pkg.accent }} />
              <span className="text-white text-[11px] font-bold">
                {locationData.name}
              </span>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-white text-[11px] font-black backdrop-blur-md border"
              style={{
                background: `${pkg.accent}30`,
                borderColor: `${pkg.accent}60`,
                color: "white",
              }}
            >
              {pkg.duration}
            </div>
          </div>
        </div>

        {/* Border accent */}
        <div
          className="absolute inset-0 rounded-[32px] border-2 opacity-30 pointer-events-none"
          style={{ borderColor: pkg.accent }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Progress dots ── */
function ProgressDots({ total, active }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: i === active ? 32 : 8,
            opacity: i === active ? 1 : 0.35,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-1 rounded-full"
          style={{
            background:
              i === active
                ? locationData.packages[i].accent
                : "rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   Strategy:
   - Outer wrapper = tall scrollable section (100vh × n packages)
   - Inner panel = sticky at top, full-screen
   - Scroll progress within the section drives activeIndex
   ══════════════════════════════════════════════ */
export default function LocationPackagesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const total = locationData.packages.length;

  /* 
   * As user scrolls through the tall section,
   * calculate which package should be active.
   * Each package gets an equal scroll segment.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportH = window.innerHeight;

      // How far we've scrolled INTO the section (0 = top, 1 = bottom)
      const scrolled = -rect.top;
      const scrollable = sectionHeight - viewportH;

      if (scrolled < 0 || scrollable <= 0) {
        setActiveIndex(0);
        return;
      }

      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      const newIndex = Math.min(
        Math.floor(progress * total),
        total - 1
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total]);

  const pkg = locationData.packages[activeIndex];

  /* scroll progress bar width */
  const progressPct = ((activeIndex + 1) / total) * 100;

  return (
    <>
      {/* ══ TALL SCROLL SECTION ══ */}
      <section
        ref={sectionRef}
        /* Each package gets 100vh of scroll room, plus 1 extra for the sticky panel */
        style={{ height: `${(total + 1) * 100}vh` }}
        className="relative"
      >
        {/* ── STICKY FULLSCREEN PANEL ── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── BG IMAGE (cross-fades with package) ── */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`bg-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                priority={activeIndex === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* ── OVERLAYS ── */}
          <div className="absolute inset-0 z-10 bg-black/65" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Noise grain */}
          <div
            className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "140px",
            }}
          />

          {/* ── LAYOUT ── */}
          <div className="relative z-20 h-full flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-8">
              {/* Location breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md"
              >
                <MapPin size={13} className="text-amber-400" />
                <span className="text-white text-xs font-extrabold uppercase tracking-[0.25em]">
                  {locationData.name}
                </span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Choose Your Package
                </span>
              </motion.div>

              {/* Scroll nudge */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="hidden sm:flex flex-col items-center gap-1 opacity-50"
              >
                <span className="text-white text-[9px] uppercase tracking-[0.35em] font-bold">
                  Scroll
                </span>
                <ChevronDown size={14} className="text-white" />
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mx-6 sm:mx-10 lg:mx-16 mt-3 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${pkg.accent}, ${pkg.accent}99)`,
                }}
              />
            </div>

            {/* Main grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center px-6 sm:px-10 lg:px-16 py-6">

              {/* LEFT — content */}
              <div className="h-full flex items-center">
                <ContentPanel
                  pkg={pkg}
                  index={activeIndex}
                  total={total}
                />
              </div>

              {/* CENTER — vertical progress dots */}
              <div className="hidden lg:flex items-center justify-center px-8">
                <ProgressDots total={total} active={activeIndex} />
              </div>

              {/* RIGHT — image card */}
              <div className="hidden lg:flex items-center justify-end">
                <div className="w-full max-w-sm xl:max-w-md h-[65vh]">
                  <ImagePanel pkg={pkg} />
                </div>
              </div>
            </div>

            {/* Mobile image strip */}
            <div className="lg:hidden px-6 pb-6">
              <div className="relative h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mob-img-${activeIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                  <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15">
                    {pkg.duration}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: total }).map((_, i) => (
                      <span
                        key={i}
                        className="block rounded-full transition-all duration-300"
                        style={{
                          width: i === activeIndex ? 20 : 6,
                          height: 6,
                          background: i === activeIndex ? pkg.accent : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer so page continues normally after section */}
      <div className="h-px" />
    </>
  );
}