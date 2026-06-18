"use client";
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import Image from 'next/image';
import React, { useState } from 'react';
import { ArrowRight, MapPin, X, User, Mail, Phone, Minus, Plus } from 'lucide-react';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';
import Link from 'next/link';

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
      img: "/imgs/hotels/makkah_hotel.jpg",
      distance: "850m from Haram",
    },
    {
      id: 2,
      name: "M Hotel Al Dana Makkah by Millennium",
      desc: "M Hotel Al Dana Makkah by Millennium is a 4-star hotel in Makkah. This hotel is located 6-7 minutes' drive from Masjid Al Haram.",
      price: "£122",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel2.jpg",
      distance: "6-7 min drive",
    },
    {
      id: 3,
      name: "Infinity Hotel Makkah",
      desc: "Located just a 10 to 12-minute walk from Masjid Al-Haram, the Infinity Hotel Makkah inspires visitors and pilgrims to the spiritual experience of their journey.",
      price: "£145",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel3.jpg",
      distance: "10-12 min walk",
    },
    {
      id: 4,
      name: "Al Ebaa Hotel",
      desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs.",
      price: "£99",
      location: "Makkah",
      img: "/imgs/hotels/makkah_hotel.jpg",
      distance: "850m from Haram",
    },
  ];

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: ''
  });

  const openBooking = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({ checkIn: '', checkOut: '', guests: 2, name: '', email: '', phone: '' });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedHotel(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateGuests = (newGuests) => {
    if (newGuests >= 1 && newGuests <= 8) {
      setFormData(prev => ({ ...prev, guests: newGuests }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hotelbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: selectedHotel.name,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formType: "Hotel Booking"
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Booking request sent successfully!");
        closeBooking();
      } else {
        alert(result.message || "Failed to send request");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen pb-16">
      <HeroSlider
        slides={sliderImages}
        badgeText="2026 Umrah Packages are officially LIVE"
        description="Book your spiritual journey now and experience the sacred rituals of Umrah with us."
        formComponent={<HolidayInquiryForms formType="umrah" />}
        autoPlayInterval={5000}
      />

      <main className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-6 mt-16">
        {/* Makkah Hotels */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Makkah Hotels</h1>
            <p className="text-slate-500 dark:text-white/40 mt-2">Premium hotels near Masjid Al Haram</p>
          </div>
          <div>
            <Link href="cities-hotels/makkah">
             <button className=' bg-orange-400 hover:bg-orange-300 hover:cursor-pointer text-white rounded-lg p-3'>Explore Makkah Hotels</button></Link>
           
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
          {makkahHotelData.map((hotel) => (
            <div key={hotel.id} className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all hover:border-[#E68213]/25">
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                <Image src={hotel.img} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col flex-grow">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                    <MapPin size={11} className="text-[#E68213]" />
                    <span>{hotel.location}</span>
                  </div>
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mt-1">{hotel.desc}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[#E68213] font-mono text-2xl font-bold">{hotel.price}</span>
                    <span className="text-xs text-slate-400">/night</span>
                  </div>
                  <button
                    onClick={() => openBooking(hotel)}
                    className="w-full py-3 bg-[#E68213] hover:bg-[#d36e00] text-white font-bold rounded-xl transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Madinah Hotels - Duplicate for now */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-5 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Madinah Hotels</h1>
            <p className="text-slate-500 dark:text-white/40 mt-2">Comfortable stay near Masjid Nabawi</p>
          </div>
          <div>
            <Link href="cities-hotels/madinah">
             <button className=' bg-orange-400 hover:bg-orange-300 hover:cursor-pointer text-white rounded-lg p-3'>Explore Madhnah Hotels</button></Link>
           
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
          {makkahHotelData.map((hotel) => (
            <div key={hotel.id} className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all hover:border-[#E68213]/25">
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                <Image src={hotel.img} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col flex-grow">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                    <MapPin size={11} className="text-[#E68213]" />
                    <span>Madinah</span>
                  </div>
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mt-1">{hotel.desc}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[#E68213] font-mono text-2xl font-bold">{hotel.price}</span>
                    <span className="text-xs text-slate-400">/night</span>
                  </div>
                  <button
                    onClick={() => openBooking(hotel)}
                    className="w-full py-3 bg-[#E68213] hover:bg-[#d36e00] text-white font-bold rounded-xl transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BookingProcess />
      <FlightFaqs />

      {/* Booking Modal */}
   {isBookingOpen && selectedHotel && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300">
    
    {/* Modal Container */}
    <div className="w-full sm:max-w-xl bg-white dark:bg-[#0B1116] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] transition-transform duration-300 ease-out transform translate-y-0">
      
      {/* Header Info Block */}
      <div className="relative p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/60 flex-shrink-0">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeBooking}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:scale-105 active:scale-95 transition-all"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Book Your Stay
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 line-clamp-1">
          {selectedHotel.name}
        </p>

        {/* Price & Location Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-[#E68213] tracking-tight">
              {selectedHotel.price}
            </span>
            <span className="text-xs text-zinc-400 font-medium">/ night</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 text-[#E68213] px-3 py-1.5 rounded-full text-xs font-semibold">
            <MapPin size={14} />
            <span>{selectedHotel.distance}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Form Body Container */}
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Unified Booking Widget Grid (Airbnb Style Group) */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/20 grid grid-cols-2">
            {/* Check-in */}
            <div className="p-3 border-r border-b border-zinc-200 dark:border-zinc-800">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
              />
            </div>

            {/* Guest Counter Row */}
            <div className="col-span-2 p-3 flex items-center justify-between">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Guests
                </label>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1">
                <button
                  type="button"
                  disabled={formData.guests <= 1}
                  onClick={() => updateGuests(formData.guests - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => updateGuests(formData.guests + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[#E68213] hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Guest Personal Information Inputs */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
              Contact Information
            </p>
            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />
          </div>

          {/* Submission CTA Block */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#ff9823] text-white font-bold text-base shadow-md shadow-[#E68213]/20 hover:shadow-lg hover:shadow-[#E68213]/30 hover:brightness-105 active:scale-[0.99] transition disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              You’ll receive confirmation via email
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default Page;