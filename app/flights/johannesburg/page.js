"use client";
import FlightsPlacesCards from '@/components/flightservice/flightsplaces/Destinations';
import BookNowPayLaterBanner from '@/components/flightservice/flightsplaces/FlightBanners';
import FlightDirectoryLinks from '@/components/flightservice/flightsplaces/FlightDirectories';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';
import FlightDealsGrid from '@/components/flightservice/flightsplaces/FlightTickets';
import FlightHeroLayout from '@/components/flightservice/Header';

import React from 'react'

// 3 Premium Highlight Packages
const capeTownPackages = [
  {
    title: "Cape Town Premium Economy Saver",
    price: "£849",
    airline: "British Airways",
    description: "Enjoy a spacious direct flight layout from London Heathrow to Cape Town International Airport with dedicated cabin comfort.",
    image: "/imgs/flights/capetown.jpg",
    highlights: ["2x 23kg Checked Bags", "Direct Flight Route", "Premium Cabin Seating"]
  },
  {
    title: "Cape Town Luxury Business Class",
    price: "£2,650",
    airline: "Qatar Airways",
    description: "Experience world-class hospitality, award-winning Qsuite lounges, and lie-flat seat configurations connecting smoothly via Doha.",
    image: "/imgs/flights/capetown.jpg",
    highlights: ["Luxury Lounge Access", "40kg Checked Luggage", "Priority Boarding"]
  },
  {
    title: "Cape Town Economy Budget Special",
    price: "£599",
    airline: "Ethiopian Airlines",
    description: "Affordable economy solutions with short transits. Ideal for families and flexible travelers visiting South Africa's Mother City.",
    image: "/imgs/flights/capetown.jpg",
    highlights: ["Complimentary Meals", "In-flight Entertainment", "1x 23kg Checked Bag"]
  }
];

// Live Flight Grid Deals
const capeTownDeals = [
  {
    tripType: "Oneway",
    airline: "Ethiopian Airlines",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "CPT",
    toCity: "Cape Town",
    price: "£415.00",
    dateRange: "08 Jun 2026"
  },
  {
    tripType: "Oneway",
    airline: "British Airways",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "CPT",
    toCity: "Cape Town",
    price: "£595.00",
    dateRange: "24 May 2026"
  },
  {
    tripType: "Return",
    airline: "Qatar Airways",
    fromCode: "MAN",
    fromCity: "Manchester",
    toCode: "CPT",
    toCity: "Cape Town",
    price: "£675.00",
    dateRange: "25 May - 08 Jun"
  },
  {
    tripType: "Return",
    airline: "British Airways",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "CPT",
    toCity: "Cape Town",
    price: "£789.50",
    dateRange: "21 May - 04 Jun"
  }
];

// 1. Regional City Destinations (Primary Category)
const africanCities = [
  { label: "Flights to Cairo, Egypt", slug: "/flights/cairo" },
  { label: "Flights to Johannesburg, South Africa", slug: "/flights/johannesburg" },
  { label: "Flights to Nairobi, Kenya", slug: "/flights/nairobi" },
  { label: "Flights to Casablanca, Morocco", slug: "/flights/casablanca" },
  { label: "Flights to Addis Ababa, Ethiopia", slug: "/flights/addis-ababa" },
  { label: "Flights to Lagos, Nigeria", slug: "/flights/lagos" }
];

// 2. Most Travelled Countries in Africa (Secondary Category)
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




function Johannesburg() {
  return (
    <div>
     <FlightHeroLayout 
      title="Flights to"
      highlightText="Cape Town"
      description="Fly to Cape Town with luxury options and budget-friendly tickets custom tailored for your trip."
      bgImage="/imgs/flights/capetow.jpg" 
    />
     <FlightsPlacesCards cityName="Cape Town" cardsData={capeTownPackages} />
     <FlightDealsGrid cityName="Cape Town" dealsData={capeTownDeals} />
     <BookNowPayLaterBanner/>
     <FlightFaqs cityName="Cape Town" />
     <FlightDirectoryLinks 
        primaryHeading="Popular City Hubs in Africa"
        secondaryHeading="Most Travelled Countries in Africa"
        primaryLinks={africanCities}
        secondaryLinks={mostTravelledAfrica}
      />

    </div>
  )
}

export default Johannesburg