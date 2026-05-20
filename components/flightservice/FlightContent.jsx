import React from 'react'
import FlightSearchWidget from "@/components/filter/FlightFilter";
import Image from "next/image";
import Link from "next/link";

import DynamicSlider from "../DynamicSlider/DynamicSlider";

// Cleaned & symmetric item count (9 items are perfect for a 3-column grid layout)
const bargainFlights = [
  { id: 1, country: "Dubai",  price: "269.79", image: "/imgs/dubai.jpg" },
  { id: 2, country: "Nepal",  price: "465.29", image: "/imgs/nepal.jpg" },
  { id: 3, country: "Makkah", price: "299.50", image: "/imgs/makkah.jpg" },
  { id: 4, country: "Paris",  price: "446.67", image: "/imgs/paris.jpg" },
  { id: 5, country: "Turkey", price: "332.18", image: "/imgs/turkey.jpg" },
  { id: 6, country: "Nepal",  price: "465.29", image: "/imgs/nepal.jpg" },
  { id: 7, country: "Makkah", price: "299.50", image: "/imgs/makkah.jpg" },
  { id: 8, country: "India",  price: "446.67", image: "/imgs/paris.jpg" },
  { id: 9, country: "Pakistan", price: "332.18", image: "/imgs/turkey.jpg" },
];

const destinations = [
  {
    city: "Dubai",
    country: "UAE",
    price: "£269",
    image: "/imgs/dubai.jpg",
    desc: "Experience luxury and adventure in the heart of the Middle East.",
    tags: ["Direct Flight", "7 Nights", "Hotel Included"],
    stars: 5,
    duration: "7 Nights",
  },
  {
    city: "Nepal",
    country: "Nepal",
    price: "£465",
    image: "/imgs/nepal.jpg",
    desc: "Trek through the majestic Himalayas on a once-in-a-lifetime journey.",
    tags: ["Guided", "Adventure", "Flights Included"],
    stars: 4,
    duration: "10 Nights",
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    price: "£299",
    image: "/imgs/makkah.jpg",
    desc: "Embark on a spiritual journey to the holiest city in Islam.",
    tags: ["Umrah", "Guided", "Flights Included"],
    stars: 5,
    duration: "14 Nights",
  },
  {
    city: "Paris",
    country: "France",
    price: "£446",
    image: "/imgs/paris.jpg",
    desc: "Discover the city of love — art, cuisine and iconic landmarks await.",
    tags: ["City Break", "4 Nights", "Flights Included"],
    stars: 4,
    duration: "4 Nights",
  },
  {
    city: "Turkey",
    country: "Turkey",
    price: "£332",
    image: "/imgs/turkey.jpg",
    desc: "Explore the rich history and stunning landscapes of Istanbul and beyond.",
    tags: ["Culture", "7 Nights", "Flights Included"],
    stars: 4,
    duration: "7 Nights",
  },
];
function FlightContent() {
  return (
    <div>
          {/* ───────────────── DYNAMIC SLIDER SECTION ───────────────── */}
      <div className="py6">
        <DynamicSlider
          title="Popular Flight"
          italicTitle="Routes"
          badge="Top Destinations"
          data={destinations}
        />
      </div>

      {/* ───────────────── BARGAIN FLIGHTS SECTION (Fixed 3-Column Alignment) ───────────────── */}
      {/* ───────────────── BARGAIN FLIGHTS SECTION (Fixed Layout Alignment) ───────────────── */}
<section className="bg-white transition-colors duration-500 dark:bg-[#01080C] sm:py-14 lg:py-8">
  {/* mx-auto max-w-7xl px-4 sets perfect standard padding alignment like dynamic slider */}
  <div className="mx-auto w-full max-w-12xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mb-8 w-full text-left">
      <span className="mb-3 inline-flex rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-3
       py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">
        Budget Travel
      </span>
     <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
             Elite Deals, 
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic pr-2 ml-2">
                Budget Prices
              </span>
            </h2>

      <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-500
       dark:text-slate-400 sm:text-sm">
       Fly worldwide without breaking the bank. Unlock exclusive, pocket-friendly flight deals curated specially for smart UK travelers.
      </p>
    </div>

    {/* Cards Grid Layout (Perfect Full-Width Stretch across all screen screens) */}
    <div className="flex w-full overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm:px-0">
  {bargainFlights.map((flight) => (
    <Link
      key={flight.id}
      href={`/flights/${flight.country.toLowerCase().replace(/\s+/g, "-")}`}
    
      className="group relative flex h-52 w-[85vw] min-w-[280px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl 
      border border-slate-200/60 shadow-sm transition-all duration-500 hover:-translate-y-1
       hover:shadow-xl dark:border-white/[0.08] sm:w-full"
    >
      {/* Background Asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src={flight.image}
          alt={`Flights to ${flight.country}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Dark Mask Shading */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

      {/* Card Elements Layer */}
      <div className="relative z-20 flex h-full flex-col justify-between p-5">
        <div>
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Best Airfare
          </p>
          <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            {flight.country}
          </h3>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/70">Starting From</p>
            <h4 className="text-xl font-black text-[#F7931E]">
              £{flight.price}
            </h4>
          </div>
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#F7931E]">
            Book Now
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

  </div>
</section>
    </div>
  )
}

export default FlightContent