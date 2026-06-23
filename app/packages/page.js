"use client";
import React, { useState } from "react";
import Banner from "./Banner";
import Image from "next/image";

const hotels = [
 {
    id: 1,
    name: "Al Ebaa Hotel",
    desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs with premium furnishings.",
    price: "£99",
    location: "Makkah",
    stars: 4,
    rating: "4.3",
    reviews: "982",
    distanceFromHaram: "850m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/alebaa.jpg",
    amenities: ["WiFi", "Parking", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service"]
  },
  {
    id: 2,
    name: "M Hotel Al Dana Makkah by Millennium",
    desc: "A 4-star hotel in Makkah located 6-7 minutes' drive from Masjid Al Haram. Features spacious rooms with modern décor, a dedicated prayer area, and panoramic city views.",
    price: "£130",
    location: "Makkah",
    stars: 4,
    rating: "4.5",
    reviews: "1,412",
    distanceFromHaram: "1.2km from Masjid Al‑Haram",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/aldana.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Concierge"]
  },
  {
    id: 3,
    name: "Infinity Hotel Makkah",
    desc: "Located just a 10 to 12-minute walk from Masjid Al-Haram, the Infinity Hotel Makkah inspires pilgrims through its blend of spiritual ambiance and premium hospitality.",
    price: "£122",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "2,105",
    distanceFromHaram: "900m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    img: "/imgs/hotels/infinity.jpg",
    amenities: ["WiFi", "Restaurant", "Room Service", "Air Conditioning", "24/7 Security", "Early Check-In", "Fitness Center"]
  },
  {
    id: 4,
    name: "Al Shohada Hotel",
    desc: "Al Shohada Hotel Makkah provides comfortable rooms with air conditioning conveniently located near the Holy Masjid Al-Haram. Premium furnishings and daily room cleaning.",
    price: "£145",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "1,890",
    distanceFromHaram: "500m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/alshohada.jpg",
    amenities: ["WiFi", "Room Service", "Air Conditioning", "24/7 Security", "Daily Cleaning", "Prayer Room"]
  },
  {
    id: 5,
    name: "Shaza Makkah Hotel",
    desc: "Shaza Makkah Hotel is a premier 5-star establishment located in Jabal Kaaba, just 710 metres from the Holy Masjid Al-Haram. Stunning front views of the Grand Mosque.",
    price: "£148",
    location: "Makkah",
    stars: 5,
    rating: "4.8",
    reviews: "2,340",
    distanceFromHaram: "710m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/shaza.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Kaaba View"]
  },
  {
    id: 6,
    name: "Elaf Al Mashaer Hotel",
    desc: "Elaf Al Mashaer Hotel Makkah offers convenient access to King Abdulaziz and King Fahad Gates, positioned just 400 metres from these important entrances to the Haram.",
    price: "£155",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,650",
    distanceFromHaram: "400m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/elaf-mashaer.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Concierge"]
  },
  {
    id: 7,
    name: "Jabal Omar Marriott Hotel",
    desc: "The Jabal Omar Marriott Hotel stands as one of Makkah's premier five-star establishments, offering luxurious service and elegant accommodations with premium amenities.",
    price: "£165",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "2,100",
    distanceFromHaram: "600m from Masjid Al‑Haram",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/jabal-marriott.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service", "Business Center"]
  },
  {
    id: 8,
    name: "Anjum Hotel Makkah",
    desc: "The Anjum Hotel Makkah offers modern accommodations with stunning views of the Masjid Al-Haram, located in the city centre near the Haram. Ideal for families.",
    price: "£155",
    location: "Makkah",
    stars: 5,
    rating: "4.5",
    reviews: "1,320",
    distanceFromHaram: "300m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/anjum.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"]
  },
  {
    id: 9,
    name: "Elaf Kinda Hotel",
    desc: "The Elaf Kinda Hotel is strategically located to ensure convenience for pilgrims undertaking their spiritual journey in Makkah with premium hospitality services.",
    price: "£159",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,540",
    distanceFromHaram: "450m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/elaf-kinda.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Early Check-In"]
  },
  {
    id: 10,
    name: "Pullman ZamZam Makkah",
    desc: "The Pullman ZamZam Makkah Hotel is extraordinarily close to the Grand Mosque, just 100 metres away. Luxury property with world-class amenities and exceptional service.",
    price: "£177",
    location: "Makkah",
    stars: 5,
    rating: "4.8",
    reviews: "2,890",
    distanceFromHaram: "100m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/pullman-zamzam.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge", "Early Check-In"]
  },
  {
    id: 11,
    name: "Swissotel Hotel Makkah",
    desc: "One of the most modern and luxurious 5-star hotels in Makkah, Swissotel Hotel Makkah is in the exclusive Abraj Al Bait Complex with stunning Kaaba views.",
    price: "£188",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "2,450",
    distanceFromHaram: "150m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/swissotel.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Spa", "Room Service", "Concierge"]
  },
  {
    id: 12,
    name: "Le Meridien Makkah Hotel",
    desc: "Le Meridien Makkah Hotel is situated just 4-5 minutes' walk from Masjid Al-Haram in elegant style. Air-conditioned rooms with modern amenities and attentive service.",
    price: "£145",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,760",
    distanceFromHaram: "350m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/le-meridien.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"]
  },
  {
    id: 13,
    name: "Hilton Makkah Convention Hotel",
    desc: "The Hilton Makkah Convention Hotel is conveniently located near the Haram boundary and offers guests breathtaking views. World-class amenities and excellent service.",
    price: "£190",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "2,670",
    distanceFromHaram: "500m from Masjid Al‑Haram",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/hilton.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Business Center", "Room Service"]
  },
  {
    id: 14,
    name: "Sheraton Makkah Jabal Al Kaaba",
    desc: "Sheraton Makkah Jabal Al Kaaba Hotel provides pilgrims with a luxurious stay in the holy city. This 5-star property combines elegance with spiritual proximity.",
    price: "£160",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,890",
    distanceFromHaram: "550m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/sheraton.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"]
  },
  {
    id: 15,
    name: "Al Safwah Royale Orchid",
    desc: "Al Safwah Royale Orchid Hotel is a top-rated 5-star property in Makkah, located just 2-3 minutes' walking distance from the Haram. Luxury accommodations with premium service.",
    price: "£162",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "1,920",
    distanceFromHaram: "150m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/al-safwah.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Kaaba View"]
  },
  {
    id: 16,
    name: "Jabal Omar Hyatt Regency Makkah",
    desc: "Jabal Omar Hyatt Regency Makkah is a 5-star hotel with 656 thoughtfully designed guestrooms. Located just 2-3 minutes' walking distance from Masjid Al-Haram.",
    price: "£160",
    location: "Makkah",
    stars: 5,
    rating: "4.8",
    reviews: "2,540",
    distanceFromHaram: "150m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/hyatt-regency.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Fitness Center", "Room Service"]
  },
  {
    id: 17,
    name: "Grand Makkah Hotel Araek Group",
    desc: "Grand Makkah Hotel is one of the top-rated 5-star hotels in Makkah, located just 650 metres away from the Haram boundary. Spacious rooms with modern amenities.",
    price: "£167",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,670",
    distanceFromHaram: "650m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/grand-makkah.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"]
  },
];

const rooms = [
  { id: 1, type: "Deluxe Double", price: 180, capacity: 2 },
  { id: 2, type: "Executive Suite", price: 280, capacity: 4 },
  { id: 3, type: "Family Room", price: 190, capacity: 3 },
  { id: 4, type: "Quad Room", price: 120, capacity: 2 },
];

export default function CustomizePage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  // Booking Modal States
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: 2,
    checkInDate: "",
    checkOutDate: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const fetchPackages = async (selectedService) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/customizepackages?type=${selectedService}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      setError("Could not load packages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    setStep(2);
    fetchPackages(selectedService);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setStep(3);
  };

  const formatPrice = (price) => `£${Math.round(price).toLocaleString()}`;

  const openBookingModal = () => {
    setShowBookingModal(true);
    setSubmitMessage("");
    setBookingForm({
      fullName: "",
      email: "",
      phone: "",
      guests: 2,
      checkInDate: "",
      checkOutDate: "",
      specialRequests: "",
    });
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setIsSubmitting(false);
    setSubmitMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel || !selectedRoom) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: bookingForm.fullName,
          email: bookingForm.email,
          phone: bookingForm.phone,
          guests: bookingForm.guests,
          checkInDate: bookingForm.checkInDate,
          checkOutDate: bookingForm.checkOutDate,
          specialRequests: bookingForm.specialRequests,
          hotel: selectedHotel.name,
          room: selectedRoom.type,
          package: selectedPackage?.title || "Custom",
          service: service,
          totalPrice: selectedRoom.price * 7,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("✅ Booking request sent successfully! We'll contact you shortly.");
        setTimeout(() => closeBookingModal(), 2500);
      } else {
        setSubmitMessage(`❌ ${data.message || "Failed to send booking request."}`);
      }
    } catch (err) {
      setSubmitMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100">
      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white dark:bg-neutral-900 px-6 py-2 rounded-full mb-8 shadow">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                Start Your Journey
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Customize Your Dream Journey
            </h1>

            <p className="text-gray-600 dark:text-neutral-300 text-lg mb-14">
              Choose Umrah or Holiday packages tailored for you
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => handleServiceSelect("umrah")}
                className="group bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 hover:border-emerald-500 p-10 rounded-3xl transition hover:shadow-xl"
              >
                <div className="text-6xl mb-6">🕋</div>
                <h3 className="text-3xl font-bold dark:text-white mb-2">Umrah</h3>
                <p className="text-gray-600 dark:text-neutral-400">
                  Sacred journey to Makkah & Madinah
                </p>
              </button>

              {/* <button
                onClick={() => handleServiceSelect("holiday")}
                className="group bg-white dark:bg-neutral-900 border border-amber-200 dark:border-neutral-800 hover:border-amber-500 p-10 rounded-3xl transition hover:shadow-xl"
              >
                <div className="text-6xl mb-6">🏝️</div>
                <h3 className="text-3xl font-bold dark:text-white mb-2">Holiday</h3>
                <p className="text-gray-600 dark:text-neutral-400">
                  Beaches, cities & luxury escapes
                </p>
              </button> */}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div className="mb-10">
              <button onClick={() => setStep(1)} className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                ← Back
              </button>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">Select Package</h1>
            </div>

            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-600 p-4 rounded-xl">{error}</div>}

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg)}
                  className="bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl cursor-pointer"
                >
                  {/* <img src={pkg.heroImage} className="h-60 w-full object-cover" alt={pkg.title} /> */}

<div className="relative h-56 w-full overflow-hidden">
  <Image 
    // Automatically adds the leading "/" if it is missing
    src={pkg.heroImage.startsWith('/') ? pkg.heroImage : `/${pkg.heroImage}`} 
    alt={pkg.title}
    width={500} 
    height={300} 
    className="object-cover"
  />
</div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">{pkg.title}</h3>
                    <p className="text-gray-600 dark:text-neutral-400 mt-2">{pkg.shortDesc}</p>
                    <div className="mt-4 text-orange-600 dark:text-orange-400 font-bold">
                      {formatPrice(pkg.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 - Hotel Selection */}
        {step === 3 && (
          <div>
            <h1 className="text-4xl font-bold dark:text-white mb-8">Choose Hotel</h1>
            <div className="grid md:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setStep(4);
                  }}
                  className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl cursor-pointer"
                >
                  {/* <img src={hotel.img} className="h-56 w-full object-cover" alt={hotel.name} /> */}
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-xl">
  <Image 
    // 2. Safe string path check adds leading slash if database string lacks it
    src={hotel.img?.startsWith('http') || hotel.img?.startsWith('/') ? hotel.img : `/${hotel.img}`} 
    alt={hotel.name || "Hotel image"} 
    className="w-full h-full object-cover" 
    
    // 3. Aspect ratio dimensions prevent the 0.188 CLS layout jump completely
    width="400"  
    height="224" 

    // 4. Lazy loading ensures off-screen hotels don't slow down initial page speed
    loading="lazy" 

    // 5. Prevents broken image icons if the path fails or image is missing
    onError={(e) => {
      e.currentTarget.onerror = null; 
      e.currentTarget.src = "/imgs/placeholder.jpg";
    }} 
  />
</div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">{hotel.name}</h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mt-2">
                      {formatPrice(hotel.price)} / night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 - Room Selection */}
        {step === 4 && selectedHotel && (
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold dark:text-white mb-6">Choose Room</h2>
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-5 mb-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedRoom?.id === room.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-neutral-800 hover:border-orange-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="dark:text-white font-semibold">{room.type}</div>
                  <div className="text-orange-600 dark:text-orange-200 font-bold">
                    £{room.price} / night
                  </div>
                </div>
              </div>
            ))}

            {selectedRoom && (
              <button
                onClick={openBookingModal}
                className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Proceed to Booking
              </button>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedHotel && selectedRoom && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold dark:text-white">Complete Your Booking</h2>
                <button onClick={closeBookingModal} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
              </div>

              <div className="mb-6 p-4 bg-orange-50 dark:bg-neutral-800 rounded-2xl">
                <p className="font-semibold text-lg">{selectedHotel.name}</p>
                <p className="text-orange-600">{selectedRoom.type} • £{selectedRoom.price}/night</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Form fields unchanged - kept as you had */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input type="text" name="fullName" value={bookingForm.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" placeholder="Ahmed Al-Sayed" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input type="email" name="email" value={bookingForm.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone</label>
                    <input type="tel" name="phone" value={bookingForm.phone} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" placeholder="+966 50 123 4567" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Check-in Date</label>
                    <input type="date" name="checkInDate" value={bookingForm.checkInDate} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Check-out Date</label>
                    <input type="date" name="checkOutDate" value={bookingForm.checkOutDate} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Number of Guests</label>
                  <input type="number" name="guests" value={bookingForm.guests} onChange={handleInputChange} min="1" max="10" className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Special Requests (Optional)</label>
                  <textarea name="specialRequests" value={bookingForm.specialRequests} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-2xl border dark:border-neutral-700 focus:outline-none focus:border-orange-500 resize-y" placeholder="Early check-in, wheelchair access, etc." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 rounded-2xl font-semibold text-lg transition mt-4">
                  {isSubmitting ? "Sending Request..." : "Confirm Booking Request"}
                </button>

                {submitMessage && <p className="text-center text-sm mt-3 font-medium">{submitMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}