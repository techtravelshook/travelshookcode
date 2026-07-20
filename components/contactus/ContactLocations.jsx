"use client";
import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const locations = [
  {
    city: "West Drayton",
    name: "UK West Drayton Office",
    address: "9 Station Rd, West Drayton UB7 7BT",
    phone: "+44 20 3876 6846",
    email: "info@travelshook.co.uk",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=9+Station+Rd,+West+Drayton+UB7+7BT",
  },
  {
    city: "UK  Office",
    name: " UK  Birmingham Office",
    address: "802-804 Stratford Road, Birmingham B11 4BS",
    phone: "+44 20 3876 6846",
    email: "info@travelshook.co.uk",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=802-804+Stratford+Road,+Birmingham+B11+4BS",
  },
];

export default function ContactLocations() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center md:text-left mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#FFA500] px-3 py-1.5 rounded-full">
          Find Us
        </span>
       <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight dark:text-orange-400">
  Our <span className="text-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] ">Locations</span>
</h2>

        <p className="text-gray-500 mt-2 text-base max-w-md">
          Visit one of our physical hubs or reach out directly to a local team.
        </p>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 flex flex-col justify-between overflow-hidden"
          >
            {/* Decorative Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full transition-all duration-300 group-hover:scale-110" />

            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-white bg-[#FFA500] px-2.5 py-1 rounded-md">
                  {loc.city}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                {loc.name}
              </h3>

              {/* Contact Details List */}
              <div className="space-y-3.5 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{loc.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <a href={`tel:${loc.phone}`} className="hover:text-indigo-600 transition-colors">
                    {loc.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <a href={`mailto:${loc.email}`} className="hover:text-indigo-600 transition-colors">
                    {loc.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-6 border-t border-gray-50">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors"
              >
                View on Google Maps
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-indigo-500" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
