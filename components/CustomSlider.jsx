// "use client";

// import Image from "next/image";
// import { useEffect, useState, useMemo } from "react";

// export default function CustomSlider({ images = [] }) {
//   const [current, setCurrent] = useState(0);
//   const [visibleSlides, setVisibleSlides] = useState(4);
//   const [activeModalImage, setActiveModalImage] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const sanitizedImages = useMemo(() => {
//     return images
//       .map((img) => {
//         if (!img) return null;
//         if (typeof img === "object" && (img.src || img.default?.src)) return img;
//         if (typeof img === "object") return img.url || img.src || img.image || null;
//         if (typeof img === "string") {
//           const cleaned = img.trim();
//           if (cleaned && !cleaned.startsWith("/") && !cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
//             return `/${cleaned}`;
//           }
//           return cleaned || null;
//         }
//         return null;
//       })
//       .filter(Boolean);
//   }, [images]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setVisibleSlides(1);
//       else if (window.innerWidth < 1024) setVisibleSlides(2);
//       else setVisibleSlides(4);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (sanitizedImages.length <= visibleSlides || activeModalImage !== null) return;
//     const interval = setInterval(() => {
//       setCurrent((prev) =>
//         prev >= sanitizedImages.length - visibleSlides ? 0 : prev + 1
//       );
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [sanitizedImages, visibleSlides, activeModalImage]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") setActiveModalImage(null);
//     };
//     if (activeModalImage) {
//       window.addEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "unset";
//     };
//   }, [activeModalImage]);

//   const nextSlide = () => {
//     setCurrent((prev) =>
//       prev >= sanitizedImages.length - visibleSlides ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? sanitizedImages.length - visibleSlides : prev - 1
//     );
//   };

//   // Determine which slide indices are "current" (visible)
//   const activeIndices = Array.from({ length: visibleSlides }, (_, i) => current + i);

//   if (sanitizedImages.length === 0) {
//     return (
//       <div className="w-full text-center py-12 text-white/50 font-medium tracking-wide">
//         No deals currently available.
//       </div>
//     );
//   }

//   return (
//     <div className="relative max-w-8xl mx-auto px-3 py-6 rounded-3xl overflow-hidden shadow-2xl">

//       {/* ── Gradient Background: Orange → Teal ── */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#F6931F] via-[#0f8a8a] to-[#0070A1] -z-20" />

//       {/* Diagonal stripe texture overlay */}
//       <div
//         className="absolute inset-0 opacity-[0.06] -z-10"
//         style={{
//           backgroundImage:
//             "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
//         }}
//       />

//       {/* Ambient glow orbs */}
//       <div className="absolute top-[-60px] left-[-60px] w-70 h-50 bg-[#F6931F]/40 rounded-full blur-[110px] pointer-events-none -z-10" />
//       <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-[#0070A1]/50 rounded-full blur-[110px] pointer-events-none -z-10" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-white/5 rounded-full blur-[80px] pointer-events-none -z-10" />

//       {/* ── Header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 ml-2 gap-4 relative z-10">
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="h-2 w-2 rounded-full bg-white animate-ping" />
//             <span className="text-xs font-bold uppercase tracking-widest text-white/70">
//               Special Promotions
//             </span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white drop-shadow-lg">
//             Latest{" "}
//             <span className="text-white  decoration-white/30 underline-offset-4">
//               Deals
//             </span>
//           </h1>
        
//         </div>

//         {/* Desktop Nav Buttons */}
//         {sanitizedImages.length > visibleSlides && (
//           <div className="hidden sm:flex items-center gap-2 mr-4">
//             <button
//               onClick={prevSlide}
//               className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#0070A1] transition-all duration-300 backdrop-blur-sm shadow-lg font-bold"
//             >
//               ❮
//             </button>
//             <button
//               onClick={nextSlide}
//               className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#0070A1] transition-all duration-300 backdrop-blur-sm shadow-lg font-bold"
//             >
//               ❯
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ── Slider Viewport ── */}
//       <div className="relative px-1 z-10 overflow-hidden">
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${current * (100 / visibleSlides)}%)` }}
//         >
//           {sanitizedImages.map((img, index) => {
//             const isCurrent = activeIndices.includes(index);
//             const isHovered = hoveredIndex === index;

//             return (
//               <div
//                 key={index}
//                 className={`flex-shrink-0 px-3 transition-all duration-500 ${
//                   visibleSlides === 1
//                     ? "w-full"
//                     : visibleSlides === 2
//                     ? "w-1/2"
//                     : "w-1/4"
//                 }`}
//               >
//                 {/* Card */}
//                 <div
//                   onClick={() => setActiveModalImage(img)}
//                   onMouseEnter={() => setHoveredIndex(index)}
//                   onMouseLeave={() => setHoveredIndex(null)}
//                   className={`
//                     group relative overflow-hidden rounded-2xl cursor-pointer
//                     transition-all duration-500
//                     ${isCurrent && isHovered
//                       ? "ring-4 ring-white ring-offset-4 ring-offset-transparent scale-[1.04] shadow-[0_0_40px_rgba(255,255,255,0.35)]"
//                       : isCurrent
//                       ? "ring-2 ring-white/60 ring-offset-2 ring-offset-transparent shadow-[0_0_20px_rgba(255,255,255,0.15)]"
//                       : "ring-1 ring-white/10 shadow-xl opacity-80"
//                     }
//                   `}
//                 >
//                   {/* Current slide animated border ring */}
//                   {isCurrent && (
//                     <span className="pointer-events-none absolute inset-0 rounded-2xl z-20 ring-2 ring-white/30 animate-pulse" />
//                   )}

//                   {/* Image */}
//                   <div className="relative aspect-square w-full overflow-hidden bg-white/5">
//                     <Image
//                       src={img}
//                       alt={`Flyer ${index + 1}`}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                      className="object-cover transition-all duration-500 ease-out group-hover:scale-130" 
//                       priority={index < 4}
//                     />

//                     {/* Bottom fade — softened so flyer stays visible */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-20 transition-opacity duration-400" />

//                     {/* Hover overlay with CTA */}
//                     <div className="absolute inset-0 flex items-center justify-center bg-[#0070A1]/0 group-hover:bg-[#0070A1]/20 transition-colors duration-300">
//                       <span
//                         className="
//                           bg-white/90 backdrop-blur-sm text-[#0070A1] text-xs px-4 py-2 rounded-full
//                           font-bold tracking-wide shadow-lg
//                           scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100
//                           transition-all duration-300
//                         "
//                       >
//                         View Flyer 🔍
//                       </span>
//                     </div>
//                   </div>

//                   {/* Index badge
//                   <div
//                     className={`
//                       absolute top-3 left-3 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-lg
//                       transition-all duration-300
//                       ${isCurrent
//                         ? "bg-white text-[#F6931F] shadow-md"
//                         : "bg-black/40 backdrop-blur-sm text-white/70 border border-white/20"
//                       }
//                     `}
//                   >
//                     0{index + 1}
//                   </div> */}

//                   {/* "Current" label badge on active slides */}
//                   {isCurrent && (
//                     <div className="absolute top-3 right-3 bg-[#F6931F] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-md animate-pulse">
//                       ● Live
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Dot Indicators ── */}
//       {sanitizedImages.length > visibleSlides && (
//         <div className="flex justify-center gap-2 mt-8 relative z-10">
//           {Array.from({ length: sanitizedImages.length - visibleSlides + 1 }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`rounded-full transition-all duration-300 ${
//                 i === current
//                   ? "w-6 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
//                   : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       {/* ── Mobile Nav Buttons ── */}
//       {sanitizedImages.length > visibleSlides && (
//         <div className="sm:hidden flex justify-center gap-4 mt-6 relative z-10">
//           <button
//             onClick={prevSlide}
//             className="w-12 h-12 rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white text-lg font-bold shadow-xl"
//           >
//             ❮
//           </button>
//           <button
//             onClick={nextSlide}
//             className="w-12 h-12 rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white text-lg font-bold shadow-xl"
//           >
//             ❯
//           </button>
//         </div>
//       )}

//       {/* ── Lightbox Modal ── */}
//       {activeModalImage && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
//           onClick={() => setActiveModalImage(null)}
//         >
//           {/* Close Button */}
//           <button
//             className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white text-xl flex items-center justify-center hover:bg-[#F6931F] hover:border-orange-400 transition-all shadow-2xl backdrop-blur-sm"
//             onClick={() => setActiveModalImage(null)}
//           >
//             ✕
//           </button>

//           {/* Modal Image */}
//           <div
//             className="relative max-w-3xl w-full max-h-[60vh] aspect-square overflow-hidden rounded-2xl border-2 border-white/20 shadow-[0_0_60px_rgba(246,147,31,0.3)]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={activeModalImage}
//               alt="Expanded Deal Flyer"
//               fill
//               className="object-contain bg-black"
//               priority
//               sizes="(max-width: 1200px) 100vw, 1200px"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";

export default function CustomSlider({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Touch tracking refs
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const sanitizedImages = useMemo(() => {
    return images
      .map((img) => {
        if (!img) return null;
        if (typeof img === "object" && (img.src || img.default?.src)) return img;
        if (typeof img === "object") return img.url || img.src || img.image || null;
        if (typeof img === "string") {
          const cleaned = img.trim();
          if (cleaned && !cleaned.startsWith("/") && !cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
            return `/${cleaned}`;
          }
          return cleaned || null;
        }
        return null;
      })
      .filter(Boolean);
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sanitizedImages.length <= visibleSlides || activeModalImage !== null) return;
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= sanitizedImages.length - visibleSlides ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [sanitizedImages, visibleSlides, activeModalImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalImage(null);
    };
    if (activeModalImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalImage]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= sanitizedImages.length - visibleSlides ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? sanitizedImages.length - visibleSlides : prev - 1
    );
  };

  // ── Non-passive touchmove registration (needed so e.preventDefault() works) ──
  const sliderRef = useRef(null);
 const handleTouchStart = (e) => {
    // Don't hijack multi-touch gestures (e.g. pinch-zoom)
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 8) {
      isDragging.current = true;
      e.preventDefault(); 
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (isDragging.current && Math.abs(dx) > 40 && dy < 80) {
      if (dx < 0) {
        nextSlide(); 
      } else {
        prevSlide(); 
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", handleTouchMove);
  }, []); 
  const activeIndices = Array.from({ length: visibleSlides }, (_, i) => current + i);

  if (sanitizedImages.length === 0) {
    return (
      <div className="w-full text-center py-12 text-white/50 font-medium tracking-wide">
        No deals currently available.
      </div>
    );
  }

  return (
    <div className="relative max-w-8xl mx-auto px-3 py-6 rounded-3xl overflow-hidden shadow-2xl">

      {/* ── Gradient Background: Orange → Teal ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F6931F] via-[#0f8a8a] to-[#0070A1] -z-20" />

      {/* Diagonal stripe texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-[-60px] left-[-60px] w-70 h-50 bg-[#F6931F]/40 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-[#0070A1]/50 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-white/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 ml-2 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Special Promotions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white drop-shadow-lg">
            Latest{" "}
            <span className="text-white decoration-white/30 underline-offset-4">
              Deals
            </span>
          </h1>
        </div>

        {/* Desktop Nav Buttons */}
        {sanitizedImages.length > visibleSlides && (
          <div className="hidden sm:flex items-center gap-2 mr-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#0070A1] transition-all duration-300 backdrop-blur-sm shadow-lg font-bold"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#0070A1] transition-all duration-300 backdrop-blur-sm shadow-lg font-bold"
            >
              ❯
            </button>
          </div>
        )}
      </div>

      {/* ── Slider Viewport ── */}
      <div
        ref={sliderRef}
        className="relative px-1 z-10 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * (100 / visibleSlides)}%)` }}
        >
          {sanitizedImages.map((img, index) => {
            const isCurrent = activeIndices.includes(index);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`flex-shrink-0 px-3 transition-all duration-500 ${
                  visibleSlides === 1
                    ? "w-full"
                    : visibleSlides === 2
                    ? "w-1/2"
                    : "w-1/4"
                }`}
              >
                {/* Card */}
                <div
                  onClick={() => {
                    // Don't open modal if we were swiping
                    if (!isDragging.current) setActiveModalImage(img);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    group relative overflow-hidden rounded-2xl cursor-pointer
                    transition-all duration-500
                    ${isCurrent && isHovered
                      ? "ring-4 ring-white ring-offset-4 ring-offset-transparent scale-[1.04] shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                      : isCurrent
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-transparent shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "ring-1 ring-white/10 shadow-xl opacity-80"
                    }
                  `}
                >
                  {/* Current slide animated border ring */}
                  {isCurrent && (
                    <span className="pointer-events-none absolute inset-0 rounded-2xl z-20 ring-2 ring-white/30 animate-pulse" />
                  )}

                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-white/5">
                    <Image
                      src={img}
                      alt={`Flyer ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-all duration-500 ease-out group-hover:scale-130"
                      priority={index < 4}
                    />

                    {/* Bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-20 transition-opacity duration-400" />

                    {/* Hover overlay with CTA */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0070A1]/0 group-hover:bg-[#0070A1]/20 transition-colors duration-300">
                      <span
                        className="
                          bg-white/90 backdrop-blur-sm text-[#0070A1] text-xs px-4 py-2 rounded-full
                          font-bold tracking-wide shadow-lg
                          scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100
                          transition-all duration-300
                        "
                      >
                        View Flyer 🔍
                      </span>
                    </div>
                  </div>

                  {/* "Current" label badge on active slides */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 bg-[#F6931F] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-md animate-pulse">
                      ● Live
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot Indicators ── */}
      {sanitizedImages.length > visibleSlides && (
        <div className="flex justify-center gap-2 mt-8 relative z-10">
          {Array.from({ length: sanitizedImages.length - visibleSlides + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Mobile Nav Buttons ── */}
      {sanitizedImages.length > visibleSlides && (
        <div className="sm:hidden flex justify-center gap-4 mt-6 relative z-10">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white text-lg font-bold shadow-xl"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white text-lg font-bold shadow-xl"
          >
            ❯
          </button>
        </div>
      )}

      {/* ── Lightbox Modal ── */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onClick={() => setActiveModalImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white text-xl flex items-center justify-center hover:bg-[#F6931F] hover:border-orange-400 transition-all shadow-2xl backdrop-blur-sm"
            onClick={() => setActiveModalImage(null)}
          >
            ✕
          </button>

          {/* Modal Image */}
          <div
            className="relative max-w-3xl w-full max-h-[60vh] aspect-square overflow-hidden rounded-2xl border-2 border-white/20 shadow-[0_0_60px_rgba(246,147,31,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeModalImage}
              alt="Expanded Deal Flyer"
              fill
              className="object-contain bg-black"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
