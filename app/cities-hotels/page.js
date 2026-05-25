"use client";
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';

function Page() {
  const sliderImages = [
    {
      id: 1,
      src: "/imgs/hajj/hajj1.jpg",
      alt: "Secure Your 2026 Blessings",
      title: "Secure Your 2026 Blessings",
      subtitle: "Premium UAE Experiences",
    },
    {
      id: 2,
      src: "/imgs/hajj/hajj2.jpg",
      alt: "Comfortable Family Umrah",
      title: "Comfortable Family Umrah",
      subtitle: "Explore Mountains & Nature",
    },
    {
      id: 3,
      src: "/imgs/hajj/hajj3.jpg",
      alt: "5-Star Spiritual Journeys",
      title: "5-Star Spiritual Journeys",
      subtitle: "Elite Hajj Experiences",
    },
  ];

  const makkahHotelData = [
    {
      id: 1,
      name: "Al Ebaa Hotel",
      desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs.",
      price: "£99",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel.jpg"
    },
    {
      id: 2,
      name: "M Hotel Al Dana Makkah by Millennium",
      desc: "M Hotel Al Dana Makkah by Millennium is a 4-star hotel in Makkah. This hotel is located 6-7 minutes' drive from Masjid Al Haram.",
      price: "£122",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel2.jpg"
    },
    {
      id: 3,
      name: "Infinity Hotel Makkah",
      desc: "Located just a 10 to 12-minute walk from Masjid Al-Haram, the Infinity Hotel Makkah inspires visitors and pilgrims to the spiritual experience of their journey.",
      price: "£145",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel3.jpg"
    },
    {
      id: 4,
      name: "Al Ebaa Hotel",
      desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs.",
      price: "£99",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel.jpg"
    },
  ];

  return (
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen pb-16">
      <HeroSlider
        slides={sliderImages}
        badgeText="2026 Umrah Packages are officially LIVE"
        description="Book your spiritual journey now and experience the sacred rituals of Umrah with us. Don't miss out on this opportunity to embark on a transformative pilgrimage. Reserve your spot today!"
        formComponent={<HolidayInquiryForms formType="umrah" />}
        autoPlayInterval={5000}
      />
      <main className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-6 mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Makkah Hotels</h1>
            <p className="text-slate-500 dark:text-white/40 mt-2 text-sm md:text-base max-w-2xl">
              Explore our premium hotels in Makkah for a comfortable stay during your Umrah pilgrimage.
            </p>
          </div>
          <Link 
            href="/cities-hotels/makkah" 
            className="mt-4 md:mt-0 flex items-center justify-center gap-2 rounded-full border-[#E68213]/20 bg-[#E68213]/5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#E68213] hover:bg-[#E68213]/10 transition-colors w-fit"
          >
            Explore Makkah Hotels <ArrowRight size={14} />
          </Link>
        </div>

        {/* Hotels Responsive Grid System Layout */}
        {/* 4 Cards per row responsive grid layout */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
  {makkahHotelData.map((hotel) => (
    <div 
      key={hotel.id} 
      className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/5 dark:hover:bg-orange-400/[0.02] h-full"
    >
      {/* Card Image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden flex-shrink-0 mb-3">
        <Image 
          src={hotel.img} 
          alt={hotel.name} 
          fill
          sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, (max-w-1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={hotel.id === 1}
        />
      </div>

      {/* Card Details Context */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider mb-1.5">
            <MapPin size={11} className="text-[#E68213]" />
            <span>{hotel.location}</span>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#E68213] transition-colors line-clamp-1">
            {hotel.name}
          </h2>

          <p className="text-[11px] text-slate-500 dark:text-white/60 mt-1 line-clamp-3 leading-relaxed">
            {hotel.desc}
          </p>
        </div>

        {/* Footer Actions: Pricing & View Details Button */}
        <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-3">
          
          {/* Price Label Block */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xl font-black text-slate-900 dark:text-white">{hotel.price}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/40">/night</span>
            </div>
          </div>

          {/* ADDED: Theme-aligned View Details Navigation Button */}
          <Link
            href={`/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:bg-[#E68213] group-hover:text-white group-hover:border-[#E68213] transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

        </div>
      </div>
    </div>
  ))}
</div>


        {/* ================= MADINAH HOTELS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Madinah Hotels</h1>
            <p className="text-slate-500 dark:text-white/40 mt-2 text-sm md:text-base max-w-2xl">
              Discover our selection of comfortable hotels in Madinah for your spiritual journey.
            </p>
          </div>
          <Link 
            href="/cities-hotels/madinah" 
            className="mt-4 md:mt-0 flex items-center justify-center gap-2 rounded-full border-[#E68213]/20 bg-[#E68213]/5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#E68213] hover:bg-[#E68213]/10 transition-colors w-fit"
          >
            Explore Madinah Hotels <ArrowRight size={14} />
          </Link>
        </div>

        {/* Empty state placeholder for Madinah */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
  {makkahHotelData.map((hotel) => (
    <div 
      key={hotel.id} 
      className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/5 dark:hover:bg-orange-400/[0.02] h-full"
    >
      {/* Card Image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden flex-shrink-0 mb-3">
        <Image 
          src={hotel.img} 
          alt={hotel.name} 
          fill
          sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, (max-w-1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={hotel.id === 1}
        />
      </div>

      {/* Card Details Context */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider mb-1.5">
            <MapPin size={11} className="text-[#E68213]" />
            <span>{hotel.location}</span>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#E68213] transition-colors line-clamp-1">
            {hotel.name}
          </h2>

          <p className="text-[11px] text-slate-500 dark:text-white/60 mt-1 line-clamp-3 leading-relaxed">
            {hotel.desc}
          </p>
        </div>

        {/* Footer Actions: Pricing & View Details Button */}
        <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-3">
          
          {/* Price Label Block */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xl font-black text-slate-900 dark:text-white">{hotel.price}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/40">/night</span>
            </div>
          </div>

          {/* ADDED: Theme-aligned View Details Navigation Button */}
          <Link
            href={`/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:bg-[#E68213] group-hover:text-white group-hover:border-[#E68213] transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

        </div>
      </div>
    </div>
  ))}
</div>

      </main>
      {/*Booking process and faq secrtions will updated according to Requirements.  */}
      <BookingProcess/>
      <FlightFaqs/>
    </div>
  );
}

export default Page;
