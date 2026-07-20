"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  SlidersHorizontal,
  Search,
  ChevronDown,
  X,
  User,
  Mail,
  Phone,
  Minus,
  Plus,
} from "lucide-react";
import HotelDetailModal from "@/components/hotels/HotelDetailModal";

const MADINAH_HOTELS = [
  {
    id: 1,
    name: "Jawharat Al Rasheed Hotel",
    desc: "Guests of the Jawharat Al Rasheed Hotel will have an exceptional and memorable stay in Madinah. This hotel has everything that guests demand, including those performing the Hajj and Umrah. The Jawharat Al Rashid Hotel is a 5 to 6-minute walk from Al Masjid An-Nabawi and has rooms with modest furnishings. There is a 24-hour front desk and complimentary Wi-Fi throughout the entire property. Tiles cover the floors of every room at Jawharat. A telephone, minibar, and flat-screen TV are standard in every room.",
    price: "£88",
    location: "Madinah",
    stars: 3,
    rating: "4.7",
    reviews: "3,210",
    distanceFromHaram: "200m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning"],
  },
  {
    id: 2,
    name: "Mirage Al Salam Hotel",
    desc: "Mirage Al Salam Hotel Madinah is just a short distance, approximately 150 metres from the Prophet&rsquo;s Mosque. This 3-star property is on As Salam Road, Central Area, Madinah. This hotel is conveniently located in the heart of Madinah&rsquo;s Central area, which is just a 5 to 7-minute drive from the Anbariya Mosque. Mirage Al Salam Hotel Madinah is very close to the Green Dome of Al Masjid An Nabwi. Also, it&rsquo;s easily accessible on foot from King Saud Gates. Prince Mohammed Airport is 14 kilometres from the hotel, making it the nearest airport",
    price: "£68",
    location: "Madinah",
    stars: 3,
    rating: "4.8",
    reviews: "4,100",
    distanceFromHaram: "Direct access to Al-Masjid an-Nabawi",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah2.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Parking"],
  },
  {
    id: 3,
    name: "Al Ansar New Palace Hotela",
    desc: "Al Ansar New Palace Hotel is one of the 3-star hotels in Madinah and is located only 250 metres approximately away from the Prophet&rsquo;s Mosque Gate No. 17 (ladies&rsquo; and men&rsquo;s entrance). Pilgrims can find this hotel on the northern side of Al Masjid An-Nabwi. The whole property is smoke-free and offers public Wi-Fi. All rooms of the Al Ansar New Palace Hotel can be accessible easily by elevator, and guests will get a minibar in each room. For the convenience of their valued visitors, the hotel provides 24-hour service. Your stay will be comfortable and relaxing in any of the rooms; some have LCD/TVs and air conditioners",
    price: "£80",
    location: "Madinah",
    stars: 5,
    rating: "4.9",
    reviews: "1,875",
    distanceFromHaram: "100m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah3.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Parking"],
  },
  {
    id: 4,
    name: "Elaf Taiba Hotel",
    desc: "Elaf Taiba Hotel in Madinah is located in the ideal position, just 2 to 3-minute of walking distance from the Prophet&rsquo;s Mosque, and provides 3-star services. Among the 3-star hotels, Elaf Taiba Hotel is 500 metres away from the Haram boundary, which makes it easily accessible. In the lobby area, the hotel provides free Wi-Fi access to guests while standing in front of Al Masjid An-Nabwi. The hotel is a 5-minute drive from cultural places such as Al-Baqi Cemetery and Anbriya Mosque. Many of the hotel rooms have a view of the Al-Masjid An-Nabwi, so those who choose to pray there can do so without stopping their view.",
    price: "£110",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah4.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },


    {
    id: 5,
    name: "Emaar Taibah Hotel",
    desc: "The 3-star Emaar Taibah Hotel Madinah is conveniently located 8 to 10-minute of walk from Al Masjid An-Nabwi. Reaching the Omer Bin Khattab Gate of the Holy Mosque takes 1.2 km of distance from the hotel premises. This accommodation is merely close to Mosque Al-Ghamama and Al Jum&rsquo;a Mosque (3.1 km). Guests can utilize the hotel&rsquo;s 24-hour security and safety deposit box while staying. Rooms are featured with air conditioners with free Wi-Fi and the hotel provides free private parking.",
    price: "£78",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah5.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
    {
    id: 6,
    name: "Grand Zowar Hotel",
    desc: "Grand Zowar Hotel is a 3-star hotel in the heart of Central Madinah district of Madinah. This hotel is around 6-7 minutes away from Masjid Al Nabawi. This 3-star accommodation has 340 rooms with flat-screen TVs, a wardrobe, and tea and coffee making facilities for your comfort. The hotel rooms have kitchen facilities, including a refrigerator and coffee and tea makers. The rooms also have private bathrooms with a shower and free personal hygiene items. Moreover, the hotel offers the stunning views of city.",
    price: "£63",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah6.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
    {
    id: 7,
    name: "Artal International Hotel",
    desc: "Artal International Hotel, a 3-star hotel in Madinah, is around 2-3 minutes away from the Prophet&rsquo;s Mosque. All 378 rooms in this 3-star hotel are air conditioning, non-smoking, and family-friendly. The hotel offers free Wi-Fi in public areas and an excellent room service. The hotel is around 20.3 km away from Prince Mohammad Airport, which makes it accessible for travellers to Madinah.",
    price: "£70",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah8.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
    {
    id: 8,
    name: "Odst Al Madinah Hotel",
    desc: "Odst Al Madinah Hotel is one of the famous 3-star hotels in Madinah. It is around 3-4 minutes away from the Prophet&rsquo;s Mosque. This hotel has 700 rooms with an iron board and a wardrobe. Some of these rooms have flat-screen TVs, a coffee maker, and many other facilities. The hotel rooms have kitchen facilities, such as a refrigerator and electric kettle. Also, these rooms have bathrooms with free personal hygiene items. You can enjoy the stunning views of the city at Odst Al Madianh Hotel.",
    price: "£75",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "600m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah7.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
    {
    id: 9,
    name: "Swiss International Taba Alsalam",
    desc: "Swiss International Taba Alsalam Hotel Madinah is a 3-star hotel in Madinah. This hotel is located around 650 m away from Masjid Al Nabawi. The hotel has 140 rooms, which are air conditioning and they have private bathrooms. The hotel provides free Wi-Fi in its all areas and an excellent room service to its guests. The rooms in this 3-star property are non-smoking and furnished with a variety of facilities like flat-screen TVs. Prince Mohammad International Airport is the nearest airport of Swiss International Madinah, which is around 14 km away from it.",
    price: "£80",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah9.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
   {
    id: 10,
    name: "Grand Plaza Badr Al Maqam",
    desc: "Grand Plaza Badr Al Maqam is a 3-star hotel in Madinah, which is just 1-2 minutes walking distance from the Prophet&rsquo;s Mosque. All 234 rooms in this hotel are air conditioning and non-smoking, and they have a minibar. Some of these rooms offer the direct views of the Prophet&rsquo;s Mosque and Green Dome. The hotel also offers the beautiful views of the city. Prince Mohammad International Airport is 18 km from this 3-star hotel. Moreover, the hotel offers free Wi-Fi in its all rooms and 24-hour front desk",
    price: "£80",
    location: "Madinah",
    stars: 3,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/madinah10.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
];

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Star Rating", "Distance"];
const FILTER_STARS = [5, 4, 3];

export default function MakkahHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedBookingHotel, setSelectedBookingHotel] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filterStars, setFilterStars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: ''
  });

  // Filter + sort logic (unchanged)
  let filtered = MADINAH_HOTELS.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.desc.toLowerCase().includes(search.toLowerCase());
    const matchStars =
      filterStars.length === 0 || filterStars.includes(h.stars);
    return matchSearch && matchStars;
  });

  if (sortBy === "Price: Low to High")
    filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
  if (sortBy === "Price: High to Low")
    filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
  if (sortBy === "Star Rating")
    filtered = [...filtered].sort((a, b) => b.stars - a.stars);

  const toggleStar = (s) =>
    setFilterStars((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const openBooking = (hotel) => {
    setSelectedBookingHotel(hotel);
    setFormData({ checkIn: '', checkOut: '', guests: 2, name: '', email: '', phone: '' });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedBookingHotel(null);
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
    if (!selectedBookingHotel) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hotelbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: selectedBookingHotel.name,
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
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen">
      {/* Hero Banner - unchanged */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <Image src="/imgs/hotels/makkah_hotel.jpg" alt="Makkah Hotels" fill className="object-cover" priority  />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-[#E68213]/20 opacity-40" style={{ boxShadow: "0 0 80px 10px rgba(230,130,19,0.12)" }} />

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-6 sm:px-10 max-w-7xl mx-auto">
          
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <p className="text-[#E68213] text-xs font-bold uppercase tracking-widest mb-1">Saudi Arabia</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">Madinah Hotels</h1>
            </div>
            <div className="mb-1 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs text-white/70 font-semibold backdrop-blur-sm">
              {MADINAH_HOTELS.length} properties
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Toolbar - unchanged */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#01080C]/95 backdrop-blur border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative w-full sm:flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
            <input type="text" placeholder="Search hotels…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl bg-black/[0.03]  dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white" />
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full sm:w-auto appearance-none rounded-xl bg-black/[0.03] dark:bg-white/[0.04]  border border-black/[0.07] dark:border-white/[0.07] pl-4 pr-9 py-2.5 text-sm text-slate-900 dark:text-white">
                {SORT_OPTIONS.map((o) => <option key={o} value={o} className="dark:text-black">{o}</option>)}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <button onClick={() => setShowFilters((p) => !p)} className={`whitespace-nowrap flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${showFilters || filterStars.length > 0 ? "border-[#E68213]/40 bg-[#E68213]/10 text-[#E68213]" : "border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.04] text-slate-700 dark:text-white"}`}>
              <SlidersHorizontal size={14} /> Filters
              {filterStars.length > 0 && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E68213] text-[9px] font-black text-white">{filterStars.length}</span>}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] text-slate-500 dark:text-white/60 uppercase font-bold tracking-wider">Star Rating</span>
            {FILTER_STARS.map((s) => (
              <button key={s} onClick={() => toggleStar(s)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${filterStars.includes(s) ? "border-[#E68213] bg-[#E68213]/10 text-[#E68213]" : "border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-[#E68213]/40"}`}>
                <Star size={10} fill={filterStars.includes(s) ? "#E68213" : "none"} stroke={filterStars.includes(s) ? "none" : "currentColor"} /> {s} Stars
              </button>
            ))}
            {filterStars.length > 0 && <button onClick={() => setFilterStars([])} className="text-[11px] text-slate-400 hover:text-[#E68213] underline">Clear</button>}
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs text-slate-400 dark:text-white/40 font-semibold mb-6">
          Showing <span className="text-slate-700 dark:text-white">{filtered.length}</span> of {MADINAH_HOTELS.length} hotels in Madinah
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🕌</div>
            <p className="text-lg font-bold text-slate-700 dark:text-white">No hotels found</p>
            <p className="text-sm text-slate-400 dark:text-white/40 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} onViewDetails={() => setSelectedHotel(hotel)} onBookNow={() => openBooking(hotel)} />
            ))}
          </div>
        )}
      </main>

      {selectedHotel && <HotelDetailModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />}

      {/* Booking Modal */}
     {isBookingOpen && selectedBookingHotel && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-5">
    <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0F172A] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

      {/* Close Button */}
      <button
        onClick={closeBooking}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70 transition"
      >
        <X size={18} />
      </button>

      {/* Hero */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <Image
          src={selectedBookingHotel.img}
          alt={selectedBookingHotel.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {selectedBookingHotel.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm sm:text-base">
            <MapPin size={16} />
            <span>{selectedBookingHotel.distanceFromHaram}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-7">

        {/* Price Card */}
        <div className="mb-6 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Starting From
              </p>

              <div className="flex items-end gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#E68213]">
                  {selectedBookingHotel.price}
                </span>

                <span className="mb-1 text-sm text-slate-500">
                  / night
                </span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleBookingSubmit}
          className="space-y-5"
        >
          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Check In
              </label>

              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 focus:border-[#E68213] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Check Out
              </label>

              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 focus:border-[#E68213] focus:outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Guests
            </label>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3">
              <button
                type="button"
                onClick={() => updateGuests(formData.guests - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <Minus size={18} />
              </button>

              <span className="text-lg font-semibold">
                {formData.guests} Guest
                {formData.guests > 1 ? "s" : ""}
              </span>

              <button
                type="button"
                onClick={() => updateGuests(formData.guests + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E68213] text-white"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3">
              <User className="text-[#E68213]" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3">
              <Mail className="text-[#E68213]" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3">
              <Phone className="text-[#E68213]" size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#E68213] py-4 text-lg font-bold text-white transition hover:bg-[#cf730f] disabled:opacity-70"
          >
            {isSubmitting
              ? "Sending Request..."
              : "Book Your Stay"}
          </button>

          <p className="text-center text-xs text-slate-400">
            Secure inquiry • No payment required now
          </p>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

// Updated HotelCard with Book Now button
function HotelCard({ hotel, onViewDetails, onBookNow }) {
  return (
    <div className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/5 dark:hover:bg-orange-400/[0.02] h-full">
      <div className="relative w-full h-44 rounded-xl overflow-hidden flex-shrink-0 mb-3">
        <Image src={hotel.img} alt={hotel.name} fill sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-1">
          <Star size={9} fill="#E68213" stroke="none" />
          <span className="text-[10px] font-bold text-white">{hotel.rating}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider mb-1.5">
            <MapPin size={11} className="text-[#E68213]" />
            <span>{hotel.location}</span>
            <span className="mx-1 text-slate-300 dark:text-white/20">·</span>
            <span>{hotel.distanceFromHaram?.split(" ")[0]}</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#E68213] transition-colors line-clamp-1">
            {hotel.name}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-white/60 mt-1 line-clamp-3 leading-relaxed">
            {hotel.desc}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xl font-black text-slate-900 dark:text-white">{hotel.price}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/40">/night</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={onViewDetails} className="flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:bg-[#E68213] group-hover:text-white group-hover:border-[#E68213] transition-all duration-200">
              View Details
            </button>
            <button onClick={onBookNow} className="flex items-center justify-center gap-1.5 rounded-xl bg-[#E68213] hover:bg-[#d36e00] py-2.5 text-xs font-bold text-white transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}