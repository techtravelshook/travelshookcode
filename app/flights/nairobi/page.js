"use client";

import React from 'react';

// FIXED: Ensuring a proper default React Component export exists
export default function NairobiFlightsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 text-slate-900 dark:text-white py-20">
      <div className="text-center space-y-4 max-w-xl px-4">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          Flights to <span className="text-[#F6931F]">Nairobi</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
          Explore our customized, highly requested dynamic flight routes configuration paths. Booking logs engine under scheduled parameters optimization structure setup.
        </p>
      </div>
    </div>
  );
}
