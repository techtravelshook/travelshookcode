// app/api/blogs/sidebar/route.js
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    // ── 1. All published blogs (only fields we need) ──────────────────────────
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: {
        id:          true,
        title:       true,
        slug:        true,
        category:    true,
        coverImage:  true,
        publishedAt: true,
        createdAt:   true,
      },
      orderBy: { createdAt: "desc" },
    });

    // ── 2. Categories with counts ─────────────────────────────────────────────
    // Group manually from the blogs array — avoids a second DB round-trip
    const categoryMap = {};
    for (const blog of blogs) {
      const name = (blog.category || "Uncategorised").trim();
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      if (!categoryMap[slug]) {
        categoryMap[slug] = { name, slug, count: 0 };
      }
      categoryMap[slug].count++;
    }
    const categories = Object.values(categoryMap).sort((a, b) => b.count - a.count);

    // ── 3. Recent posts (latest 5) ────────────────────────────────────────────
    const posts = blogs.slice(0, 5).map((b) => ({
      title:    b.title,
      slug:     `/blogs/${b.slug}`,
      category: b.category || null,
      coverImage: b.coverImage,
      date: (b.publishedAt ?? b.createdAt).toLocaleDateString("en-GB", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
      }),
    }));

    // ── 4. Popular categories (top 6 by count) ────────────────────────────────
    const popularCategories = categories.slice(0, 6);

    // ── 5. Total stats ────────────────────────────────────────────────────────
    const totalBlogs      = blogs.length;
    const totalCategories = categories.length;

    return NextResponse.json({
      success:    true,
      categories: popularCategories,
      posts,
      stats: { totalBlogs, totalCategories },
    });
  } catch (err) {
    console.error("Sidebar API error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load sidebar data" },
      { status: 500 }
    );
  }
}