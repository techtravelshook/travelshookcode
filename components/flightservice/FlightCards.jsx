'use client'
import React, { useState } from 'react'
import { ChevronRight, Plane, Calendar } from 'lucide-react'

const flightData = [
  {
    slug: "return-etihad-london-to-melbourne-jun-2026",
    tripType: "return",
    apiType: "australia",
    airlineName: "Etihad Airways",
    airlineLogo: "imgs/airlines/etihad.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "MEL",
    destinationCity: "Melbourne",
    price: 922.29,
    dates: "15 Jun - 20 Jul",
  },
  {
    slug: "return-chinasouthern-london-to-adelaide-jun-2026",
    tripType: "return",
    apiType: "australia",
    airlineName: "China Southern Airlines",
    airlineLogo: "imgs/airlines/chinasouthern.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "ADL",
    destinationCity: "Adelaide",
    price: 944.32,
    dates: "14 Jun - 16 Aug",
  },
  {
    slug: "return-chinaairlines-london-to-sydney-jun-2026",
    tripType: "return",
    apiType: "australia",
    airlineName: "China Airlines",
    airlineLogo: "imgs/airlines/chinaairlines.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "SYD",
    destinationCity: "Sydney",
    price: 949.89,
    dates: "15 Jun - 29 Jun",
  },
  {
    slug: "one-way-royalairmaroc-london-to-lagos-jun-2026",
    tripType: "one-way",
    apiType: "nigeria",
    airlineName: "Royal Air Maroc",
    airlineLogo: "imgs/airlines/maroc.png",
    departureCode: "LGW",
    departureCity: "London",
    destinationCode: "LOS",
    destinationCity: "Lagos",
    price: 347.8,
    dates: "18 Jun 2026",
  },
  {
    slug: "one-way-egyptair-london-to-abuja-jun-2026",
    tripType: "one-way",
    apiType: "nigeria",
    airlineName: "EgyptAir",
    airlineLogo: "imgs/airlines/egyptair.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "ABV",
    destinationCity: "Abuja",
    price: 423.49,
    dates: "15 Jun 2026",
  },
  {
    slug: "one-way-egyptair-manchester-to-lagos-dec-2026",
    tripType: "one-way",
    apiType: "nigeria",
    airlineName: "EgyptAir",
    airlineLogo: "imgs/airlines/egyptair.png",
    departureCode: "MAN",
    departureCity: "Manchester",
    destinationCode: "LOS",
    destinationCity: "Lagos",
    price: 461.87,
    dates: "15 Dec 2026",
  },
  {
    slug: "one-way-malaysia-leeds-to-cebu-sep-2026",
    tripType: "one-way",
    apiType: "philippines",
    airlineName: "Malaysia Airlines",
    airlineLogo: "imgs/airlines/malaysia.png",
    departureCode: "LBA",
    departureCity: "Leeds",
    destinationCode: "CEB",
    destinationCity: "Cebu",
    price: 585.79,
    dates: "30 Sep 2026",
  },
  {
    slug: "one-way-emirates-london-to-manila-jun-2026",
    tripType: "one-way",
    apiType: "philippines",
    airlineName: "Emirates",
    airlineLogo: "imgs/airlines/emirates.png",
    departureCode: "STN",
    departureCity: "London",
    destinationCode: "MNL",
    destinationCity: "Manila",
    price: 656.4,
    dates: "24 Jun 2026",
  },
  {
    slug: "return-brunei-london-to-manila-jun-2026",
    tripType: "return",
    apiType: "philippines",
    airlineName: "Royal Brunei Airlines",
    airlineLogo: "imgs/airlines/royalbrunei.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "MNL",
    destinationCity: "Manila",
    price: 666.49,
    dates: "14 Jun - 04 Jul",
  },
  {
    slug: "return-lufthansa-edinburgh-to-porto-alegre-dec-2026",
    tripType: "return",
    apiType: "brazil",
    airlineName: "Lufthansa",
    airlineLogo: "imgs/airlines/lufthansa.png",
    departureCode: "EDI",
    departureCity: "Edinburgh",
    destinationCode: "POA",
    destinationCity: "Porto Alegre",
    price: 952.44,
    dates: "24 Dec - 17 Jan"
  },
  {
    slug: "return-tap-london-to-salvador-aug-2026",
    tripType: "return",
    apiType: "brazil",
    airlineName: "TAP Air Portugal",
    airlineLogo: "imgs/airlines/tap.png",
    departureCode: "LGW",
    departureCity: "London",
    destinationCode: "SSA",
    destinationCity: "Salvador",
    price: 964.78,
    dates: "16 Aug - 31 Aug"
  },
  {
    slug: "return-american-london-to-florianopolis-sep-2026",
    tripType: "return",
    apiType: "brazil",
    airlineName: "American Airlines",
    airlineLogo: "imgs/airlines/american.png",
    departureCode: "LHR",
    departureCity: "London",
    destinationCode: "FLN",
    destinationCity: "Florianopolis",
    price: 1012.49,
    dates: "04 Sep - 25 Sep"
  },
]

const FlightCard = ({ flight }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: '#fff',
        border: `2px solid #2E739B`,
      }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full"
        style={{ backgroundColor: '#F29B32' }}
      ></div>

      {/* Card content */}
      <div className="p-6 relative z-10">
        {/* Header - Airline and Trip Type */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1" style={{ color: '#2E739B' }}>
              {flight.airlineName}
            </h3>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase"
              style={{
                backgroundColor: '#F29B32',
                color: '#fff',
              }}
            >
              {flight.tripType}
            </span>
          </div>
          {/* Plane icon */}
          <Plane size={24} style={{ color: '#F29B32' }} />
        </div>

        {/* Route */}
        <div
          className="bg-opacity-5 rounded-lg p-4 mb-6"
          style={{ backgroundColor: '#2E739B' }}
        >
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: '#2E739B' }}>
                {flight.departureCode}
              </p>
              <p className="text-xs opacity-70" style={{ color: '#2E739B' }}>
                {flight.departureCity}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-2 px-4">
              <div
                className="w-8 h-0.5"
                style={{ backgroundColor: '#F29B32' }}
              ></div>
              <ChevronRight size={18} style={{ color: '#F29B32' }} />
            </div>

            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: '#2E739B' }}>
                {flight.destinationCode}
              </p>
              <p className="text-xs opacity-70" style={{ color: '#2E739B' }}>
                {flight.destinationCity}
              </p>
            </div>
          </div>
        </div>

        {/* Dates and Price Row */}
        <div className="flex items-end justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: '#F29B32' }} />
            <div>
              <p className="text-xs opacity-60" style={{ color: '#2E739B' }}>
                Travel Dates
              </p>
              <p className="text-sm font-semibold" style={{ color: '#2E739B' }}>
                {flight.dates}
              </p>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div
          className="rounded-lg p-4 text-center"
          style={{ backgroundColor: '#F29B32' }}
        >
          <p className="text-xs text-white opacity-90 mb-1">Starting from</p>
          <p className="text-3xl font-bold text-white">£{flight.price.toFixed(2)}</p>
        </div>

        {/* CTA Button */}
        <button
          className="w-full mt-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
          style={{
            backgroundColor: isHovered ? '#F29B32' : '#2E739B',
            color: '#fff',
            border: `2px solid #F29B32`,
          }}
        >
          Book Now
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #F29B32 0%, #2E739B 100%)',
          padding: '2px',
        }}
      >
        <div className="absolute inset-0.5 bg-white rounded-xl"></div>
      </div>
    </div>
  )
}

export default function FlightDeals() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#F29B32' }}>
            Flight Deals
          </h2>
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: '#2E739B' }}
          >
            Your Gateway to Affordable Airfare
          </h1>
          <p className="text-lg opacity-75 max-w-2xl mx-auto" style={{ color: '#2E739B' }}>
            Fly further for less. Access our curated database of bargain flight tickets tailored to keep UK jetsetters on budget.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flightData.map((flight) => (
            <FlightCard key={flight.slug} flight={flight} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <button
            className="px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: '#F29B32',
              color: '#fff',
              border: `2px solid #F29B32`,
            }}
          >
            Explore All Deals
          </button>
        </div>
      </div>
    </div>
  )
}