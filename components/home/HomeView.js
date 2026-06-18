import React from 'react';
import HomeSlider from './slider';
import DynamicSlider from '../DynamicSlider/DynamicSlider';
import FlightsInfo from './FlightsInfo';
import UmrahPackage from "../umrah/UmrahPackage";
import HolidayDeals from '../Holidays/Holidays';
import HolidayCards from '../Holidays/HolidayCards';
import HolidayPackages from '../Holidays/HolidayPackages';
import HajjCards from '@/components/hajjumrah/HajjCards';

import BookingProcess from "@/components/hajjumrah/BookingProcess";
// 1. Destinations Data Array
const destinations = [
  {
    city: "Dubai",
    country: "UAE",
    price: "$320",
    image: "/imgs/dubai.jpg",
    time: "1hr",
    airline: "Emirates",
    hotel: "5 Star Hotel",
    rating: 4.8,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "4 Days / 3 Nights",
    features: ["Flight Included", "Hotel Included", "Airport Transfer"]
  },
  {
    city: "Istanbul",
    country: "Turkey",
    price: "$450",
    image: "/imgs/turkey.jpg",
    time: "5hr",
    airline: "Turkish Airlines",
    hotel: "Boutique Hotel",
    rating: 4.7,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "City Tour"]
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    price: "$280",
    image: "/imgs/hajj/hajj32.jpg",
    time: "4hr",
    airline: "Saudia",
    hotel: "Luxury Hotel near Haram",
    rating: 4.9,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "7 Days / 6 Nights",
    features: ["Flight Included", "Hotel Included", "Ziyarat Tour"]
  },
  {
    city: "Paris",
    country: "France",
    price: "$650",
    image: "/imgs/paris.jpg",
    time: "8hr",
    airline: "Qatar Airways",
    hotel: "4 Star Hotel",
    rating: 4.6,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "6 Days / 5 Nights",
    features: ["Flight Included", "Hotel Included", "Breakfast"]
  },
  {
    city: "Cape Town",
    country: "S. Africa",
    price: "$590",
    image: "/imgs/capetown.jpg",
    time: "11hr",
    airline: "Qatar Airways",
    hotel: "Beach Resort",
    rating: 4.7,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "Car Rental"]
  },
  {
    city: "Dubai",
    country: "UAE",
    price: "$320",
    image: "/imgs/dubai.jpg",
    time: "1hr",
    airline: "FlyDubai",
    hotel: "4 Star Resort",
    rating: 4.5,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "4 Days / 3 Nights",
    features: ["Flight Included", "Hotel Included", "Desert Safari"]
  },
  {
    city: "Istanbul",
    country: "Turkey",
    price: "$450",
    image: "/imgs/turkey.jpg",
    time: "5hr",
    airline: "Pegasus Airlines",
    hotel: "4 Star Hotel",
    rating: 4.4,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "Bosphorus Cruise"]
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    price: "$280",
    image: "/imgs/makkah.jpg",
    time: "4hr",
    airline: "Pakistan International Airlines",
    hotel: "Standard Hotel",
    rating: 4.6,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "7 Days / 6 Nights",
    features: ["Flight Included", "Hotel Included", "Shuttle Service"]
  },
  {
    city: "Paris",
    country: "France",
    price: "$650",
    image: "/imgs/paris.jpg",
    time: "8hr",
    airline: "Emirates",
    hotel: "City Center Hotel",
    rating: 4.5,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "6 Days / 5 Nights",
    features: ["Flight Included", "Hotel Included", "Museum Pass"]
  },
  {
    city: "Cape Town",
    country: "S. Africa",
    price: "$590",
    image: "/imgs/capetown.jpg",
    time: "11hr",
    airline: "Emirates",
    hotel: "4 Star Hotel",
    rating: 4.6,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "Mountain Tour"]
  }
];


// 2. Holiday Destinations Data Array
const holidayDestinations = [
  { city: "Spain", country: "Europe", price: "£235", image: "/imgs/holidays/spain.jpg" },
  { city: "Greece", country: "Europe", price: "£201", image: "/imgs/holidays/greece.jpg" },
  { city: "Italy", country: "Europe", price: "£333", image: "/imgs/holidays/italy.jpg" },
  { city: "France", country: "Europe", price: "£277", image: "/imgs/holidays/france.jpg" },
  { city: "Dubai", country: "UAE", price: "£804", image: "/imgs/holidays/dubai.jpg" },
  { city: "Thailand", country: "Asia", price: "£804", image: "/imgs/holidays/thailand.jpg" },
  { city: "Bali", country: "Indonesia", price: "£1097", image: "/imgs/holidays/bali.jpg" },
  { city: "Spain", country: "Europe", price: "£235", image: "/imgs/holidays/spain.jpg" },
  { city: "Greece", country: "Europe", price: "£201", image: "/imgs/holidays/greece.jpg" },
  { city: "Italy", country: "Europe", price: "£333", image: "/imgs/holidays/italy.jpg" },
  { city: "France", country: "Europe", price: "£277", image: "/imgs/holidays/france.jpg" },
  { city: "Dubai", country: "UAE", price: "£804", image: "/imgs/holidays/dubai.jpg" },
  { city: "Thailand", country: "Asia", price: "£804", image: "/imgs/holidays/thailand.jpg" },
  { city: "Bali", country: "Indonesia", price: "£1097", image: "/imgs/holidays/bali.jpg" },
];
// last section deals data

const holidayDeals = [
  {
    id: "01",
    title: "Alborada Ocean Club",
    desc: "Experience the ultimate Tenerife getaway. Includes a Double Room with full flight connectivity.",
    image: "/imgs/alborada.jpg",
    tags: ["7 Nights", "Double Room", "Flights Included"],
    price: "£1,199",
    stars: 3,
  },
  {
    id: "02",
    title: "Journey To Nepal",
    desc: "A spiritual and adventurous trek through the heart of the Himalayas with full guided support.",
    image: "/imgs/nepal.jpg",
    tags: ["Adventure", "Guided", "Flights Included"],
    price: "£1,199",
    stars: 4,
  },
  {
    id: "03",
    title: "Luxury Crete",
    desc: "A premium stay at Akasha Beach Hotel & Spa. Crystal clear waters and world-class hospitality.",
    image: "/imgs/crete.jpg",
    tags: ["5 Nights", "5-Star Hotel", "Spa Included"],
    price: "£599",
    stars: 5,
  },
  {
    id: "04",
    title: "Christmas Market Cruise",
    desc: "Celebrate the festive season on a luxury river cruise visiting Europe's iconic Christmas markets.",
    image: "/imgs/cruise.jpg",
    tags: ["Cruise", "Festive", "All Inclusive"],
    price: "£299",
    stars: 5,
  },
];


function HomeView() {
  return (
    <div>
      <HomeSlider /> 
      
      {/*  */}
     
       {/* <HajjCards 
       starrating="featured-package"
      />     */}
      <DynamicSlider 
        title="Popular Destinations" 
        italicTitle="Around the World" 
        badge="Top Picks of your choice"
        data={destinations} 
      />
      <UmrahPackage />
      
        
         <HolidayPackages />   
      {/* <HolidayDeals 
      badge="Top Booked Routes"
      titleMain="Holiday Deals &"
      titleHighlight="Packages"
      subtitle="Handpicked packages with flights, hotels and more included."
  
    /> */}
      <FlightsInfo/>
      <BookingProcess/>
    </div>
  );
}

export default HomeView;
