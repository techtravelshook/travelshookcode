'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import ImageGalleryBrowser from "@/components/ImageGalleryBrowser";

export default function EditBlogPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    author: "",
    published: false,
    faqs: [{ question: "", answer: "" }],
    images: [],
  });

  // ── Load blog on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          alert("Blog not found");
          router.push("/admin/blogs");
          return;
        }

        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          coverImage: data.coverImage,
          category: data.category,
          author: data.author,
          published: data.published,
          faqs: data.faqs?.length > 0 ? data.faqs : [{ question: "", answer: "" }],
          images: data.images || [],
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load blog.");
      } finally {
        setFetching(false);
      }
    }

    if (slug) loadBlog();
  }, [slug]);

  // ── Generic field change ─────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ── Slug helpers ─────────────────────────────────────────────────────────────
  const autoSlugFromTitle = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug:
        prev.slug === "" || prev.slug === autoSlugFromTitle(prev.title)
          ? autoSlugFromTitle(title)
          : prev.slug,
    }));
  };

  // ── Gallery pick ─────────────────────────────────────────────────────────────
  const handleGalleryPick = (url) => {
    setForm((prev) => ({ ...prev, coverImage: url }));
  };

  // ── FAQs ─────────────────────────────────────────────────────────────────────
  const addFaq = () =>
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));

  const removeFaq = (index) =>
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...form.faqs];
    updatedFaqs[index][field] = value;
    setForm((prev) => ({ ...prev, faqs: updatedFaqs }));
  };

  // ── Additional images ────────────────────────────────────────────────────────
  const removeImage = (index) =>
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          faqs: form.faqs.filter((faq) => faq.question && faq.answer),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update blog.");
        return;
      }

      alert("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── Cover image src ───────────────────────────────────────────────────────────
  const coverSrc = form.coverImage
    ? form.coverImage.startsWith("/") || form.coverImage.startsWith("http")
      ? form.coverImage
      : `/uploads/blogs/${form.coverImage}`
    : null;

  // ── Loading state ─────────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── Title + Slug ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Blog Title</label>
            <input
              name="title" value={form.title} onChange={handleTitleChange} required
              className="w-full border rounded-xl p-4"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Slug{" "}
              <span className="text-xs text-gray-400">(auto-generated from title)</span>
            </label>
            <input
              name="slug" value={form.slug} onChange={handleChange} required
              className="w-full border rounded-xl p-4 font-mono text-sm"
              placeholder="best-hajj-packages-2026"
            />
          </div>
        </div>

        {/* ── Excerpt ───────────────────────────────────────────────────────────── */}
        <div>
          <label className="block mb-2 font-medium">Excerpt</label>
          <textarea
            name="excerpt" value={form.excerpt} onChange={handleChange}
            rows={4} className="w-full border rounded-xl p-4" required
            placeholder="A short summary shown in blog cards and meta descriptions..."
          />
        </div>

        {/* ── Cover Image ───────────────────────────────────────────────────────── */}
        <div>
          <label className="block mb-2 font-medium">Cover Image</label>

          <div className="flex gap-3 items-center">
            <input
              name="coverImage" value={form.coverImage} onChange={handleChange}
              className="flex-1 border rounded-xl p-4"
              placeholder="/imgs/hajj/hajj29.jpg"
              required
            />
            <button
              type="button"
              onClick={() => setShowGallery((v) => !v)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors whitespace-nowrap
                ${showGallery
                  ? "bg-orange-600 text-white border-orange-600"
                  : "border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 text-gray-700 dark:text-gray-200"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {showGallery ? "Hide gallery" : "Browse gallery"}
            </button>
          </div>

          {coverSrc && (
            <div className="relative mt-3 h-40 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <Image
                src={coverSrc} alt="Cover image preview" fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                onError={(e) => e.currentTarget.parentElement?.classList.add("hidden")}
                unoptimized
              />
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, coverImage: "" }))}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-colors"
                title="Remove cover image"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* ── Image Gallery Browser ─────────────────────────────────────────────── */}
        {showGallery && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium">Image Gallery</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  <strong>Click</strong> an image → sets it as cover image &nbsp;·&nbsp;
                  <strong>Drag</strong> an image → drop it into the editor to insert inline
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕ Close
              </button>
            </div>
            <ImageGalleryBrowser onPick={handleGalleryPick} />
          </div>
        )}

        {/* ── Category + Author ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <input
              name="category" value={form.category} onChange={handleChange} required
              className="w-full border rounded-xl p-4" placeholder="Hajj"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Author</label>
            <input
              name="author" value={form.author} onChange={handleChange} required
              className="w-full border rounded-xl p-4" placeholder="Muhammad Afraz"
            />
          </div>
        </div>

        {/* ── Blog Content ──────────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">
              Blog Content
              <span className="ml-2 text-xs text-gray-400 font-normal">
                Bold, italic, headings, links, lists — all supported
              </span>
            </label>
            {!showGallery && (
              <button
                type="button"
                onClick={() => setShowGallery(true)}
                className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium border border-orange-300 rounded-lg px-3 py-1.5 hover:bg-orange-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Open gallery to drag images
              </button>
            )}
          </div>
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
          />
        </div>

        {/* ── Gallery Images ────────────────────────────────────────────────────── */}
        <div>
          <label className="block mb-3 font-medium">
            Gallery Images
            <span className="ml-2 text-xs text-gray-400 font-normal">
              (shown as a photo gallery section, separate from inline images)
            </span>
          </label>
          <input
            type="text"
            placeholder="Type an image path and press Enter, e.g. /imgs/hajj/women7.jpg"
            className="w-full border rounded-xl p-4 mb-4"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                e.preventDefault();
                setForm((prev) => ({
                  ...prev,
                  images: [
                    ...prev.images,
                    { url: e.target.value.trim(), alt: "", caption: "", paragraph: 0 },
                  ],
                }));
                e.target.value = "";
              }
            }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.images.map((img, index) => (
            <div key={index} className="relative border rounded-xl overflow-hidden">
  <div className="relative w-full h-32">
    <Image 
      src={img.url} 
      alt={img.alt || "Uploaded image preview"} 
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover" 
    />
  </div>
  <button
    type="button"
    onClick={() => removeImage(index)}
    className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm leading-none"
  >
    ×
  </button>
  <input
    type="text"
    placeholder="Alt text (for SEO)"
    value={img.alt}
    onChange={(e) => {
      const newImages = [...form.images];
      newImages[index] = { ...newImages[index], alt: e.target.value };
      setForm((prev) => ({ ...prev, images: newImages }));
    }}
    className="text-xs p-2 w-full border-t relative z-10"
  />
</div>
            ))}
          </div>
        </div>

        {/* ── FAQs ──────────────────────────────────────────────────────────────── */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-medium">FAQs</label>
            <button
              type="button" onClick={addFaq}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              + Add FAQ
            </button>
          </div>
          {form.faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium">FAQ #{index + 1}</h4>
                <button
                  type="button" onClick={() => removeFaq(index)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <input
                type="text" placeholder="Question" value={faq.question}
                onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                className="w-full border rounded-lg p-3 mb-3"
              />
              <textarea
                placeholder="Answer" value={faq.answer} rows={3}
                onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>
          ))}
        </div>

        {/* ── Publish toggle ────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox" id="published" name="published"
            checked={form.published} onChange={handleChange}
            className="w-4 h-4 accent-orange-600"
          />
          <label htmlFor="published" className="cursor-pointer">Publish immediately</label>
        </div>

        <button
          type="submit" disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-medium text-lg w-full md:w-auto transition-colors"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}