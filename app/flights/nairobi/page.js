"use client";

import React from 'react';

// Explicit structural default export component handle
export default function NairobiFlightsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#01080C] text-slate-900 dark:text-white py-20 text-center">
      <div className="text-center space-y-4 max-w-xl px-4">
        {/* FIXED SYNTAX: Pure typography standard string block components handles */}
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          Flights to <span className="text-[#F6931F]">Nairobi</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
          Explore our customized, highly requested dynamic flight routes configuration paths. Booking logs engine under scheduled parameters optimization structure setup.
        </p>
      </div>
    </div>
  );
}
