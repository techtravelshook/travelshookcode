"use client";
import FlightsPlacesCards from '@/components/flightservice/flightsplaces/Destinations';
import BookNowPayLaterBanner from '@/components/flightservice/flightsplaces/FlightBanners';
import FlightDirectoryLinks from '@/components/flightservice/flightsplaces/FlightDirectories';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';
import FlightDealsGrid from '@/components/flightservice/flightsplaces/FlightTickets';
import FlightHeroLayout from '@/components/flightservice/Header';

import React, { useEffect, useState } from 'react';

// 1. Static fallback data (used while loading or if database is empty)
const staticAccraDeals = [
  {
    tripType: "Oneway",
    airline: "EgyptAir",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "ACC",
    toCity: "Accra",
    price: "£385.00",
    dateRange: "08 Jun 2026"
  },
  {
    tripType: "Oneway",
    airline: "British Airways",
    fromCode: "LGW",
    fromCity: "London Gatwick",
    toCode: "ACC",
    toCity: "Accra",
    price: "£495.00",
    dateRange: "24 May 2026"
  }
];

const africanCities = [
  { label: "Flights to Cairo, Egypt", slug: "/flights/cairo" },
  { label: "Flights to Johannesburg, South Africa", slug: "/flights/johannesburg" },
  { label: "Flights to Nairobi, Kenya", slug: "/flights/nairobi" },
  { label: "Flights to Casablanca, Morocco", slug: "/flights/casablanca" },
  { label: "Flights to Addis Ababa, Ethiopia", slug: "/flights/addis-ababa" },
  { label: "Flights to Lagos, Nigeria", slug: "/flights/lagos" }
];

const mostTravelledAfrica = [
  { label: "Flights to Kenya", slug: "/flights/kenya" },
  { label: "Flights to Uganda", slug: "/flights/uganda" },
  { label: "Flights to Ethiopia", slug: "/flights/ethiopia" },
  { label: "Flights to Malawi", slug: "/flights/malawi" },
  { label: "Flights to Botswana", slug: "/flights/botswana" },
  { label: "Flights to Gambia", slug: "/flights/gambia" },
  { label: "Flights to Cameroon", slug: "/flights/cameroon" },
  { label: "Flights to Angola", slug: "/flights/angola" },
  { label: "Flights to Rwanda", slug: "/flights/rwanda" }
];

// 2. Define the functional component properly
export default function AccraPage() {
  // Use React state to handle database flight rows dynamically
  const [liveDeals, setLiveDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side fetch requests use relative routes, no process.env required
    fetch("/api/flightroute?type=Accra")
      .then((res) => {
        if (!res.ok) throw new Error("API Route failure");
        return res.json();
      })
      .then((result) => {
        // If the database returns data, inject it into liveDeals state
        if (result.success && result.data && result.data.length > 0) {
          setLiveDeals(result.data);
        } else {
          // Fallback to static mock items if MySQL database table is empty
          setLiveDeals(staticAccraDeals);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLiveDeals(staticAccraDeals); // Graceful fallback
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <FlightHeroLayout 
        title="Flights to"
        highlightText="Accra"
        description="Fly to Accra with luxury options and budget-friendly tickets custom tailored for your trip."
        bgImage="/imgs/flights/accra.jpg" 
      />
      
      {loading ? (
        <div className="p-10 text-center text-gray-500">Loading flight pricing data...</div>
      ) : (
        <FlightDealsGrid cityName="Accra" dealsData={liveDeals} />
      )}

      <BookNowPayLaterBanner />
      <FlightFaqs cityName="Accra" />
      
      <FlightDirectoryLinks 
        primaryHeading="Popular City Hubs in Africa"
        secondaryHeading="Most Travelled Countries in Africa"
        primaryLinks={africanCities}
        secondaryLinks={mostTravelledAfrica}
      />
    </div>
  );
}
