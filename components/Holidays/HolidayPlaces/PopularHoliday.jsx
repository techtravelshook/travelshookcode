"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const starMap = {
  STAR_1: 1, STAR_2: 2, STAR_3: 3, STAR_4: 4, STAR_5: 5,
};

const ACCENTS = ["#E68213", "#0070A1", "#7C3AED", "#059669"];

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

function ContentPanel({ pkg, slideTitle, slideDesc, index, total, accent }) {
  const starRating = starMap[pkg.star] ?? 4;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`content-${index}`}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -28 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center h-full max-w-xl mx-auto lg:mx-0 px-4 sm:px-0"
      >
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border text-sm"
            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}18` }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <Stars rating={starRating} />
            <span className="text-white/60 text-xs font-semibold">{starRating}.0 stars</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Clock size={13} style={{ color: accent }} />
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">
            {pkg.duration} Nights · {starRating} Star
          </span>
        </div>

        <h3
          className="text-[clamp(1.75rem,7vw,3.8rem)] font-black leading-[0.95] tracking-tight text-white mb-5"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}
        >
          {slideTitle}
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-[3px] w-14 rounded-full" style={{ background: accent }} />
          <div className="h-[3px] w-4 rounded-full opacity-40" style={{ background: accent }} />
        </div>

        <p className="text-[15px] text-white/75 leading-relaxed mb-8 font-light">
          {slideDesc}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-wrap">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">From</p>
            <div className="flex items-end gap-2">
              <span
                className="text-5xl sm:text-6xl font-black leading-none"
                style={{ color: accent, filter: `drop-shadow(0 0 16px ${accent}80)` }}
              >
                £{pkg.price}
              </span>
              <span className="text-white/50 text-xs mb-1">pp</span>
            </div>
          </div>

          <Link href={`/holidays/${pkg.slug}`} className="mt-2 sm:mt-0">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl overflow-hidden cursor-pointer shadow-2xl text-white font-bold text-sm w-full sm:w-auto justify-center"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <Shield size={15} />
              <span>Book Now</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ImagePanel({ imageUrl, pkgTitle, pkgDuration, accent, id }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.94, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.94, x: -40 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={pkgTitle} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
            <MapPin size={12} style={{ color: accent }} />
            <span className="text-white text-[11px] font-bold truncate max-w-[140px]">{pkgTitle}</span>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-white text-[11px] font-black backdrop-blur-md border whitespace-nowrap"
            style={{ background: `${accent}30`, borderColor: `${accent}60` }}
          >
            {pkgDuration}N / {pkgDuration + 1}D
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[32px] border-2 opacity-30 pointer-events-none"
          style={{ borderColor: accent }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function ProgressDots({ total, active, accent }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: i === active ? 32 : 8, opacity: i === active ? 1 : 0.35 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-1 rounded-full"
          style={{ background: i === active ? accent : "rgba(255,255,255,0.4)" }}
        />
      ))}
    </div>
  );
}

export default function LocationPackagesSection({ slug }) {
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
    async function fetchPackage() {
      try {
        setLoading(true);
        const res = await fetch(`/api/holidays/${slug}`);
        if (!res.ok) throw new Error("Package not found");
        const data = await res.json();
        setPkg(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [slug]);

  const images = pkg?.images ?? [];
  const total = images.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || total === 0) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrolled < 0 || scrollable <= 0) {
        setActiveIndex(0);
        return;
      }
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      setActiveIndex(Math.min(Math.floor(progress * total), total - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total]);

  if (loading) return (
    <div className="py-20 text-center text-slate-400 text-sm tracking-widest uppercase">
      Loading package...
    </div>
  );

  if (error || !pkg) return (
    <div className="py-20 text-center text-red-400 text-sm">{error ?? "Package not found."}</div>
  );

  const accent = ACCENTS[activeIndex % ACCENTS.length];
  const progressPct = total > 0 ? ((activeIndex + 1) / total) * 100 : 100;
  const currentImage = images[activeIndex];
  const currentImageUrl = currentImage?.url ? `/${currentImage.url}` : null;

  const slideTitle = currentImage?.slideTitle ?? pkg.title;
  const slideDesc = currentImage?.slideDesc ?? pkg.shortDesc;

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: `${(total + 1) * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          <AnimatePresence mode="sync">
            <motion.div
              key={`bg-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0"
            >
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl}
                  alt={pkg.title}
                  fill
                  priority={activeIndex === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-900" />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 z-10 bg-black/65" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="relative z-20 h-full flex flex-col">

            <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-sm"
              >
                <MapPin size={13} className="text-amber-400" />
                <span className="text-white text-xs font-extrabold uppercase tracking-[0.25em]">{pkg.title}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Photo {activeIndex + 1} of {total}
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="hidden sm:flex flex-col items-center gap-1 opacity-50"
              >
                <span className="text-white text-[9px] uppercase tracking-[0.35em] font-bold">Scroll</span>
                <ChevronDown size={14} className="text-white" />
              </motion.div>
            </div>

            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 mt-3 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
              />
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center px-4 sm:px-6 md:px-10 lg:px-16 py-6">

              <div className="h-full flex items-center">
                <ContentPanel
                  pkg={pkg}
                  slideTitle={slideTitle}
                  slideDesc={slideDesc}
                  index={activeIndex}
                  total={total}
                  accent={accent}
                />
              </div>

              <div className="hidden lg:flex items-center justify-center px-8">
                <ProgressDots total={total} active={activeIndex} accent={accent} />
              </div>

              <div className="hidden lg:flex items-center justify-end">
                <div className="w-full max-w-sm xl:max-w-md h-[65vh]">
                  <ImagePanel
                    id={currentImage?.id}
                    imageUrl={currentImageUrl}
                    pkgTitle={pkg.title}
                    pkgDuration={pkg.duration}
                    accent={accent}
                  />
                </div>
              </div>
            </div>

            <div className="lg:hidden px-4 sm:px-6 pb-8">
              <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mob-img-${activeIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {currentImageUrl && (
                      <Image src={currentImageUrl} alt={pkg.title} fill className="object-cover" sizes="100vw" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                    {pkg.duration}N / {pkg.duration + 1}D
                  </span>
                  <div className="flex gap-1.5">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className="block rounded-full transition-all duration-300"
                        style={{
                          width: i === activeIndex ? 22 : 7,
                          height: 7,
                          background: i === activeIndex ? accent : "rgba(255,255,255,0.35)",
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
      <div className="h-px" />
    </>
  );
}