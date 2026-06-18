'use client';

import React, { useState, useEffect } from 'react';
import { Palmtree } from 'lucide-react';
import Link from 'next/link';

const HolidaysInfo = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/honeymoon', { 
      cache: 'no-store' 
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setPackages(data.data);
        } else {
          console.error("Invalid data format");
        }
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-14 text-center text-slate-600 dark:text-slate-400">
        Loading Trending honeymoon packages...
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden w-full bg-white dark:bg-[#01080C] py-14 text-slate-900 dark:text-white transition-colors duration-500">
      <div className="container relative z-10 mx-auto px-6">

        {/* Header - Same as your original */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
              Top Booked Packages
            </span>
            
            <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              Trending Holidays &amp;
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic pr-2 ml-2">
                Deals
              </span>
            </h2>
            
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Most requested honeymoon escapes this week — secure your booking at lowest rates.
            </p>
          </div>
        </div>

        {/* Simple Row List - No Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/honeymoon/${pkg.slug}`}
              className="group block"
            >
              <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-white/[0.06] hover:border-[#E68213]/30 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Palmtree
                    size={14}
                    className="text-slate-400 dark:text-white/25 group-hover:text-[#E68213] transition-colors duration-200 shrink-0"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-[13.5px] font-semibold text-slate-800 dark:text-white/90 group-hover:text-slate-900 group-hover:dark:text-white transition-colors duration-200">
                      {pkg.title}
                    </span>
                   
                  </div>
                </div>
                
                {/* Price Section */}
                <div className="flex items-baseline gap-0 ml-4 shrink-0">
                  <span className="text-[11px] text-slate-400 dark:text-white/35 mr-1">fr.</span>
                  <span className="text-[13.5px] font-bold text-slate-800 dark:text-white/90 group-hover:text-[#E68213] transition-colors duration-200">
                    £{pkg.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          * Prices shown are per person based on lowest available tour availability rates and subject to alterations.
        </p>
      </div>
    </section>
  );
};

export default HolidaysInfo;