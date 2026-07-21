"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import BlogsHeader from "./blogsheader";
import BlogSidebar from "./sidebar";
import Image from "next/image";

const BLOGS_PER_PAGE = 12;

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-pulse">
      <div className="h-48 bg-zinc-200 dark:bg-zinc-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-1/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full w-3/4" />
        <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-full" />
        <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-5/6" />
        <div className="pt-2 flex justify-between">
          <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-20" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}

// ─── Blog card ─────────────────────────────────────────────────────────────────
function BlogCard({ blog }) {
  const imgSrc = blog.coverImage?.startsWith("/")
    ? blog.coverImage
    : `/${blog.coverImage}`;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative overflow-hidden h-64 bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
  <Image
    src={imgSrc || "/placeholder-fallback.jpg"} // Fallback image if source is empty
    alt={blog.title || "Blog cover photo"}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
    loading="lazy" 
  />
  {/* Added z-10 below to keep overlay elements above the filled image layer */}
  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  {blog.category && (
    <span className="absolute top-3 left-3 z-10 bg-[#F6931F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
      {blog.category}
    </span>
  )}
</div>


      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        {blog.publishedAt && (
          <time className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium tracking-wide">
            {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        )}

        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-white line-clamp-2 mb-2 leading-snug group-hover:text-[#0070A1] dark:group-hover:text-[#38b6e0] transition-colors duration-200">
          {blog.title}
        </h3>

        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-1 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            {blog.author && (
              <>
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0070A1] to-[#F6931F] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                  {blog.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[80px]">
                  {blog.author}
                </span>
              </>
            )}
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0070A1] dark:text-[#38b6e0] flex-shrink-0">
            Read
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#0070A1] hover:text-[#0070A1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
      >
        ← Prev
      </button>

      {getPages().map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-zinc-400 text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-150
              ${p === page
                ? "bg-[#0070A1] text-white shadow-md border border-[#0070A1]"
                : "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#0070A1] hover:text-[#0070A1]"
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#0070A1] hover:text-[#0070A1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function BlogViews() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res  = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) setBlogs(data.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const totalPages     = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = blogs.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 m-3">
      <BlogsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-10 xl:gap-14 items-start">

          {/* ── Blog grid ── */}
          <div className="flex-1 min-w-0">

            {/* Heading */}
            <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F6931F] mb-2">
                  TravelHooks Journal
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Latest Articles
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm leading-relaxed max-w-lg">
                  Insights, guides, and stories to help you plan the perfect journey.
                </p>
              </div>
              {!loading && blogs.length > 0 && (
                <span className="flex-shrink-0 text-sm text-zinc-400 dark:text-zinc-500">
                  {blogs.length} article{blogs.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-[#0070A1]/30 via-[#F6931F]/30 to-transparent mb-8 rounded-full" />

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-3 xl:grid-cols-3 gap-2">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginatedBlogs.length === 0 ? (
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-20 text-center">
                <p className="text-4xl mb-4">✈️</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">No articles found yet.</p>
                <p className="text-zinc-400 dark:text-zinc-600 text-xs mt-1">Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
              </>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-60 xl:w-72 flex-shrink-0 sticky top-10">
            <BlogSidebar />
          </aside>

        </div>
      </div>
    </div>
  );
}