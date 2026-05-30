"use client";
import React, { useState } from "react";
// Note: Install lucide-react via: npm i lucide-react
import { MapPin, Navigation, Maximize2 } from "lucide-react";

export default function OfficeMap() {
  const [isLoading, setIsLoading] = useState(true);

  // The embed URL remains safely inside the <iframe> wrapper
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19882.407880979234!2d-0.46599834999999995!3d51.47098935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48767234cdc56de9%3A0x8fe7535543f64167!2sHeathrow%20Airport!5e0!3m2!1sen!2s!4v1780142578118!5m2!1sen!2s";

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Container Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        
        {/* Sidebar Info Panel */}
        <div className="p-8 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/50 lg:border-r border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-white bg-[#F7931E] w-fit px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>Live Location</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
              Find Us Easily
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Use our interactive map to get real-time driving, transit, or walking directions directly to our front doors.
            </p>

            {/* Quick Specs */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm text-gray-600">
                  <Navigation className="w-4 h-4 text-[#F7931E]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Main Office</h4>
                  <p className="text-xs text-gray-500 mt-0.5">802-804 Stratford Road, Birmingham B11 4BS</p>
                </div>
              </div>
            </div>
          </div>

          {/* External Action Button */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            {/* FIXED: Replaced embed URL with a clean, browser-compatible Google Maps search query link */}
            <a 
              href="https://www.google.com/maps/place/Heathrow+Airport/@51.4710143,-0.4865979,14z/data=!3m1!4b1!4m6!3m5!1s0x48767234cdc56de9:0x8fe7535543f64167!8m2!3d51.4679903!4d-0.4550471!16zL20vMDNqbjQ?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-indigo-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm shadow-gray-900/10 hover:shadow-indigo-600/20"
            >
              Open in Google Maps
              <Maximize2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Map View Panel */}
        <div className="lg:col-span-2 relative h-[350px] sm:h-[450px] lg:h-[500px] bg-gray-50">
          
          {/* Elegant Loading Skeleton State */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-3" />
              <p className="text-xs font-medium text-gray-400">Loading interactive map...</p>
            </div>
          )}

          {/* Map Frame */}
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-0 grayscale-[15%] contrast-[110%] hover:grayscale-0 transition-all duration-700"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
            title="Office Location Map"
          />
        </div>

      </div>
    </section>
  );
}
