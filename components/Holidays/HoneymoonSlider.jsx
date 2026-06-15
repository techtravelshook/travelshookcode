"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X, Expand } from "lucide-react";

export default function ImageSlider({ images = [], title = "Package Image" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0B1F33] to-[#0F2A45] flex flex-col items-center justify-center text-slate-500 gap-2">
        <ImageIcon size={40} />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">No Gallery Images Available</span>
      </div>
    );
  }

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [isModalOpen, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Main slide */}
      <div className="relative w-full h-full group">
        <Image
          src={`/${images[currentIndex].url}`}
          alt={`${title} - Slide ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out"
          priority
        />

        {/* Subtle vignette so the slider reads as a cohesive surface, not just a raw photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-transparent to-[#0B1F33]/30 pointer-events-none" />

        {/* Expand affordance */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/15 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="View gallery"
        >
          <Expand size={13} /> View gallery
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/15 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/15 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter + dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="text-[11px] font-bold text-white/90 tabular-nums tracking-wide">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-5 bg-[#F6931F]" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F33]/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <div
            className="relative w-full max-w-3xl bg-[#0F2A45] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black">
              <Image
                src={`/${images[currentIndex].url}`}
                alt={`${title} - Slide ${currentIndex + 1}`}
                fill
                className="object-contain"
              />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-colors"
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Compact info footer */}
            <div className="flex items-center justify-between gap-4 px-5 py-3 bg-[#0F2A45] border-t border-white/10">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{title}</p>
                <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                  Photo {currentIndex + 1} of {images.length}
                </p>
              </div>
              {images.length > 1 && (
                <div className="flex gap-1.5 shrink-0">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "w-5 bg-[#F6931F]" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}