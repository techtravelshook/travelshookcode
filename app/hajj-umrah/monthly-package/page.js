"use client";

import React, { useMemo, useState } from "react";
import AboutChooseus from "@/components/aboutus/AboutChooseus";
import { usePackages } from "@/hooks/usePackage";
import BookingProcess from "@/components/hajjumrah/BookingProcess";
import PackageBanner from "@/components/hajjumrah/packagedetails/PackageBanner";
import PackageSlider from "@/components/hajjumrah/packagedetails/PackageSlider";
import HolidayInquiryForms from "@/components/Holidays/HolidayInquryForms";
import { useRouter } from "next/navigation";
import Image from "next/image";

const getImageSrc = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
};

const SectionLabel = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C47A1E] mb-4">
    <span className="w-5 h-[1.5px] bg-[#C47A1E] rounded-full" />
    {children}
    <span className="w-5 h-[1.5px] bg-[#C47A1E] rounded-full" />
  </span>
);


const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden border border-[#E8E0D0] animate-pulse">
    <div className="h-44 bg-[#EDE8DC]" />
    <div className="p-5 space-y-3 bg-white">
      <div className="h-3 bg-[#EDE8DC] rounded-full w-1/2" />
      <div className="h-4 bg-[#EDE8DC] rounded-full w-3/4" />
      <div className="h-3 bg-[#EDE8DC] rounded-full w-full" />
      <div className="h-3 bg-[#EDE8DC] rounded-full w-5/6" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Package Card
   NOTE: No filter state here — state lives in
   MonthlyPackageGrid (the correct scope).
───────────────────────────────────────────── */
const PackageCard = ({ pkg, index, onClick }) => {
  const imgSrc = getImageSrc(pkg.images?.[0]?.url);

  // Derive a readable label from the API's "star" enum (e.g. "STAR_4" → "4 Star")
  const starLabel = pkg.star
    ? pkg.star.replace("STAR_", "") + " Star"
    : null;

  // Use month if present, else fall back to type label
  const badgeText = pkg.month || (pkg.type === "LUXURY" ? "Luxury" : "Umrah");

  return (
    <article
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden border border-[#E8E0D0] bg-white cursor-pointer
                 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_rgba(196,122,30,0.22)]
                 hover:border-[#C47A1E]/50"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#DDD5C2]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-bold tracking-wider uppercase text-white bg-[#C47A1E]/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
            {badgeText}
          </span>
        </div>

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                        flex items-center justify-center opacity-0 group-hover:opacity-100
                        translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          

        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#C47A1E] mb-2">
          {pkg.month ? `${pkg.month} Departures` : "Year-Round Departures"}
        </p>

        <h3 className="text-base font-bold text-[#1A1208] mb-2 leading-snug group-hover:text-[#9A5A0E] transition-colors">
          {pkg.title}
        </h3>

        <p className="text-[13px] text-[#6B5C42] leading-relaxed line-clamp-2 mb-4">
          {pkg.shortDesc || pkg.description || "Premium Umrah experience with hand-picked hotels near the Haram."}
        </p>

        {/* Star + Duration info row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {starLabel && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A5C2A] bg-[#FAF3E7] px-2 py-0.5 rounded-md border border-[#E8D5B0]">
              ★ {starLabel}
            </span>
          )}
          {pkg.duration > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A5C2A] bg-[#FAF3E7] px-2 py-0.5 rounded-md border border-[#E8D5B0]">
              🕐 {pkg.duration} Nights
            </span>
          )}
        </div>

        {/* Price row */}
        {pkg.price && (
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-xs text-[#9A8970]">From</span>
            <span className="text-lg font-black text-[#1A1208]">£{pkg.price.toLocaleString()}</span>
            <span className="text-xs text-[#9A8970]">pp</span>
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E8E0D0]
                           text-[13px] font-semibold text-[#7A5C2A]
                           group-hover:bg-[#C47A1E] group-hover:border-[#C47A1E] group-hover:text-white
                           transition-all duration-300">
          Explore Package
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────
   Filter Bar
───────────────────────────────────────────── */
const FilterBar = ({
  filterOptions,
  selectedMonth,
  setSelectedMonth,
  selectedStar,
  setSelectedStar,
  selectedDuration,
  setSelectedDuration,
  filteredCount,
  onReset,
}) => {
  const hasActiveFilters =
    selectedMonth !== "All" || selectedStar !== "All" || selectedDuration !== "All";

  return (
    <div className=" mb-10 w-full bg-white border border-[#E8E0D0] shadow-[0_10px_30px_-15px_rgba(196,122,30,0.15)] rounded-2xl p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Month Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A5C2A]">
            Departure Month
          </label>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#1A1208] text-[14px] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C47A1E] focus:ring-1 focus:ring-[#C47A1E] appearance-none cursor-pointer"
            >
              {filterOptions.months.map((m) => (
                <option key={m} value={m}>{m === "All" ? "All Months" : m}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A5C2A]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Star Rating Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A5C2A]">
            Hotel Standard
          </label>
          <div className="relative">
            <select
              value={selectedStar}
              onChange={(e) => setSelectedStar(e.target.value)}
              className="w-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#1A1208] text-[14px] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C47A1E] focus:ring-1 focus:ring-[#C47A1E] appearance-none cursor-pointer"
            >
              {filterOptions.stars.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Standards" : `${s} Star Hotels`}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A5C2A]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Duration Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A5C2A]">
            Package Duration
          </label>
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-[#FAF8F4] border border-[#E8E0D0] text-[#1A1208] text-[14px] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C47A1E] focus:ring-1 focus:ring-[#C47A1E] appearance-none cursor-pointer"
            >
              {filterOptions.durations.map((d) => (
                <option key={d} value={d}>{d === "All" ? "All Durations" : `${d} Nights`}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A5C2A]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active filter status line */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-[#E8E0D0]/60 flex items-center justify-between text-xs">
          <span className="text-[#6B5C42]">
            Found <strong>{filteredCount}</strong> matching premium {filteredCount === 1 ? "offer" : "offers"}.
          </span>
          <button
            onClick={onReset}
            className="text-[#C47A1E] font-bold hover:underline flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Active Filters
          </button>
        </div>
      )}
    </div>
  );
};


const MonthlyPackageGrid = ({ packages, onCardClick }) => {
  
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedStar, setSelectedStar] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const filterOptions = useMemo(() => {
    const months = new Set();
    const stars = new Set();
    const durations = new Set();
    packages.forEach((pkg) => {
      if (pkg.month) months.add(pkg.month);
      if (pkg.star) stars.add(pkg.star.replace("STAR_", ""));
      if (pkg.duration && pkg.duration > 0) durations.add(String(pkg.duration));
    });
    return {
      months: ["All", ...Array.from(months).sort()],
      stars: ["All", ...Array.from(stars).sort((a, b) => Number(b) - Number(a))],
      durations: ["All", ...Array.from(durations).sort((a, b) => Number(a) - Number(b))],
    };
  }, [packages]);

  // ── Apply filters ────────────────────────────
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchMonth =
        selectedMonth === "All" || pkg.month === selectedMonth;
      const matchStar =
        selectedStar === "All" ||
        pkg.star === `STAR_${selectedStar}`; // compare back to enum form
      const matchDuration =
        selectedDuration === "All" || String(pkg.duration) === selectedDuration;

      return matchMonth && matchStar && matchDuration;
    });
  }, [packages, selectedMonth, selectedStar, selectedDuration]);

  // ── Reset ────────────────────────────────────
  const resetFilters = () => {
    setSelectedMonth("All");
    setSelectedStar("All");
    setSelectedDuration("All");
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 dark:text-[#1A1208]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          
        />
      </div>

      <div className="relative max-w-8xl mx-auto">
        {/* Section header */}
        <div className=" mb-10">
          <SectionLabel>Our Umrah Packages</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1A1208] leading-tight tracking-tight dark:text-white">
            Explore Our{" "}
            <span
              className="relative inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #C47A1E 0%, #E8A83E 45%, #0070A1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Premium Packages
            </span>
          </h2>
          
          <div className="flex items-center  gap-3 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C47A1E]" />
          
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C47A1E]" />
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <FilterBar
          filterOptions={filterOptions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedStar={selectedStar}
          setSelectedStar={setSelectedStar}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          filteredCount={filteredPackages.length}
          onReset={resetFilters}
        />

        {/* ── Cards grid ── */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id || `${pkg.month}-${index}`}
                pkg={pkg}
                index={index}
                onClick={() =>
                  onCardClick({
                    slug: pkg.slug,
                    monthSlug: (pkg.month || "").toLowerCase(),
                  })
                }
              />
            ))}
          </div>
        ) : (
          /* No results state */
          <div className="py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#EDE8DC] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9A8970]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#1A1208]">No packages match your filters</p>
            <p className="text-sm text-[#9A8970] max-w-xs">
              Try adjusting or clearing your filters to see more options.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-5 py-2 rounded-full bg-[#C47A1E] text-white text-sm font-semibold hover:bg-[#9A5A0E] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#9A8970] mb-4">
            Can&apos;t find the right package? We can arrange custom departure dates.
          </p>
 <a 
  href="https://wa.me/923124928496?text=Hello%20TravelHooks%2C%20I%27m%20interested%20in%20custom%20Umrah%20packages.%20Can%20you%20help%3F" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-400 text-white text-sm font-semibold hover:bg-[#C47A1E] transition-colors duration-300"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.179.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.239 3.48 8.421-.003 6.557-5.338 11.907-11.892 11.907-2.001-.001-3.97-.51-5.713-1.482L0 24zm6.59-4.817c1.649.978 3.26 1.484 4.797 1.485 5.383 0 9.764-4.393 9.766-9.791.001-2.615-1.015-5.074-2.862-6.924C16.44 2.103 13.985 1.08 11.39 1.08c-5.385 0-9.766 4.392-9.769 9.79-.001 2.215.58 4.38 1.687 6.26l-.41 1.498 1.543-.405zm10.743-7.234c-.267-.134-1.579-.78-1.823-.868-.243-.088-.42-.133-.596.134-.176.265-.68.867-.833 1.044-.153.177-.306.199-.573.065-.268-.135-1.13-.417-2.152-1.33-.795-.71-1.332-1.587-1.488-1.854-.157-.266-.017-.41.117-.543.12-.12.267-.31.4-.464.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.464-.067-.134-.596-1.439-.817-1.97-.215-.518-.432-.447-.596-.455-.154-.007-.331-.009-.508-.009-.177 0-.464.066-.707.31-.243.243-.93.908-.93 2.212 0 1.304.948 2.564 1.08 2.741.133.177 1.865 2.85 4.518 3.993.631.272 1.125.435 1.509.557.634.202 1.21.174 1.666.106.508-.076 1.579-.645 1.801-1.238.221-.593.221-1.103.155-1.21-.066-.107-.243-.177-.511-.311z" />
  </svg>
  WhatsApp Us
</a>


        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Loading state
───────────────────────────────────────────── */
const LoadingGrid = () => (
  <section className="py-10 px-4 sm:px-6 lg:px-10 bg-[#FAF8F4]">
    <div className="max-w-8xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Error banner
───────────────────────────────────────────── */
const ErrorBanner = ({ message }) => (
  <div className="mx-4 sm:mx-10 my-6 flex items-start gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-100">
    <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <p className="text-sm font-medium text-red-800">Failed to load packages</p>
      <p className="text-xs text-red-600 mt-0.5">{message}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const Page = () => {
  const router = useRouter();
  const { packages: allPackages, loading, mounted, error } = usePackages("MONTHLY");

 const handleCardClick = (pkg) => {
  if (!pkg?.slug) return;
  router.push(`/hajj-umrah/monthly-package/${pkg.slug}`);
};

  if (!mounted) return null;

  return (
    <main>
      {/* ── Hero / Slider ── */}
      <PackageSlider
        packages={allPackages}
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Makkah Banner"
        badgeText="Our Monthly Umrah Packages"
        mainTitle={
          <>
            Explore Our <br />
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #C47A1E 0%, #E8A83E 50%, #0070A1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-black"
            >
              Monthly Packages
            </span>
          </>
        }
        description="Book your premium Umrah package with hand-picked hotel accommodations right next to the Haram."
        primaryBtnText="View Packages"
        formComponent={<HolidayInquiryForms formType="umrah" />}
      />

      {/* ── Error ── */}
      {error && <ErrorBanner message={error} />}

      {/* ── Grid with filters ── */}
      {loading ? (
       <div>
         <LoadingGrid />
        <p>Loading packages</p>
       </div>
      ) : (
        !error &&
        allPackages?.length > 0 && (
          <MonthlyPackageGrid
            packages={allPackages}
            onCardClick={handleCardClick}
          />
        )
      )}

      {/* ── Empty state ── */}
      {!loading && !error && (!allPackages || allPackages.length === 0) && (
        <div className="py-24 flex flex-col items-center gap-4 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#EDE8DC] flex items-center justify-center">
            <svg className="w-7 h-7 text-[#9A8970]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-[#1A1208]">No packages available yet</p>
          <p className="text-sm text-[#9A8970] max-w-xs">
            Monthly Umrah packages are being prepared. Please check back soon.
          </p>
        </div>
      )}


      

      {/* ── Marketing blocks ── */}
      <AboutChooseus />
      <PackageBanner />
      <BookingProcess />
    </main>
  );
};

export default Page;