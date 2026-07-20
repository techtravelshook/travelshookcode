'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogsHeader() {
  return (
    <header
      aria-label="Featured blog post"
      className="relative w-full h-[520px] sm:h-[580px] md:h-[680px] lg:h-[650px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* ── Background Image ── */}
      <Image
        src="/imgs/hajj/hajj10.jpg"
        alt="Pilgrims gathering at Masjid al-Haram during Hajj season"
        fill
        className="object-cover object-center scale-[1] transition-transform duration-[8000ms] ease-out"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
      />

      {/* ── Cinematic Gradient Overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-[#0070A1]/30"
      />

      {/* ── Orange accent bar – bottom edge ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F6931F] via-[#F6931F]/70 to-transparent"
      />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Category eyebrow */}
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <span
            aria-hidden="true"
            className="block w-7 h-[2px] bg-[#F6931F] rounded-full"
          />
          <p className="text-[#F6931F] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            TravelHooks Journal
          </p>
        </div>

        {/* Main headline – SEO h1 */}
        <h1 className="text-white font-extrabold leading-[1.1] tracking-tight mb-4 md:mb-5 max-w-2xl lg:max-w-3xl
          text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          Your Complete Guide to{' '}
          <span className="text-[#F6931F]">Umrah & Hajj</span>{' '}
          — Planning, Packing & Spiritual Preparation
        </h1>

        {/* Standfirst */}
        <p className="text-white/80 leading-relaxed max-w-xl md:max-w-2xl mb-7 md:mb-9
          text-sm sm:text-base md:text-lg"
        >
          From visa requirements to packing essentials and day-by-day rituals, our
          pilgrimage experts share everything you need to make your sacred journey
          peaceful, prepared, and deeply meaningful.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/blogs"
            aria-label="Read the full Umrah and Hajj guide"
            className="group inline-flex items-center gap-2.5 bg-[#F6931F] hover:bg-[#e07e10]
              text-white font-semibold rounded-xl px-6 py-3 md:px-7 md:py-3.5
              transition-all duration-200 shadow-lg shadow-[#F6931F]/30
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6931F]
              text-sm md:text-base"
          >
            Read the Guide
            <svg
              aria-hidden="true"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href="/blogs"
            aria-label="Browse all blog posts"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white
              text-sm md:text-base font-medium transition-colors duration-200 underline-offset-4
              hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
          >
            Browse all posts
          </Link>
        </div>
      </div>

      
    </header>
  );
}