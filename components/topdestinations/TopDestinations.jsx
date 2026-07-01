'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

/* ─── Skeleton Card ────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-pulse">
      <div className="h-72 sm:h-80 md:h-96 bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 sm:p-7 space-y-3">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-4/5" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-3/5" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-2/5" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24" />
          <div className="h-11 bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-32" />
        </div>
      </div>
    </div>
  );
}

/* ─── Destination Card ─────────────────────────────────────────── */
function Card({ dest }) {
  const imageSrc = dest?.image?.startsWith('/')
    ? dest.image
    : `/${dest?.image || 'placeholder.jpg'}`;

  return (
    <article className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={dest?.city || 'Destination'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-1.5 z-10">
          ★ {dest?.duration}
        </div>

        {/* City / Country overlay */}
        <div className="absolute bottom-5 left-5 right-5 text-white z-10">
          <p className="text-3xl sm:text-4xl font-bold tracking-tighter drop-shadow-md leading-tight">
            {dest?.city}
          </p>
          <p className="text-sm sm:text-base text-white/85 flex items-center gap-1.5 mt-1">
            📍 {dest?.country}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-7 flex flex-col flex-1">
        <p className="line-clamp-3 text-sm sm:text-base leading-relaxed mb-5 text-zinc-500 dark:text-zinc-400 flex-1">
          {dest?.desc}
        </p>
        
        <div className="flex items-end justify-between gap-3 mt-auto flex-wrap sm:flex-nowrap">
          <div className="flex-shrink-0">
            <span className="text-xs uppercase tracking-widest text-zinc-400">From</span>
            <div className="text-3xl sm:text-4xl font-bold tracking-tighter mt-0.5 text-zinc-900 dark:text-white">
              ${dest?.price}
              <span className="text-sm font-normal text-zinc-400">/person</span>
            </div>
          </div>

          {/* Updated Attractive Button */}
          <Link
            href={`/topdestinations/destinations/${slugify(dest?.title || dest?.city || '')}`}
            className="group relative flex-shrink-0 overflow-hidden bg-gradient-to-r from-[#E68213] via-amber-500 to-[#E68213] text-black px-8 py-3.5 rounded-3xl font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px]"
          >
            <span>View Package</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Brand accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#E68213] via-[#0070A1] to-[#E68213] flex-shrink-0" />
    </article>
  );
}

/* ─── Country Filter ───────────────────────────────────────────── */
function CountryFilter({ countries, filter, setFilter }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeLabel = filter === 'All' ? 'All Destinations' : filter;

  return (
    <div className="w-full lg:w-auto">
      {/* Mobile Dropdown */}
      <div className="lg:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold text-base shadow-sm hover:shadow-md active:bg-zinc-50 dark:active:bg-zinc-800 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E68213] flex-shrink-0 ring-2 ring-orange-200 dark:ring-orange-900" />
            <span>{activeLabel}</span>
          </div>
          <svg
            className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <ul className="absolute z-50 mt-2 w-full rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden py-1">
            {countries.map((country) => {
              const isActive = filter === country;
              return (
                <li key={country}>
                  <button
                    onClick={() => {
                      setFilter(country);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-[#E68213]'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                        isActive ? 'bg-[#E68213] scale-110' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    />
                    {country === 'All' ? 'All Destinations' : country}
                    {isActive && (
                      <svg className="ml-auto w-5 h-5 text-[#E68213]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Desktop Pills */}
      <div className="hidden lg:flex items-center gap-3 flex-wrap">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setFilter(country)}
            className={`px-6 py-3 rounded-3xl text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm ${
              filter === country
                ? 'bg-gradient-to-r from-[#E68213] to-amber-500 text-black shadow-orange-500/30 scale-105'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-[#E68213] hover:text-[#E68213] hover:shadow-md'
            }`}
          >
            {country === 'All' ? 'All Destinations' : country}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function TopDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/top-destination');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const countries = ['All', ...new Set(destinations.map((d) => d.country))];
  const filteredDest =
    filter === 'All' ? destinations : destinations.filter((d) => d.country === filter);

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/id/1015/2000/1200"
            alt="Hero travel background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#0070A1]/50 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto w-full py-24 sm:py-32">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl px-5 sm:px-7 py-2.5 rounded-3xl mb-6 sm:mb-8 border border-white/20">
            <div className="w-2 h-2 bg-[#E68213] rounded-full animate-pulse" />
            <span className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-semibold text-white">
              Holiday Magic Awaits
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 sm:mb-6 leading-[0.95] text-white">
            Your Dream
            <br />
            <span className="bg-gradient-to-r from-[#E68213] via-amber-400 to-white bg-clip-text text-transparent">
              Holiday Escape
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Exclusive packages crafted for unforgettable memories
          </p>

          {/* Updated Hero Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#destinations"
              className="group w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#E68213] via-amber-500 to-[#E68213] text-black px-10 py-4 rounded-3xl font-semibold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">Explore Packages</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <Link
              href="#romantic-getaways"
              className="group w-full sm:w-auto border-2 border-white/60 hover:border-white/90 bg-white/10 hover:bg-white/15 backdrop-blur-xl px-10 py-4 rounded-3xl font-semibold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Romantic Getaways
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-14 sm:py-20 lg:py-28">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-14">
            <div className="max-w-2xl">
              <span className="inline-block px-5 py-2 text-xs sm:text-sm tracking-widest font-semibold rounded-full bg-orange-100 dark:bg-[#E68213]/10 text-[#E68213]">
                CURATED FOR THIS SEASON
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-3 bg-gradient-to-r from-[#E68213] via-[#0070A1] to-amber-400 bg-clip-text text-transparent leading-tight">
                Top Holiday Destinations
              </h2>
              <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
                {loading
                  ? 'Loading destinations…'
                  : `${filteredDest.length} destination${filteredDest.length !== 1 ? 's' : ''} available`}
              </p>
            </div>

            {!loading && destinations.length > 0 && (
              <CountryFilter
                countries={countries}
                filter={filter}
                setFilter={setFilter}
              />
            )}
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredDest.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                No destinations found
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Try a different country filter.
              </p>
              <button
                onClick={() => setFilter('All')}
                className="px-8 py-3.5 rounded-3xl bg-gradient-to-r from-[#E68213] to-amber-500 text-black font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                Show all destinations
              </button>
            </div>
          )}

          {/* Mobile Horizontal Scroll */}
          {!loading && filteredDest.length > 0 && (
            <>
              <div className="sm:hidden -mx-4 px-4">
                <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                  {filteredDest.map((dest) => (
                    <div key={dest.id} className="min-w-[88vw] max-w-[88vw] snap-center flex-shrink-0">
                      <Card dest={dest} />
                    </div>
                  ))}
                </div>
                {filteredDest.length > 1 && (
                  <p className="text-center text-xs text-zinc-400 mt-1">
                    Swipe to explore
                  </p>
                )}
              </div>

              {/* Desktop Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredDest.map((dest) => (
                  <Card key={dest.id} dest={dest} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}