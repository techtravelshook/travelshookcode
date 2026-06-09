"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const groupedPackages = monthsOrder
    .map((month) => ({
      month,
      packages: packages.filter(
        (pkg) =>
          pkg.month?.toLowerCase() === month.toLowerCase()
      ),
    }))
    .filter((item) => item.packages.length);

  return (
    <section className="relative pb-10 pt-0 overflow-hidden dark:from-[#020617] dark:via-[#071019] dark:to-[#020617]">
      {/* Premium Background Effects */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#F6931F]/15 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#0070A1]/15 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#F6931F]/5 to-[#0070A1]/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".month-prev",
            nextEl: ".month-next",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 12000,
            disableOnInteraction: false,
          }}
          spaceBetween={40}
          className="monthly-swiper pb-14"
        >
          {groupedPackages.map((group) => (
            <SwiperSlide key={group.month}>
              <div className="pt-4">
                {/* Unified Month Card Header Banner */}
                <div className="mb-8">
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between  border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-slate-100/20 dark:shadow-none">
                    
                    {/* Month Titles & Badge */}
                    <div className="flex flex-col items-start">
                      {/* Premium Badge Above Month */}
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

                    {/* Integrated Navigation Controls */}
                    <div className="flex gap-3 mt-6 md:mt-0 self-end md:self-center">
                      <button className="month-prev w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-[#F6931F] hover:text-[#F6931F] dark:hover:text-[#F6931F] transition-all duration-300 active:scale-95 group">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                      </button>

                      <button className="month-next w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-[#0070A1] hover:text-[#0070A1] dark:hover:text-[#0070A1] transition-all duration-300 active:scale-95 group">
                        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Packages Grid */}
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Bullet Style Extensions */}
        <style jsx global>{`
          .monthly-swiper .swiper-button-prev,
          .monthly-swiper .swiper-button-next {
            display: none !important;
          }

          .monthly-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #cbd5e1;
            opacity: 1;
            transition: all 0.3s ease;
          }

          .monthly-swiper .swiper-pagination-bullet-active {
            background: #f6931f;
            width: 24px;
            border-radius: 4px;
          }
        `}</style>
      </div>
    </section>
  );
}
