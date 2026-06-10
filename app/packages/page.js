"use client";
import React, { useState } from "react";
import Banner from "./Banner";

const hotels = [
  { id: 1, name: "Hilton Makkah", rating: 5, price: 450, image: "imgs/hotels/makkah_hotel.jpg" },
  { id: 2, name: "Pullman Zamzam", rating: 4, price: 320, image: "imgs/hotels/makkah_hotel2.jpg" },
  { id: 3, name: "Swissotel Makkah", rating: 5, price: 580, image: "imgs/hotels/makkah_hotel3.jpg" },
];

const rooms = [
  { id: 1, type: "Deluxe Double", price: 120, capacity: 2 },
  { id: 2, type: "Executive Suite", price: 280, capacity: 4 },
  { id: 3, type: "Family Room", price: 190, capacity: 3 },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100">
      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white dark:bg-neutral-900 px-6 py-2 rounded-full mb-8 shadow">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
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

              {/* UMRAH */}
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

              {/* HOLIDAY */}
              <button
                onClick={() => handleServiceSelect("holiday")}
                className="group bg-white dark:bg-neutral-900 border border-amber-200 dark:border-neutral-800 hover:border-amber-500 p-10 rounded-3xl transition hover:shadow-xl"
              >
                <div className="text-6xl mb-6">🏝️</div>
                <h3 className="text-3xl font-bold dark:text-white mb-2">Holiday</h3>
                <p className="text-gray-600 dark:text-neutral-400">
                  Beaches, cities & luxury escapes
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div className="mb-10">
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                ← Back
              </button>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                Select Package
              </h1>
            </div>

            {loading && (
              <div className="text-center text-gray-500 dark:text-neutral-400">
                Loading...
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg)}
                  className="bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl cursor-pointer"
                >
                  <img
                    src={pkg.heroImage}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">
                      {pkg.title}
                    </h3>

                    <p className="text-gray-600 dark:text-neutral-400 mt-2">
                      {pkg.shortDesc}
                    </p>

                    <div className="mt-4 text-orange-600 dark:text-orange-400 font-bold">
                      {formatPrice(pkg.price)}
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h1 className="text-4xl font-bold dark:text-white mb-8">
              Choose Hotel
            </h1>

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
                  <img src={hotel.image} className="h-56 w-full object-cover" />

                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">
                      {hotel.name}
                    </h3>

                    <p className="text-orange-600 dark:text-orange-400 font-semibold mt-2">
                      {formatPrice(hotel.price)} / night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && selectedHotel && (
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold dark:text-white mb-6">
              Choose Room
            </h2>

            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-5 mb-4 rounded-2xl border cursor-pointer ${
                  selectedRoom?.id === room.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-neutral-800"
                }`}
              >
                <div className="flex justify-between">
                  <div className="dark:text-white font-semibold">
                    {room.type}
                  </div>
                  <div className="text-orange-600 dark:text-orange-200 font-bold">
                    £{room.price}
                  </div>
                </div>
              </div>
            ))}

            {selectedRoom && (
              <button
                onClick={() => alert("Booking Confirmed")}
                className="mt-8 w-full bg-orange-300 hover:bg-orange-500 text-white py-4 rounded-2xl font-semibold"
              >
                Proceed to Booking
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}