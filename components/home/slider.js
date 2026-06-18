"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import FlightSearchWidget from "../filter/FlightFilter";

const slides = [
  {
    title: "Trace The Sacred",
    subtitle: "Luxury Umrah ",
    desc: "Experience 5-star luxury at the heart of Makkah and Madinah with exclusive travel experiences.",
    img: "/imgs/slider01.jpg",
    accent: "#E68213",
  },
  {
    title: "Blessed Spirit Travels",
    subtitle: "Explore The Alps",
    desc: "Explore breathtaking landscapes, premium stays, and unforgettable moments across Europe.",
    img: "/imgs/slider02.jpg",
    accent: "#0070A1",
  },
  {
    title: "Fly Across Africa",
    subtitle: "50+ Destinations",
    desc: "Connecting you to Africa's most iconic destinations with comfort, elegance, and adventure.",
    img: "/imgs/slider03.jpg",
    accent: "#E68213",
  },
];

export default function HomeSlider() {
  const [index, setIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  const current = slides[index];

  const handleMouseMove = (e) => {
    const x =
      (e.clientX / window.innerWidth - 0.5) * 40;

    const y =
      (e.clientY / window.innerHeight - 0.5) * 40;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-black font-mulish"
      style={{ minHeight: "100svh" }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={index} className="absolute inset-0">
          <motion.div
            initial={{
              scale: 1.3,
              opacity: 0,
              filter: "blur(30px)",
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              scale: 1.15,
              opacity: 0,
              filter: "blur(20px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ x: smoothX, y: smoothY }}
            className="absolute inset-0 scale-110"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${current.img})`,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            exit={{ x: "0%" }}
            transition={{
              duration: 1.3,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 z-30 bg-[#E68213]"
          />

          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            exit={{ x: "0%" }}
            transition={{
              delay: 0.15,
              duration: 1.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 z-20 bg-[#0070A1]"
          />

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light" />

          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="absolute -left-20 top-20 h-[350px] w-[350px] rounded-full bg-[#E68213]/30 blur-[120px] md:h-[400px] md:w-[400px]"
          />

          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
            }}
            className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#0070A1]/30 blur-[140px] md:h-[450px] md:w-[450px]"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div
  className="relative z-40 w-full flex flex-col items-center pt-16 md:pt-0"
  style={{
    paddingTop: "clamp(4rem, 10vw, 8rem)",
    paddingBottom: "clamp(1.5rem, 4vw, 3.5rem)",
  }}
>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 w-full">
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
            <div className="w-full px-1">
              <motion.div
                key={current.subtitle}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4 flex items-center justify-center gap-4"
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-md mt-8 px-12 py-5 sm:px-5 sm:py-2 md:px-6 md:py-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  className="h-[2px] bg-[#E68213]"
                />

                <span
                  className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold"
                  style={{ color: current.accent }}
                >
                  {current.subtitle}
                </span>
                </div>
              </motion.div>

              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={current.title}
                    initial={{
                      y: 100,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    exit={{
                      y: -100,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-white tracking-tight"
                  >
                    {current.title.split(" ").map((word, i) => {
                      const isHighlight = i === current.title.split(" ").length - 1;

                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className={`mr-3 inline-block ${
                            isHighlight ? "text-[#E68213]" : "text-white"
                          }`}
                        >
                          {word}
                        </motion.span>
                      );
                    })}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed mx-auto px-2">
                {current.desc}
              </p>
            </div>

            <div className="w-full flex justify-center px-1 sm:px-2 mt-2">
              <div className="w-full max-w-5xl">
                <FlightSearchWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}