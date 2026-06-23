"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const monthsOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthlyPackageSlider({
  packages,
  PackageCard,
  onCardClick,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 12000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const groupedPackages = monthsOrder
    .map((month) => ({
      month,
      packages: packages.filter(
        (pkg) => pkg.month?.toLowerCase() === month.toLowerCase()
      ),
    }))
    .filter((item) => item.packages.length);

  // Initialize dots and update when Embla re-initializes
  useEffect(() => {
    if (!emblaApi) return;

    const updateSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    updateSnaps();

    emblaApi.on("reInit", updateSnaps);

    return () => {
      emblaApi.off("reInit", updateSnaps);
    };
  }, [emblaApi]);

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleDotClick = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="relative pb-10 pt-0 overflow-hidden dark:from-[#020617] dark:via-[#071019] dark:to-[#020617]">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#F6931F]/15 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#0070A1]/15 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#F6931F]/5 to-[#0070A1]/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {groupedPackages.map((group) => (
              <div key={group.month} className="flex-[0_0_100%]">
                <div className="pt-4">
                  <div className="mb-8">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-slate-100/20 dark:shadow-none">
                      <div className="flex flex-col items-start">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#F6931F] to-[#faaa49] text-white shadow-sm mb-3">
                          <Sparkles size={12} className="animate-pulse" />
                          <span>Exclusive Deals</span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">
                          {group.month}
                        </h3>

                        <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
                          Premium Umrah Packages for {group.month}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-6 md:mt-0 self-end md:self-center">
                        <button
                          onClick={scrollPrev}
                          className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-[#F6931F] hover:text-[#F6931F] dark:hover:text-[#F6931F] transition-all duration-300 active:scale-95 group"
                        >
                          <ChevronLeft
                            size={20}
                            className="group-hover:-translate-x-0.5 transition-transform"
                          />
                        </button>

                        <button
                          onClick={scrollNext}
                          className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-[#0070A1] hover:text-[#0070A1] dark:hover:text-[#0070A1] transition-all duration-300 active:scale-95 group"
                        >
                          <ChevronRight
                            size={20}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {group.packages.map((pkg, index) => (
                      <PackageCard
                        key={pkg.id || index}
                        pkg={pkg}
                        index={index}
                        onClick={() =>
                          onCardClick({
                            monthSlug: group.month.toLowerCase(),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded ${
                index === selectedIndex
                  ? "w-6 h-2 bg-[#F6931F]"
                  : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}