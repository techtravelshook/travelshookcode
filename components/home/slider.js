"use client";
import React, { useState, useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const FlightSearchWidget = dynamic(
  () => import("../filter/FlightFilter"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[120px] animate-pulse rounded-xl bg-white/10" />
    ),
  }
);

const SLIDES = [
  {
    title: "Trace The Sacred",
    subtitle: "Luxury Umrah",
    desc: "Experience 5-star luxury at the heart of Makkah and Madinah with exclusive travel experiences.",
    img: "/imgs/slider01.webp",
    accent: "#E68213",
  },
  {
    title: "Alpine Wonders",
    subtitle: "Explore The Alps",
    desc: "Explore breathtaking landscapes, premium stays, and unforgettable moments across Europe.",
    img: "/imgs/slider02.webp",
    accent: "#0070A1",
  },
  {
    title: "Fly Across Africa",
    subtitle: "50+ Destinations",
    desc: "Connecting you to Africa's most iconic destinations with comfort, elegance, and adventure.",
    img: "/imgs/slider03.webp",
    accent: "#E68213",
  },
];

function HomeSlider() {
  const [index, setIndex] = useState(0);
  const current = SLIDES[index];
  const words = current.title.split(" ");

  // Auto slide with useCallback for memoization
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black font-mulish min-h-[75vh] py-8 sm:py-12 flex items-center justify-center">
      <style jsx>{`
        @keyframes slideInImage {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInText {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInSubtitle {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes colorPulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }

        .slide-image {
          animation: slideInImage 0.6s ease-in-out forwards;
        }

        .slide-subtitle {
          animation: slideInSubtitle 0.5s ease-out 0.1s forwards;
        }

        .slide-title {
          animation: slideInText 0.6s ease-out 0.2s forwards;
        }

        .slide-desc {
          animation: slideInText 0.6s ease-out 0.3s forwards;
        }

        .color-accent {
          color: ${current.accent};
        }
      `}</style>

      {/* BACKGROUND IMAGE - Simplified */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          key={current.img}
          src={current.img}
          alt={current.title}
          fill
          priority={index === 0}
          sizes="100vw"
          quality={60}
          className="object-cover slide-image"
        />

        {/* Single dark overlay - removed layered overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* MINIMAL GRID - removed for performance */}
      {/* CONTENT */}
      <div className="relative z-40 w-full flex flex-col items-center pt-8 pb-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
            {/* SUBTITLE */}
            <div className="slide-subtitle mt-14">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-2 will-change-transform">
                <div className="h-[2px] w-10 bg-[#E68213]" />
                <span
                  className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold color-accent transition-colors duration-300"
                  style={{ color: current.accent }}
                >
                  {current.subtitle}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="slide-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white will-change-transform">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`inline-block mr-3 transition-colors duration-300 ${
                    i === words.length - 1 ? "color-accent" : "text-white"
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* DESCRIPTION */}
            <p className="slide-desc text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed will-change-transform">
              {current.desc}
            </p>

            {/* SEARCH */}
            <div className="w-full max-w-12xl">
              <FlightSearchWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HomeSlider);