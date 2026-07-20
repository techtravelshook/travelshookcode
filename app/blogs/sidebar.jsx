'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Tag, Clock, Mail, ArrowRight, ChevronRight } from 'lucide-react';

export default function BlogSidebar() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Umrah Guides', count: 14, slug: 'umrah-guides' },
    { name: 'Hajj Tips', count: 9, slug: 'hajj-tips' },
    { name: 'Holiday Packages', count: 18, slug: 'holiday-packages' },
    { name: 'Travel Tips', count: 22, slug: 'travel-tips' },
    { name: 'Visa & Documents', count: 7, slug: 'visa-documents' },
    { name: 'Packing Lists', count: 11, slug: 'packing-lists' },
  ];

  const recentPosts = [
    {
      title: 'Complete Umrah Checklist: Everything You Need Before You Fly',
      date: 'July 15, 2026',
      readTime: '6 min read',
      slug: '/blogs/umrah-checklist',
    },
    {
      title: 'Best Time to Perform Hajj: Season, Weather & Crowd Guide',
      date: 'July 10, 2026',
      readTime: '5 min read',
      slug: '/blogs/best-time-for-hajj',
    },
    {
      title: 'Top 10 Hotels Near Masjid al-Haram for Your Pilgrimage Stay',
      date: 'July 5, 2026',
      readTime: '7 min read',
      slug: '/blogs/hotels-near-haram',
    },
    {
      title: 'How to Get Your UK Umrah Visa in 2026: Step-by-Step',
      date: 'June 28, 2026',
      readTime: '4 min read',
      slug: '/blogs/uk-umrah-visa-2026',
    },
  ];

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <aside aria-label="Blog sidebar" className="space-y-6">

      {/* ── Search ── */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <label htmlFor="blog-search" className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
          <Search className="w-4 h-4 text-[#0070A1]" />
          Search Articles
        </label>
        <div className="relative">
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Umrah tips, Hajj guide…"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
              rounded-xl pl-4 pr-10 py-2.5 text-sm text-zinc-800 dark:text-zinc-200
              placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0070A1]/40
              focus:border-[#0070A1] transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
          <Tag className="w-4 h-4 text-[#0070A1]" />
          Browse by Topic
        </h2>
        <ul className="space-y-1" role="list">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/blogs/category/${cat.slug}`}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl
                  hover:bg-[#0070A1]/6 dark:hover:bg-[#0070A1]/10 transition-colors duration-150"
              >
                <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400
                  group-hover:text-[#0070A1] dark:group-hover:text-[#4db8e8] font-medium transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-150" />
                  {cat.name}
                </span>
                <span className="text-xs font-semibold text-[#0070A1] bg-[#0070A1]/10 dark:bg-[#0070A1]/20
                  px-2.5 py-0.5 rounded-full tabular-nums">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Recent Posts ── */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
          <Clock className="w-4 h-4 text-[#0070A1]" />
          Recent Articles
        </h2>
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800" role="list">
          {recentPosts.map((post, i) => (
            <li key={i} className={i === 0 ? '' : 'pt-4'}>
              <Link
                href={post.slug}
                className="group block pb-4 last:pb-0"
              >
                {/* Orange accent line on hover */}
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#F6931F] opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200
                      group-hover:text-[#0070A1] dark:group-hover:text-[#4db8e8] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <p className="text-xs text-zinc-400">{post.date}</p>
                      <span className="text-zinc-300 dark:text-zinc-600">·</span>
                      <p className="text-xs text-zinc-400">{post.readTime}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Newsletter ── */}
      <div className="relative overflow-hidden rounded-2xl p-5 shadow-sm">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070A1] to-[#00537a]" />
        {/* Decorative circle */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#F6931F]/20" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-3">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">Newsletter</span>
          </div>

          <h2 className="text-white font-bold text-base leading-snug mb-1">
            Travel tips straight to your inbox
          </h2>
          <p className="text-white/70 text-xs leading-relaxed mb-4">
            Umrah guides, Hajj news, exclusive deals — delivered weekly. Join 4,000+ pilgrims.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-3">
              <span className="text-white text-sm font-medium">
                🎉 You&apos;re subscribed!
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-2.5
                  text-white placeholder:text-white/50 text-sm focus:outline-none
                  focus:ring-2 focus:ring-white/30 transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="group w-full flex items-center justify-center gap-2 bg-[#F6931F]
                  hover:bg-[#e07e10] text-white font-semibold text-sm rounded-xl py-2.5
                  transition-colors duration-200 shadow-lg shadow-[#F6931F]/20"
              >
                Subscribe Free
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>

    </aside>
  );
}