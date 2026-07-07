'use client';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const DESKTOP_SLIDES = [
  '/imgs/p1.webp',
  '/imgs/p3.webp',
  '/imgs/p04.webp',
  '/imgs/p5.webp',
];
const MOBILE_SLIDES = [
  '/imgs/mb010.webp',
  '/imgs/mb111.png',
  '/imgs/mb4.webp',
  '/imgs/mb060.webp',
];

const INTERVAL_MS = 3000;

export default function TravelSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);

  const slides = useMemo(
    () => (isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES),
    [isMobile]
  );

  useEffect(() => {
    let raf;
    const handleResize = () => {
      raf = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 768);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const slidesLengthRef = useRef(slides.length);
  useEffect(() => { slidesLengthRef.current = slides.length; });

  const shouldResetRef = useRef(false);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentIndex((prev) => {
          if (shouldResetRef.current) {
            shouldResetRef.current = false;
            return 0;
          }
          return (prev + 1) % slidesLengthRef.current;
        });
      }
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    shouldResetRef.current = true;
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [slides.length, startInterval]);

  const goTo = useCallback(
    (index) => {
      setCurrentIndex((index + slidesLengthRef.current) % slidesLengthRef.current);
      startInterval();
    },
    [startInterval]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const arrowBtnBase = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease',
    background: 'linear-gradient(135deg, #F6931F 0%, #e07b10 100%)',
    boxShadow: '0 4px 15px rgba(246, 147, 31, 0.4)',
  };

  const arrowBtnHover = {
    transform: 'translateY(-50%) scale(1.1)',
    filter: 'brightness(1.15)',
    boxShadow: '0 6px 20px rgba(246, 147, 31, 0.6)',
  };

  // ── Mobile slider: natural image height, no forced aspect ratio ──
  if (isMobile) {
    return (
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide track — uses aspect-ratio so image renders at its natural proportion */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {slides.map((src, index) => (
            <div
              key={src}
              className="relative min-w-full"
              style={{ aspectRatio: '9 / 16' }} // ← match your mobile image ratio; adjust if needed (e.g. '3/4', '1/1')
            >
              <Image
                src={src}
                alt={`Travel slide ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                className="object-cover" // ← cover instead of fill; no stretching
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                rounded-full transition-all duration-500 ease-out
                ${currentIndex === index
                  ? 'w-7 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'}
              `}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop slider: original behaviour, unchanged ──
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom: '45.458%', height: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        setHoveredBtn(null);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide track */}
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {slides.map((src, index) => (
          <div key={src} className="relative min-w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Travel slide ${index + 1}`}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className="object-fill"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full transition-all duration-500 ease-out
              ${currentIndex === index
                ? 'w-7 h-2 bg-white shadow-md'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'}
            `}
          />
        ))}
      </div>

      {/* Arrows — desktop only */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        onMouseEnter={() => setHoveredBtn('prev')}
        onMouseLeave={() => setHoveredBtn(null)}
        style={{
          ...arrowBtnBase,
          left: '20px',
          ...(hoveredBtn === 'prev' ? arrowBtnHover : {}),
        }}
      >
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          position: 'relative', transition: 'transform 0.2s ease',
          transform: hoveredBtn === 'prev' ? 'translateX(-2px)' : 'translateX(0)',
        }}>
          <ChevronLeft />
        </span>
      </button>

      <button
        onClick={goNext}
        aria-label="Next slide"
        onMouseEnter={() => setHoveredBtn('next')}
        onMouseLeave={() => setHoveredBtn(null)}
        style={{
          ...arrowBtnBase,
          right: '20px',
          ...(hoveredBtn === 'next' ? arrowBtnHover : {}),
        }}
      >
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          position: 'relative', transition: 'transform 0.2s ease',
          transform: hoveredBtn === 'next' ? 'translateX(2px)' : 'translateX(0)',
        }}>
          <ChevronRight />
        </span>
      </button>
    </div>
  );
}