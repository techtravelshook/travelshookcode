'use client';

import Script from 'next/script';

export default function GoogleReviews() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F6931F] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0070A1] opacity-5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#F6931F]/10 text-[#F6931F] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Thousands of{' '}
            <span className="text-[#0070A1]">UK Pilgrims</span>
          </h2>
          <p className="text-gray-500 max-w-6xl mx-auto text-sm md:text-base">
            Real experiences from families who travelled with TravelHooks for Umrah & Hajj
          </p>

          {/* Google badge */}
          <div className="inline-flex items-center gap-2 mt-5 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-xs font-medium text-gray-600">Verified Google Reviews</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Elfsight Widget */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-91a3b4e4-8ec8-40b9-ac2e-1c7807d078a9" data-elfsight-app-lazy />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a 
            href="https://www.google.com/maps/place/Travels+Hook+UK/@51.5091003,-0.4763234,17z" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-[#0070A1] hover:bg-[#005a80] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            Leave us a Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
