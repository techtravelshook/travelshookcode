import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import UmrahBookingModal from "../UmrahBookingModal";

// ─── Structured Data ──────────────────────────────────────────────────────────
function BlogJsonLd({ blog, url }) {
  const coverSrc = blog.coverImage?.startsWith("/") ? blog.coverImage : `/${blog.coverImage}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt ?? "",
    image: coverSrc,
    author: { "@type": "Person", name: blog.author ?? "TravelHooks" },
    publisher: { "@type": "Organization", name: "TravelHooks", url: "https://travelshook.co.uk" },
    datePublished: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
    dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function FaqJsonLd({ faqs }) {
  if (!faqs?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function BreadcrumbJsonLd({ blog }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://travelshook.co.uk" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://travelshook.co.uk/blogs" },
      { "@type": "ListItem", position: 3, name: blog.title },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: "Blog Not Found", robots: { index: false } };

  const coverSrc = blog.coverImage?.startsWith("/") ? blog.coverImage : `/${blog.coverImage}`;
  return {
    title: `${blog.title} | TravelHooks`,
    description: blog.excerpt ?? "",
    alternates: { canonical: `https://travelshook.co.uk/blogs/${slug}` },
    openGraph: {
      title: blog.title,
      description: blog.excerpt ?? "",
      type: "article",
      publishedTime: blog.publishedAt?.toISOString(),
      authors: blog.author ? [blog.author] : undefined,
      images: [{ url: coverSrc, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: { card: "summary_large_image", title: blog.title, description: blog.excerpt ?? "", images: [coverSrc] },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FaqItem({ faq }) {
  return (
    <details className="group border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-zinc-800 dark:text-zinc-100 text-sm md:text-base select-none list-none hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
        {faq.question}
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-500 flex items-center justify-center text-lg font-bold group-open:rotate-45 transition-transform duration-300">
          +
        </span>
      </summary>
      <div className="px-5 pb-5 pt-2 text-zinc-600 dark:text-zinc-400 leading-7 text-sm md:text-[15px]">
        {faq.answer}
      </div>
    </details>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      faqs:   { orderBy: { order: "asc" } },
    },
  });

  if (!blog) notFound();

  const coverSrc = blog.coverImage?.startsWith("/") ? blog.coverImage : `/${blog.coverImage}`;
  const canonicalUrl = `https://travelshook.co.uk/blogs/${slug}`;

  return (
    <>
      <BlogJsonLd blog={blog} url={canonicalUrl} />
      <BreadcrumbJsonLd blog={blog} />
      {blog.faqs?.length > 0 && <FaqJsonLd faqs={blog.faqs} />}

      <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">

        {/* ── Main container — mt-28 clears the fixed navbar on mobile, mt-32 on md+ ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24">

          {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/" className="hover:text-[#0070A1] transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">/</li>
              <li><Link href="/blogs" className="hover:text-[#0070A1] transition-colors">Blog</Link></li>
              <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">/</li>
              <li className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[160px] sm:max-w-xs" aria-current="page">
                {blog.title}
              </li>
            </ol>
          </nav>

          {/* ── Hero image ──────────────────────────────────────────────────────── */}
          {/* 
              Mobile:  aspect-[4/3]  — taller crop, fills the narrow screen nicely
              Tablet:  aspect-[16/8] 
              Desktop: aspect-[16/7] — cinematic wide
          */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl mb-8 md:mb-12">
            <Image
              src={coverSrc}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {blog.category && (
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold text-white bg-[#F6931F] px-3 py-1 rounded-full shadow-md">
                {blog.category}
              </span>
            )}
          </div>

          {/* ── Title + meta ─────────────────────────────────────────────────────── */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {blog.author && (
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0070A1] to-[#F6931F] flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  >
                    {blog.author.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{blog.author}</span>
                </span>
              )}
              {blog.publishedAt && (
                <>
                  <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">·</span>
                  <time dateTime={new Date(blog.publishedAt).toISOString()}>
                    {new Date(blog.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                </>
              )}
            </div>
          </div>

          {/* ── Two-column layout ────────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* ── Article ── */}
            <article className="flex-1 min-w-0 w-full" itemScope itemType="https://schema.org/BlogPosting">
              <meta itemProp="headline" content={blog.title} />
              {blog.publishedAt && (
                <meta itemProp="datePublished" content={new Date(blog.publishedAt).toISOString()} />
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <p
                  itemProp="description"
                  className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-8 md:leading-9 mb-8 md:mb-12 font-medium border-l-4 border-[#F6931F] pl-4 sm:pl-5"
                >
                  {blog.excerpt}
                </p>
              )}

              {/* Rich content */}
              <div
                itemProp="articleBody"
                className={[
                  "prose prose-base sm:prose-lg max-w-none dark:prose-invert",
                  "prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-headings:scroll-mt-24",
                  "prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 md:prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800 prose-h2:pb-2",
                  "prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3",
                  "prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-7 sm:prose-p:leading-8",
                  "prose-a:text-[#0070A1] dark:prose-a:text-[#38b6e0] prose-a:no-underline hover:prose-a:underline prose-a:font-medium",
                  "prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100",
                  "prose-li:text-zinc-700 dark:prose-li:text-zinc-300 prose-li:leading-7",
                  "prose-ul:my-3 prose-ol:my-3",
                  "prose-blockquote:border-l-4 prose-blockquote:border-[#F6931F] prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-orange-900/10 prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:rounded-r-lg",
                  "prose-img:rounded-xl md:prose-img:rounded-2xl prose-img:shadow-md prose-img:my-6 md:prose-img:my-8 prose-img:mx-auto",
                  "prose-table:w-full prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:text-sm",
                  "prose-thead:bg-[#0070A1]",
                  "prose-th:text-white prose-th:px-3 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-xs sm:prose-th:text-sm",
                  "prose-td:px-3 prose-td:py-2.5 prose-td:border-b prose-td:border-zinc-200 dark:prose-td:border-zinc-700 prose-td:text-xs sm:prose-td:text-sm",
                  "prose-tr:even:bg-zinc-50 dark:prose-tr:even:bg-zinc-800/40",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Gallery */}
              {blog.images.length > 0 && (
                <section className="mt-12 md:mt-16" aria-label="Blog image gallery">
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-5 md:mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {blog.images.map((image) => {
                      const src = image.url?.startsWith("/") ? image.url : `/${image.url}`;
                      return (
                        <figure key={image.id} className="overflow-hidden rounded-xl md:rounded-2xl shadow-md bg-zinc-100 dark:bg-zinc-800">
                          <div className="relative h-52 sm:h-60 md:h-64 w-full">
                            <Image
                              src={src}
                              alt={image.alt || blog.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          {image.caption && (
                            <figcaption className="px-4 py-3 text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                              {image.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {blog.faqs.length > 0 && (
                <section className="mt-12 md:mt-16" aria-label="Frequently asked questions">
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-5 md:mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {blog.faqs.map((faq) => (
                      <FaqItem key={faq.id} faq={faq} />
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ── Sidebar — stacks below article on mobile ── */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0" aria-label="Booking sidebar">
              <div className="lg:sticky lg:top-8 space-y-4">

                {/* CTA card */}
                <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700">
                  <div className="bg-gradient-to-br from-[#0070A1] to-[#005a80] px-6 py-7 md:py-8 text-white text-center">
                    <p className="text-[11px] uppercase tracking-widest text-white/60 mb-2">Planning your trip?</p>
                    <h2 className="text-base md:text-lg font-bold mb-3 leading-snug">
                      Need Help With Your Umrah Package?
                    </h2>
                    <p className="text-xs sm:text-sm text-white/75 mb-5 md:mb-6 leading-6">
                      Speak to our specialists — we&apos;ll find the right package for your dates and budget.
                    </p>
                   <UmrahBookingModal />
                    <a
                      href="https://wa.me/442038766846"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>

                  {/* Trust badges */}
                  <div className="bg-white dark:bg-zinc-800 px-6 py-4 space-y-2.5">
                    {["ATOL Protected", "IATA Accredited", "24/7 Support"].map((badge) => (
                      <div key={badge} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>

        {/* ── CTA banner ───────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#0070A1] to-[#005a80]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Ready to travel?</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                We&apos;re Here to Answer All Your Questions!
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-block bg-[#F6931F] hover:bg-orange-500 active:bg-orange-600 text-white font-bold py-3.5 md:py-4 px-7 md:px-8 rounded-xl transition-colors text-sm shadow-lg whitespace-nowrap"
            >
              Book Your Umrah Today
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}