"use client";
import FlightsPlacesCards from '@/components/flightservice/flightsplaces/Destinations';
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
function PortHarcourt() {
  return (
    <div>
     <FlightHeroLayout 
      title="Flights to"
      highlightText="Port Harcourt"
      description="Fly to Port Harcourt with luxury options and budget-friendly tickets custom tailored for your trip."
      bgImage="/imgs/flights/capetow.jpg" 
    />
     <FlightsPlacesCards cityName="Cape Town" cardsData={capeTownPackages} />
     <FlightDealsGrid cityName="Cape Town" dealsData={capeTownDeals} />
     <FlightFaqs cityName="Cape Town" />

    </div>
  )
}
export default PortHarcourt