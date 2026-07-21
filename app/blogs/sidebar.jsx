"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Tag, Clock, Mail, ArrowRight,
  ChevronRight, BookOpen, LayoutGrid,
} from "lucide-react";
import Image from "next/image";

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Sk({ w = "w-full", h = "h-3.5" }) {
  return <div className={`${w} ${h} rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse`} />;
}

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────
function SectionTitle({ icon: Icon, label }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
      <span className="w-6 h-6 rounded-lg bg-[#0070A1]/10 dark:bg-[#0070A1]/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-[#0070A1]" />
      </span>
      {label}
    </h2>
  );
}

// ─── Category pill colors (cycles through a small palette) ────────────────────
const PILL_COLORS = [
  "bg-blue-50  dark:bg-blue-900/20  text-blue-700  dark:text-blue-300",
  "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
  "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
  "bg-rose-50  dark:bg-rose-900/20  text-rose-700  dark:text-rose-300",
  "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
];

export default function BlogSidebar() {
  const [categories,  setCategories]  = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [stats,       setStats]       = useState(null);
  const [loading,     setLoading]     = useState(true);

  const [email,       setEmail]       = useState("");
  const [subscribed,  setSubscribed]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/blogs/sidebar");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
          setRecentPosts(data.posts);
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Sidebar fetch failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubscribe = () => { if (email.trim()) setSubscribed(true); };

  return (
    <aside aria-label="Blog sidebar" className="space-y-5">

      {/* ── Search ────────────────────────────────────────────────────────────── */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
              rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200
              placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0070A1]/30
              focus:border-[#0070A1] transition-all"
          />
        </div>
      </Card>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      {(loading || stats) && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen,   label: "Articles",   value: stats?.totalBlogs },
            { icon: LayoutGrid, label: "Topics",     value: stats?.totalCategories },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="!p-4 flex flex-col items-center text-center gap-1">
              {loading ? (
                <>
                  <Sk w="w-8" h="h-6" />
                  <Sk w="w-12" h="h-3" />
                </>
              ) : (
                <>
                  <span className="text-2xl font-black text-[#0070A1]">{value ?? 0}</span>
                  <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-wide">{label}</span>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* ── Categories ────────────────────────────────────────────────────────── */}
      <Card>
        <SectionTitle icon={Tag} label="Browse by Topic" />

        {loading ? (
          <div className="space-y-2.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Sk w="w-28" />
                <Sk w="w-8" h="h-5" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-xs text-zinc-400">No categories yet.</p>
        ) : (
          <ul className="space-y-1.5" role="list">
            {categories.map((cat, i) => (
              <li key={cat.slug}>
                <Link
                  href={`/blogs/category/${cat.slug}`}
                  className="group flex items-center justify-between px-3 py-2 rounded-xl
                    hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-150"
                >
                  <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400
                    group-hover:text-[#0070A1] dark:group-hover:text-[#4db8e8] font-medium transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#0070A1] transition-colors" />
                    {cat.name}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full tabular-nums ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── Recent Posts ──────────────────────────────────────────────────────── */}
      <Card>
        <SectionTitle icon={Clock} label="Recent Articles" />

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Sk w="w-14 h-14 flex-shrink-0" h="h-14" />
                <div className="flex-1 space-y-2 pt-1">
                  <Sk />
                  <Sk w="w-2/3" />
                  <Sk w="w-1/3" h="h-2.5" />
                </div>
              </div>
            ))}
          </div>
        ) : recentPosts.length === 0 ? (
          <p className="text-xs text-zinc-400">No posts yet.</p>
        ) : (
          <ul className="space-y-4" role="list">
            {recentPosts.map((post) => {
              const imgSrc = post.coverImage?.startsWith("/")
                ? post.coverImage
                : `/${post.coverImage}`;

              return (
                <li key={post.slug}>
                  <Link href={post.slug} className="group flex gap-3 items-start">
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
  {post.coverImage ? (
    <Image
      src={post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}
      alt={post.title || "Post thumbnail"}
      fill
      sizes="56px" // Optimizes performance by telling Next.js exactly how small this image is
      className="object-cover group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-[#0070A1]/20 to-[#F6931F]/20" />
  )}
</div>


                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {post.category && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6931F]">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-[12px] font-semibold leading-snug text-zinc-800 dark:text-zinc-200
                        group-hover:text-[#0070A1] dark:group-hover:text-[#4db8e8] transition-colors line-clamp-2 mt-0.5">
                        {post.title}
                      </h3>
                      {post.date && (
                        <p className="text-[10px] text-zinc-400 mt-1">{post.date}</p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ── Newsletter ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl p-5 shadow-sm">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070A1] via-[#00537a] to-[#003d5c]" />
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#F6931F]/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#F6931F]/5 blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">Newsletter</span>
          </div>

          <h2 className="text-white font-bold text-[15px] leading-snug mb-1.5">
            Travel tips in your inbox
          </h2>
          <p className="text-white/65 text-[12px] leading-relaxed mb-4">
            Umrah guides, Hajj news & exclusive deals — weekly.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
              <span className="text-white text-sm font-semibold">🎉 You&apos;re subscribed!</span>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="your@email.com"
                className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl
                  px-4 py-2.5 text-white placeholder:text-white/45 text-sm
                  focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="group w-full flex items-center justify-center gap-2 bg-[#F6931F]
                  hover:bg-[#e07e10] active:bg-[#c96e0a] text-white font-bold text-sm
                  rounded-xl py-2.5 transition-colors duration-200 shadow-lg shadow-black/20"
              >
                Subscribe Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          )}
        </div>
      </div>

    </aside>
  );
}