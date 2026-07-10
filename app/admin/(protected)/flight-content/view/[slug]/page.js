import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquare, HelpCircle, Layers } from "lucide-react";  // Professional visual cues

async function getContent(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/flightcontent/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }

  const responseData = await res.json();
  return responseData.data || responseData; // Safe layout fallback
}

export default async function Page({ params }) {
  const { slug } = await params;
  const content = await getContent(slug);

  return (
    <div className="w-full min-h-screen bg-slate-50/60 pb-16 font-sans selection:bg-[#F6931F]/10">
      
      {/* Premium Hero Title Module */}
      <div className="bg-white border-b border-slate-200/80 mb-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link 
            href="/admin/flight-content" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#197696] mb-4 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Content List</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#197696]/10 text-[#197696] border border-[#197696]/5 uppercase tracking-wide mb-2.5">
                <Layers className="w-3 h-3" />
                {content.apiType} Source Route
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight capitalize">
                {slug.replace(/-/g, " ")} Flight Content
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* Section 1: Traditional Split Hero Style */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight border-l-4 border-[#197696] pl-4">
              {content.section1Title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
              {content.section1Content}
            </p>
          </div>
          <div className="lg:col-span-5 relative w-full h-[260px] md:h-[320px] rounded-xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50 order-1 lg:order-2">
            <Image
              src={content.section1img?.startsWith("/") ? content.section1img : `/${content.section1img}`}
              alt={content.section1Title}
              fill
              sizes="(max-w-1024px) 100vw, 450px"
              className="object-cover hover:scale-102 transition-transform duration-500"
              priority
            />
          </div>
        </section>

        {/* Section 2: Alternating Layout (Image Left, Content Right) */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative w-full h-[260px] md:h-[320px] rounded-xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50">
            <Image
              src={content.section2img?.startsWith("/") ? content.section2img : `/${content.section2img}`}
              alt={content.section2Title}
              fill
              sizes="(max-w-1024px) 100vw, 450px"
              className="object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight border-l-4 border-[#F6931F] pl-4">
              {content.section2Title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
              {content.section2Content}
            </p>
          </div>
        </section>

        {/* FAQ Block Container */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-6 mb-8">
            <div className="p-2.5 bg-[#F6931F]/10 text-[#F6931F] rounded-xl">
  <MessageSquare className="w-6 h-6" />
</div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Route information guidelines and traveler FAQs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.faqs && content.faqs.length > 0 ? (
              content.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group bg-slate-50/60 hover:bg-white border border-slate-100 hover:border-slate-200/80 rounded-xl p-5 transition-all shadow-sm/5 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <HelpCircle className="w-5 h-5 text-[#197696] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-800 text-base mb-2 group-hover:text-[#197696] transition-colors">
                        {faq.q}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-6 text-slate-400 font-medium">
                No FAQ guidelines attached to this route layout template.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
