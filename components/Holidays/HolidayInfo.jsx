import React from 'react';
import { Palmtree } from 'lucide-react';

// Curated 18 Trending Holiday Packages Data with Days & Pricing Mapping
const holidayPackages = [
  { country: 'Turkey',        days: '7 Nights',  price: '499', pence: '00' },
  { country: 'Dubai',         days: '5 Nights',  price: '549', pence: '50' },
  { country: 'Greece',        days: '7 Nights',  price: '399', pence: '00' },
  { country: 'Maldives',      days: '10 Nights', price: '1299', pence: '99' },
  { country: 'Spain',         days: '5 Nights',  price: '289', pence: '75' },
  { country: 'Thailand',      days: '9 Nights',  price: '649', pence: '00' },
  { country: 'Egypt',         days: '7 Nights',  price: '379', pence: '50' },
  { country: 'Morocco',       days: '6 Nights',  price: '319', pence: '00' },
  { country: 'Mauritius',     days: '7 Nights',  price: '999', pence: '00' },
  { country: 'Bali',          days: '10 Nights', price: '789', pence: '25' },
  { country: 'Sri Lanka',     days: '8 Nights',  price: '580', pence: '00' },
  { country: 'Italy',         days: '5 Nights',  price: '340', pence: '90' },
  { country: 'Switzerland',   days: '6 Nights',  price: '460', pence: '00' },
  { country: 'France',        days: '4 Nights',  price: '299', pence: '50' },
  { country: 'Malaysia',      days: '7 Nights',  price: '520', pence: '00' },
  { country: 'Malta',         days: '5 Nights',  price: '241', pence: '89' },
  { country: 'Portugal',      days: '6 Nights',  price: '265', pence: '00' },
  { country: 'Cyprus',        days: '7 Nights',  price: '275', pence: '00' },
];

const col1 = holidayPackages.slice(0, 6);
const col2 = holidayPackages.slice(6, 12);
const col3 = holidayPackages.slice(12, 18);

// Sub-Component: Individual Holiday Item Row with Days Badge
function HolidayRow({ country, days, price, pence }) {
  return (
    <div className="group flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-white/[0.06] hover:border-[#E68213]/30 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <Palmtree
          size={14}
          className="text-slate-400 dark:text-white/25 group-hover:text-[#E68213] transition-colors duration-200 shrink-0"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="text-[13.5px] font-semibold text-slate-800 dark:text-white/90 group-hover:text-slate-900 group-hover:dark:text-white transition-colors duration-200">
            Holidays in {country}
          </span>
          {/* ⏳ NEW: Compact Days/Nights Badge tracker */}
          <span className="text-[10px] font-medium text-slate-400 dark:text-white/40 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full group-hover:bg-[#E68213]/10 group-hover:text-[#E68213] transition-colors duration-200 w-fit">
            {days}
          </span>
        </div>
      </div>
      
      {/* Price Target Panel Block */}
      <div className="flex items-baseline gap-0 ml-4 shrink-0">
        <span className="text-[11px] text-slate-400 dark:text-white/35 mr-1">fr.</span>
        <span className="text-[13.5px] font-bold text-slate-800 dark:text-white/90 group-hover:text-[#E68213] transition-colors duration-200">
          £{price}
        </span>
        <span className="text-[10px] font-bold text-slate-400 dark:text-white/45 leading-none self-start mt-0.5">
          .{pence}
        </span>
      </div>
    </div>
  );
}

const HolidaysInfo = () => {
  return (
    <section className="relative overflow-hidden w-full bg-white dark:bg-[#01080C] py-14 text-slate-900 dark:text-white transition-colors duration-500">
      <div className="container relative z-10 mx-auto px-6">

        {/* BRAND THEMED HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            
            {/* Matching Top Tracking Orange Badge */}
            <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
              Top Booked Packages
            </span>
            
            {/* Standardized Title Sync */}
            <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              Trending Holidays &
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic pr-2 ml-2">
                Deals
              </span>
            </h2>
            
            {/* Subtitle Sync */}
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Most requested holiday escapes this week — secure your booking at lowest rates.
            </p>

          </div>
        </div>

        {/* 3-Column Responsive Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
          <div>
            {col1.map((h) => (
              <HolidayRow key={h.country} country={h.country} days={h.days} price={h.price} pence={h.pence} />
            ))}
          </div>
          <div>
            {col2.map((h) => (
              <HolidayRow key={h.country} country={h.country} days={h.days} price={h.price} pence={h.pence} />
            ))}
          </div>
          <div>
            {col3.map((h) => (
              <HolidayRow key={h.country} country={h.country} days={h.days} price={h.price} pence={h.pence} />
            ))}
          </div>
        </div>

        {/* Dynamic Footer terms notes */}
        <p className="mt-8 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          * Prices shown are per person based on lowest available tour availability rates and subject to alterations.
        </p>
      </div>
    </section>
  );
};

export default HolidaysInfo;
