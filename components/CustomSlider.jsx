"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

export default function CustomSlider({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const sanitizedImages = useMemo(() => {
    return images
      .map((img) => {
        if (!img) return null;
        if (typeof img === "object" && (img.src || img.default?.src)) {
          return img;
        }
        if (typeof img === "object") {
          return img.url || img.src || img.image || null;
        }
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
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sanitizedImages.length <= visibleSlides) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= sanitizedImages.length - visibleSlides ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sanitizedImages, visibleSlides]);

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
  if (sanitizedImages.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-400">
        No valid images found.
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto px-3 py-5 overflow-hidden">
      <div className=" mb-8 ml-12">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-black leading-tight sm:leading-tight uppercase text-white tracking-tight">
          <span className="bg-gradient-to-r from-[#F6931F] via-orange-400 to-[#0070A1] bg-clip-text text-transparent">
            Latest Deals
          </span>
        </h1>

        <div className="relative mt-5">
          <div className="w-40 sm:w-52 md:w-64 h-[2px] bg-gray-300 relative overflow-hidden rounded-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0070A1] rounded-full animate-move-right"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E68213] rounded-full animate-move-left"></div>
          </div>
        </div>
      </div>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / visibleSlides)}%)`,
        }}
      >
        {sanitizedImages.map((img, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-2 ${
              visibleSlides === 1
                ? "w-full"
                : visibleSlides === 2
                ? "w-1/2"
                : "w-1/4"
            }`}
          >
            <div className="overflow-hidden rounded-2xl shadow-lg isolate">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={img}
                  alt={`Flyer ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sanitizedImages.length > visibleSlides && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
}
