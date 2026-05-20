"use client";
import FlightsPlacesCards from '@/components/flightservice/flightsplaces/Destinations';
import BookNowPayLaterBanner from '@/components/flightservice/flightsplaces/FlightBanners';
import FlightDirectoryLinks from '@/components/flightservice/flightsplaces/FlightDirectories';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';
import FlightDealsGrid from '@/components/flightservice/flightsplaces/FlightTickets';
import FlightHeroLayout from '@/components/flightservice/Header';

import React from 'react'

const accraPackages = [
  {
    title: "Accra Premium Economy Deal",
    price: "£549",
    airline: "British Airways",
    description: "Enjoy a spacious direct flight layout from London Heathrow to Kotoka International Airport with extra baggage allowance.",
    image: "/imgs/flights/accra.jpg",
    highlights: ["2x 23kg Checked Bags", "Direct Flight Route", "Changeable Tickets"]
  },
  {
    title: "Accra Business Class Luxury",
    price: "£1,450",
    airline: "Qatar Airways",
    description: "Experience premium hospitality, lounge access, and lie-flat seat configurations connecting via Doha.",
    image: "/imgs/flights/accra.jpg",
    highlights: ["Lounge Access Included", "40kg Checked Luggage", "Priority Boarding"]
  },
  {
    title: "Accra Budget Saver Special",
    price: "£420",
    airline: "EgyptAir",
    description: "Affordable economy solutions with short transits. Ideal for families and flexible travelers visiting Ghana.",
    image: "/imgs/flights/accra.jpg",
    highlights: ["Free Meal Included", "In-flight Entertainment", "1x 23kg Checked Bag"]
  }
];
// deals 
const accraDeals = [
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
  },
  {
    tripType: "Return",
    airline: "Kenya Airways",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "ACC",
    toCity: "Accra",
    price: "£575.00",
    dateRange: "25 May - 08 Jun"
  },
  {
    tripType: "Return",
    airline: "British Airways",
    fromCode: "LHR",
    fromCity: "London Heathrow",
    toCode: "ACC",
    toCity: "Accra",
    price: "£689.50",
    dateRange: "21 May - 04 Jun"
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

function Accra() {
  return (
    <div>
     <FlightHeroLayout 
      title="Flights to"
      highlightText="Accra"
      description="Fly to Accra with luxury options and budget-friendly tickets custom tailored for your trip."
      bgImage="/imgs/flights/accra.jpg" 
    />
     <FlightsPlacesCards cityName="Accra" cardsData={accraPackages} />
     <FlightDealsGrid cityName="Accra" dealsData={accraDeals} />
     <BookNowPayLaterBanner/>
     <FlightFaqs cityName="Accra" />
     <FlightDirectoryLinks 
             primaryHeading="Popular City Hubs in Africa"
             secondaryHeading="Most Travelled Countries in Africa"
             primaryLinks={africanCities}
             secondaryLinks={mostTravelledAfrica}
           />

    </div>
  )
}

export default Accra