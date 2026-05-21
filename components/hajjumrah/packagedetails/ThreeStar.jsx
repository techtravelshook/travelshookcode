"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Intersection Observer Block Component for Scroll Entrances
───────────────────────────────────────────────────────────── */
function AnimatedRow({ block, index, onBlockClick }) {
  const isImageLeft = index % 2 === 0;
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Triggers once for a clean performance load
        }
      },
      { threshold: 0.12 } // Triggers when 12% of the card is visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px] transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {/* IMAGE SIDE (FIXED BACKGROUND EFFECT) */}
      <div
        className={`
          relative w-full h-[350px] lg:h-auto bg-cover bg-center bg-no-repeat
          ${isImageLeft ? "lg:order-1" : "lg:order-2"}
        `}
        style={{
          backgroundImage: `url('${block.imageSrc || "/imgs/placeholder.jpg"}')`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* NUMBER BADGE */}
        <div className="absolute top-8 left-8 z-20">
          <span className="h-14 w-14 flex items-center justify-center rounded-full bg-[#F6931F] text-white text-sm font-black shadow-2xl border border-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* CONTENT SIDE */}
      <div
        className={`
          relative flex items-center
          bg-gradient-to-br from-white to-slate-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900
          px-6 sm:px-10 lg:px-16 xl:px-24 py-16
          ${isImageLeft ? "lg:order-2" : "lg:order-1"}
          transition-colors duration-300
        `}
      >
        {/* SOFT GLOW CIRCLES ON TEXT SIDE */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(circle_at_top_right,#F6931F,transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[radial-gradient(circle_at_bottom_left,#0070A1,transparent_50%)]" />

        <div className="relative z-10 max-w-2xl w-full">
          {/* TAGLINE */}
          {block.tagline && (
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#F6931F] font-bold mb-5">
              <span className="w-8 h-[1px] bg-[#F6931F]" />
              {block.tagline}
            </span>
          )}

          {/* TITLE */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            {block.title}
          </h2>

          {/* DESCRIPTION */}
          <div className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base space-y-4 transition-colors duration-300">
            {block.description}
          </div>

          {/* FEATURES */}
          {block.listItems?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {block.listItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-slate-200/50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#F6931F] mt-0.5 shrink-0"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-200 transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* BUTTON */}
          {block.btnText && (
            <div className="mt-10">
              <button
                onClick={() => onBlockClick?.(block)}
                className="
                  group inline-flex items-center gap-3
                  px-7 py-4 rounded-full
                  bg-[#F6931F]
                  hover:bg-orange-500
                  text-white text-sm font-bold uppercase tracking-wider
                  transition-all duration-300
                  hover:scale-105
                  shadow-[0_10px_40px_rgba(246,147,31,0.35)]
                "
              >
                {block.btnText}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT EXPORT
───────────────────────────────────────────────────────────── */
export default function ThreeStar({ blocks = [], onBlockClick }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 dark:bg-black overflow-hidden transition-colors duration-300">
      {blocks.map((block, index) => (
        <AnimatedRow
          key={block.id || index}
          block={block}
          index={index}
          onBlockClick={onBlockClick}
        />
      ))}
    </section>
  );
}
