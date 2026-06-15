'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function FlightsZigzag() {
  const pathname = usePathname();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const slug = pathname.split('/').pop() || 'australia';
        const response = await fetch(`/api/flightcontent/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [pathname]);

  if (loading || !content) {
    return (
      <div className="py-12 text-center text-xs font-bold uppercase tracking-[3px] text-slate-400">
        Loading TravelsHook Details...
      </div>
    );
  }

  const getCleanImgSrc = (path) => {
    if (!path) return '/placeholder-image.jpg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 font-mulish">
      {/* First Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950/50 rounded-2xl mb-6">
            <div className="w-2 h-2 bg-[#E68213] rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E68213]">Travel Insights</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-slate-900 dark:text-white">
            {content.section1Title}
          </h3>

          <div className="mt-8 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-400 max-w-2xl">
            {content.section1Content}
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 dark:shadow-black/60 aspect-[4/3] group">
            <Image
              src={getCleanImgSrc(content.section1img)}
              alt={content.section1Title || "Australia Travel"}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Second Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 dark:shadow-black/60 aspect-[4/3] group">
            <Image
              src={getCleanImgSrc(content.section2img)}
              alt={content.section2Title || "Australia Airport"}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 rounded-2xl mb-6">
            <div className="w-2 h-2 bg-[#0070A1] rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0070A1]">Airport Guide</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-slate-900 dark:text-white">
            {content.section2Title}
          </h3>

          <div className="mt-8 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-400 max-w-2xl">
            {content.section2Content}
          </div>
        </div>
      </div>
    </section>
  );
}