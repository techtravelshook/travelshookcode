"use client";
import { useState, memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, MapPin, ChevronRight, X, Check, Calendar } from "lucide-react";
import Image from "next/image";

function StarRow({ count = 0 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-amber-400 stroke-amber-400" : "fill-transparent stroke-white/20"}
        />
      ))}
    </div>
  );
}

function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-400 animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
        {/* Inner ring */}
        <div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-500 animate-spin"
          style={{ animationDuration: '1.8s', animationDirection: 'reverse' }}
        />
      </div>
    </div>
  );
}

const PackageCard = memo(function PackageCard({
  pkg,
  onBook,
  isMobile = false,
  isLoading = false,
  theme = {
    primary: "#F6931F",
    secondary: "#0070A1",
    border: "rgba(246,147,31,0.25)",
    lightBg: "rgba(246,147,31,0.1)",
    gradient: "linear-gradient(135deg,#F6931F 0%,#0070A1 100%)",
  },
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      // Prevent scrolling on both html and body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.height = "100vh";
    } else {
      // Restore scrolling
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, [isModalOpen]);

  const handleExplore = useCallback((e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const handleBook = useCallback(
    (e) => {
      e.stopPropagation();
      setIsModalOpen(false);
      onBook?.(pkg);
    },
    [pkg, onBook]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!pkg) return null;

  return (
    <>
      {/* ── CARD ── */}
      <motion.article
        layout
        whileHover={!isMobile ? { y: -8 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex flex-col rounded-2xl overflow-hidden h-full"
        style={{
          background: "linear-gradient(135deg, #0071a1a3 0%, #000000 100%)",
          border: "1px solid rgba(246,147,31,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 rounded-2xl backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <SpinnerLoader />
          </motion.div>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden" style={{ height: isMobile ? "240px" : "280px" }}>
          <Image
            src={`/${pkg.image}`}
            alt={pkg.title || "Holiday Package"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,18,32,0) 0%, rgba(10,18,32,0.4) 60%, rgba(10,18,32,0.95) 100%)",
            }}
          />

          {/* Top Left Badge */}
          {pkg.category && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 left-4"
            >
              <span
                className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{
                  background: "rgba(10,18,32,0.75)",
                  color: theme.primary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {pkg.category}
              </span>
            </motion.div>
          )}

          {/* Duration Badge */}
          {pkg.duration && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-4 right-4 flex items-center gap-1.5"
            >
              <span
                className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md text-white"
                style={{
                  background: "rgba(10,18,32,0.75)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Clock size={12} style={{ color: theme.primary }} />
                {pkg.duration}
              </span>
            </motion.div>
          )}

          {/* Bottom: Title & Stars */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <StarRow count={pkg.rating} />
              <h3 className="mt-3 text-white font-black text-lg leading-tight ">{pkg.title}</h3>
            </motion.div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          {/* Location */}
          {pkg.location && (
            <div className="flex items-center gap-2">
              <MapPin size={13} style={{ color: theme.primary }} strokeWidth={2.5} />
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">{pkg.location}</span>
            </div>
          )}

          {/* Short Description */}
          {pkg.shortDesc && <p className="text-sm leading-relaxed text-white/60 line-clamp-2">{pkg.shortDesc}</p>}

          {/* Features */}
          {pkg.features?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pkg.features.slice(0, 3).map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(246,147,31,0.1)",
                    color: theme.primary,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Check size={10} />
                  {f}
                </div>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="mt-auto pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {/* Price & CTA */}
            <div className="flex items-end justify-between gap-3 mt-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-1">From</p>
                <p className="text-3xl font-black text-white leading-none">
                  £{pkg.price?.toLocaleString() ?? "0"}
                  <span className="text-sm font-semibold text-white/40 ml-1">pp</span>
                </p>
              </div>

              {/* Explore Now Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExplore}
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: theme.gradient,
                  boxShadow: "0 6px 24px rgba(246,147,31,0.35)",
                }}
              >
                Explore Now
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>

      {/* ── MODAL OVERLAY ── */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 pointer-events-auto"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
            >
              <motion.div
                className="relative w-full max-w-3xl h-[95vh] flex flex-col rounded-3xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "linear-gradient(135deg,rgba(13,27,42,0.95) 0%,rgba(10,18,32,0.95) 100%)",
                  border: "1px solid rgba(246,147,31,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Modal Loading Overlay */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 rounded-3xl backdrop-blur-sm z-20 flex items-center justify-center"
                  >
                    <SpinnerLoader />
                  </motion.div>
                )}

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <X size={20} className="text-white" />
                </motion.button>

                {/* Modal Image */}
                <div className="relative w-full flex-shrink-0" style={{ height: "250px" }}>
                  <Image
                    src={`/${pkg.image}`}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(10,18,32,0.2) 0%, rgba(10,18,32,0.95) 100%)",
                    }}
                  />
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-4xl font-black text-white leading-tight">{pkg.title}</h2>
                    <div className="mt-3 flex items-center gap-3">
                      <StarRow count={pkg.rating} />
                      {pkg.trustpilotScore && (
                        <span className="text-sm font-bold text-white/70">
                          {pkg.trustpilotScore}/5 Trustpilot
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content - Scrollable */}
                <div 
                  style={{
                    flex: 1,
                    overflowY: "scroll",
                    overflowX: "hidden",
                    overscrollBehavior: "contain",
                    scrollBehavior: "smooth"
                  }}
                >
                  <div className="p-8 space-y-8 pb-8">
                    {/* Location & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                      {pkg.location && (
                        <div className="flex items-start gap-3">
                          <MapPin size={20} style={{ color: theme.primary }} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold uppercase text-white/50 mb-1">Location</p>
                            <p className="text-base font-semibold text-white">{pkg.location}</p>
                          </div>
                        </div>
                      )}
                      {pkg.duration && (
                        <div className="flex items-start gap-3">
                          <Calendar size={20} style={{ color: theme.primary }} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold uppercase text-white/50 mb-1">Duration</p>
                            <p className="text-base font-semibold text-white">{pkg.duration}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Full Description */}
                    {pkg.desc && (
                      <div>
                        <h3 className="text-lg font-black text-white mb-3">About This Experience</h3>
                        <p className="text-base text-white/70 leading-8 whitespace-pre-line">
                          {pkg.desc}
                        </p>
                      </div>
                    )}

                    {/* Highlights */}
                    {pkg.highlights?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-black text-white mb-4">Highlights</h3>
                        <div className="space-y-3">
                          {pkg.highlights.map((highlight, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div
                                className="flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5"
                                style={{ background: theme.lightBg, color: theme.primary }}
                              >
                                <Check size={14} strokeWidth={3} />
                              </div>
                              <p className="text-sm font-semibold text-white/80">{highlight}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Best Time to Visit */}
                    {pkg.bestTimeToVisit && (
                      <div
                        className="p-4 rounded-xl"
                        style={{ background: "rgba(246,147,31,0.08)", border: `1px solid ${theme.border}` }}
                      >
                        <p className="text-xs font-bold uppercase text-white/50 mb-2">Best Time to Visit</p>
                        <p className="text-base font-semibold text-white">{pkg.bestTimeToVisit}</p>
                      </div>
                    )}

                    {/* Features List */}
                    {pkg.features?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-black text-white mb-4">What&apos;s Included</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pkg.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2.5 p-3 rounded-lg"
                              style={{
                                background: "rgba(246,147,31,0.08)",
                                border: `1px solid ${theme.border}`,
                              }}
                            >
                              <Check size={16} style={{ color: theme.primary }} strokeWidth={3} />
                              <span className="text-sm font-semibold text-white">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price & CTA Section */}
                    <div
                      className="p-6 rounded-2xl flex items-end justify-between gap-4"
                      style={{
                        background: "linear-gradient(135deg,rgba(246,147,31,0.12) 0%,rgba(0,112,161,0.08) 100%)",
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-white/50 mb-2">Total Price Per Person</p>
                        <p className="text-4xl font-black text-white">
                          £{pkg.price?.toLocaleString() ?? "0"}
                        </p>
                      </div>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBook}
                        disabled={isLoading}
                        className="px-8 py-4 rounded-xl text-base font-black text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: theme.gradient,
                          boxShadow: "0 10px 30px rgba(246,147,31,0.4)",
                        }}
                      >
                        {isLoading ? "Processing..." : "Book Now"}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default PackageCard;