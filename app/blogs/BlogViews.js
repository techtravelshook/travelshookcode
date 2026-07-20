"use client";
import React from 'react';
import BlogsHeader from './blogsheader';

import BlogSidebar from './sidebar';

export default function BlogViews() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Header */}
      <BlogsHeader />

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Blog Content Area */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Latest Articles
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Discover insights, tips, and stories from the world of design and technology.
              </p>
            </div>

            {/* Blog Posts Grid / List will go here */}
            <div className="space-y-10">
              {/* Placeholder for your blog post cards */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
                  Your blog post cards will appear here...
                </p>
              </div>

              {/* Add more post cards as needed */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <BlogSidebar />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}