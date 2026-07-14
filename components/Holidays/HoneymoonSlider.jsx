"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand, Image as ImageIcon } from "lucide-react";

/**
 * ImageGallery
 *
 * Drop-in replacement for ImageSlider.
 * Props:
 *   images  — array of { id, url, packageId } from the DB
 *   title   — string, used as alt text
 *
 * Usage (in SinglePackagePage — replace <ImageSlider …> with this):
 *   import ImageGallery from "@/components/Holidays/ImageGallery";
 *   <ImageGallery images={pkg.images} title={pkg.title} />
 */
export default function ImageGallery({ images = [], title = "" }) {
  const [active, setActive]       = useState(0);
  const [lightbox, setLightbox]   = useState(false);
  const [lbIndex, setLbIndex]     = useState(0);

  // Normalise a DB url → Next.js src
  const src = (url) =>
    url ? `/${url.replace(/^\/+/, "")}` : "/placeholder.jpg";

  const total = images.length;

  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total]
  );

  const lbPrev = useCallback(
    () => setLbIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const lbNext = useCallback(
    () => setLbIndex((i) => (i + 1) % total),
    [total]
  );

  // Keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  lbPrev();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "Escape")     setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, lbPrev, lbNext]);

  const openLightbox = (idx) => {
    setLbIndex(idx);
    setLightbox(true);
  };

  if (!total) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0B1F33]">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <ImageIcon size={32} />
          <span className="text-xs font-medium">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Main gallery ─────────────────────────────────────────────────── */}
      <div className="relative h-full w-full flex flex-col bg-[#0B1F33]">

        {/* Hero image */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            key={active}
            src={src(images[active]?.url)}
            alt={`${title} – photo ${active + 1}`}
            fill
            priority
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* Dark vignette — bottom only, so the page's overlay still works */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

          {/* Expand to lightbox */}
          <button
            onClick={() => openLightbox(active)}
            aria-label="Open full-screen gallery"
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <Expand size={15} />
          </button>

          {/* Prev / Next arrows — only shown when more than 1 image */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-all hover:bg-black/65 active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-all hover:bg-black/65 active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Image counter pill */}
          {total > 1 && (
            <div className="absolute bottom-[76px] right-3 z-10 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              {active + 1} / {total}
            </div>
          )}
        </div>

        {/* Thumbnail strip — hidden when only 1 image */}
        {total > 1 && (
          <div className="flex h-[64px] shrink-0 gap-1.5 overflow-x-auto bg-black/70 px-2 py-2 scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={img.id ?? idx}
                onClick={() => setActive(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`relative h-full w-[72px] shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  idx === active
                    ? "border-[#F6931F] opacity-100 scale-[1.04]"
                    : "border-transparent opacity-55 hover:opacity-80"
                }`}
              >
                <Image
                  src={src(img.url)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-bold text-white">
            {lbIndex + 1} / {total}
          </div>

          {/* Main lightbox image */}
          <div
            className="relative mx-auto h-[80vh] w-full max-w-5xl px-14"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={lbIndex}
              src={src(images[lbIndex]?.url)}
              alt={`${title} – photo ${lbIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Lightbox prev / next */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Lightbox thumbnail strip */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
              {images.map((img, idx) => (
                <button
                  key={img.id ?? idx}
                  onClick={(e) => { e.stopPropagation(); setLbIndex(idx); }}
                  aria-label={`Jump to photo ${idx + 1}`}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    idx === lbIndex
                      ? "border-[#F6931F] opacity-100 scale-105"
                      : "border-transparent opacity-45 hover:opacity-75"
                  }`}
                >
                  <Image
                    src={src(img.url)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}