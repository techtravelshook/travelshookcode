'use client';


import BookingModal from '@/components/topdestinations/BookingModal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function DestinationPageContent({ dest, heroImageSrc, paragraphOne, paragraphTwo,related = []  }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
const relatedImageSrc = (img) =>
    img?.startsWith('http') || img?.startsWith('/')
      ? img
      : `/${img || 'placeholder-image.jpg'}`;
  return (
    <div className="min-h-screen dark:bg-zinc-950 bg-zinc-50 dark:text-white text-zinc-900 pb-24 antialiased selection:bg-amber-500 selection:text-black transition-colors duration-300">
       <div className="relative h-[65vh] min-h-[500px] md:min-h-[600px] w-full overflow-hidden">
              <Image
                src={heroImageSrc}
                alt={ 'Destination Image'}
                fill
                className="object-cover scale-105"
                priority
              />
              
              {/* Multipass Theme Layer Masking Overlays */}
              <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-zinc-950 dark:via-zinc-950/40 dark:to-black/30 bg-gradient-to-t from-zinc-50 via-zinc-50/40 to-transparent transition-all duration-300" />
              <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-zinc-950/60 dark:to-transparent bg-gradient-to-r from-zinc-50/40 to-transparent transition-all duration-300" />
              
              {/* Float Badge Information Layout */}
              <div className="absolute bottom-0 left-0 w-full pb-12">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="inline-flex items-center gap-2 dark:bg-black/40 bg-white/90 backdrop-blur-md border dark:border-white/10 border-zinc-200 dark:text-amber-400 text-amber-600 text-sm font-semibold tracking-wide px-4 py-2 rounded-full mb-4 shadow-xl transition-all duration-300">
                    <span className="animate-ping w-2 h-2 rounded-full inline-block mr-1"></span>
                    📍 {dest.country || 'Featured Holiday'}
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter max-w-4xl drop-shadow-xl text-balance  tracking-tighter mt-3 bg-gradient-to-r from-[#FFA43A] via-[#2FA8DF] to-[#FFA43A] bg-clip-text text-transparent transition-all duration-300">
                    {dest.title}
                  </h1>
                </div>
              </div>
            </div>
      
            {/* SECTION 2: GRID CONTENT STRUCTURE */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                
                {/* LEFT CONTENT TRACK CARD DESCRIPTIONS */}
                <div className="lg:col-span-2 space-y-10">
                  
                  {/* Quick Metrics Dashboard Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 dark:bg-zinc-900/40 bg-zinc-200/50 border dark:border-zinc-800/60 border-zinc-300/60 rounded-2xl backdrop-blur-sm transition-all duration-300">
                    <div className="p-4 rounded-xl dark:bg-zinc-900/60 bg-white border dark:border-zinc-800 border-zinc-200 text-center sm:text-left transition-all duration-300">
                      <span className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Duration</span>
                      <span className="text-lg font-bold dark:text-zinc-200 text-zinc-800">⏱️ {dest.duration || 'Flexible'}</span>
                    </div>
                    <div className="p-4 rounded-xl dark:bg-zinc-900/60 bg-white border dark:border-zinc-800 border-zinc-200 text-center sm:text-left transition-all duration-300">
                      <span className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Best Season</span>
                      <span className="text-lg font-bold dark:text-zinc-200 text-zinc-800">☀️ {dest.season || 'All Year'}</span>
                    </div>
                    <div className="p-4 rounded-xl dark:bg-zinc-900/60 bg-white border dark:border-zinc-800 border-zinc-200 text-center sm:text-left col-span-2 sm:col-span-1 transition-all duration-300">
                      <span className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Availability</span>
                      <span className="text-lg font-bold text-orange-500">✓ Instant Booking</span>
                    </div>
                  </div>
      
                  {/* Split Text Content Block */}
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 dark:text-white text-zinc-900 transition-all duration-300">
                      About This Package
                    </h2>
                    <div className="flex flex-col gap-5">
                      <p className="text-base leading-relaxed dark:text-zinc-300 text-zinc-700 font-normal tracking-wide dark:bg-zinc-900/20 bg-white p-6 rounded-2xl border dark:border-zinc-900/60 border-zinc-200 shadow-sm transition-all duration-300">
                        {paragraphOne}
                      </p>
                      {paragraphTwo && (
                        <p className="text-base leading-relaxed dark:text-zinc-300 text-zinc-700 font-normal tracking-wide dark:bg-zinc-900/20 bg-white p-6 rounded-2xl border dark:border-zinc-900/60 border-zinc-200 shadow-sm transition-all duration-300">
                          {paragraphTwo}
                        </p>
                      )}
                    </div>
                  </div>
      
                  {/* Value Highlights Checklist Panel */}
                  <div className="border-t dark:border-zinc-800 border-zinc-200 pt-8 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-4 dark:text-white text-zinc-900 transition-all duration-300">What&apos;s Included in the Tour</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['Premium Hotel Accommodations', 'Complete Guided Sightseeing', 'All Airport Transfers Included', '24/7 Dedicated Support Agent'].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 dark:bg-zinc-900/30 bg-white rounded-xl border dark:border-zinc-800/40 border-zinc-200 shadow-sm transition-all duration-300">
                          <span className="text-orange-400 bg-orange-500/10 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                          <span className="dark:text-zinc-300 text-zinc-700 text-sm font-medium transition-all duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
      
                {/* RIGHT SIDE STICKY PURCHASE CONVERSION CARD */}
                <div className="lg:col-span-1 lg:sticky lg:top-12">
                  <div className="dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden group transition-all duration-300">
                    
                    {/* Core Visual Ambient Design Glow Circles */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2FA8DF]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#FFA43A]/10 rounded-full blur-3xl pointer-events-none" />
      
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2 flex items-center gap-1.5 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Guaranteed Best Price
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-6 relative z-10">
                      <span className="text-5xl font-black tracking-tight dark:text-white text-zinc-950 transition-all duration-300">£{dest.price || '0'}</span>
                      <span className="text-zinc-400 text-sm font-medium">/ person total</span>
                    </div>
      
                    {/* Pricing breakdown rows */}
                    <div className="space-y-3.5 border-t border-b dark:border-zinc-800/80 border-zinc-100 py-5 mb-6 text-sm transition-all duration-300 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Base Fare Package</span>
                        <span className="dark:text-zinc-200 text-zinc-800 font-semibold transition-all duration-300">£{dest.price || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Local Taxes & Fees</span>
                        <span className="text-orange-400 font-medium">Included</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Booking Deposit</span>
                        <span className="dark:text-zinc-200 text-zinc-800 font-medium transition-all duration-300">10% Required</span>
                      </div>
                    </div>
      
                    {/* Enhanced Action Dynamic Gradient Hover Button */}
                    <button 
                      onClick={() => setShowBookingModal(true)}
                      className="relative w-full overflow-hidden bg-gradient-to-r from-[#FFA43A] via-[#2FA8DF] to-[#FFA43A] bg-[size:200%_auto] text-white py-4.5 px-6 rounded-2xl font-bold text-lg shadow-xl transition-all duration-500 hover:bg-right hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 z-10 relative"
                    >
                      <span>Book This Package</span>
                      <span className="text-xl">➔</span>
                    </button>
                    
                    <p className="text-center text-xs text-zinc-500 mt-4 tracking-wide relative z-10">
                      No immediate payment needed • Cancel options available
                    </p>
                  </div>
                </div>
      
              </div>
            </div>
       {/* YOU MAY ALSO LIKE SECTION */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 dark:text-white text-zinc-900">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/topdestinations/destinations/${item.slug}`}
                className="group relative overflow-hidden rounded-2xl border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={relatedImageSrc(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-lg font-bold tracking-tight drop-shadow">{item.title}</p>
                    <p className="text-sm text-white/85">📍 {item.country}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">From</span>
                  <span className="text-xl font-bold dark:text-white text-zinc-900">£{item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
            {/* BOOKING MODAL */}
            {showBookingModal && (
              <BookingModal 
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                destination={dest}
              />
            )}
    </div>
  );
}