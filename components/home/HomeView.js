import dynamic from "next/dynamic";
import HomeSlider from "./slider";
import FlightSearchWidget from "@/components/filter/FlightFilter";
import CustomSlider from "../CustomSlider";


// Lazy load everything below the hero
const DynamicSlider = dynamic(
  () => import("../DynamicSlider/DynamicSlider"),
  {
    loading: () => <div className="h-40" />,
  }
);
const UmrahPackage = dynamic(
  () => import("../umrah/UmrahPackage"),
  {
    loading: () => <div className="h-40" />,
  }
);
const HolidayPackages = dynamic(
  () => import("../Holidays/HolidayPackages"),
  {
    loading: () => <div className="h-40" />,
  }
);
const FlightsInfo = dynamic(
  () => import("./FlightsInfo"),
  {
    loading: () => <div className="h-40" />,
  }
);
const BookingProcess = dynamic(
  () => import("@/components/hajjumrah/BookingProcess"),
  {
    loading: () => <div className="h-40" />,
  }
);
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
function HomeView() {
  const flayers=[
    "imgs/fl1.jpg",
     "imgs/fl2.jpg",
      "imgs/fl3.jpg",
       "imgs/fl4.jpg",
        "imgs/fl3.jpg",
         "imgs/fl2.jpg",
          "imgs/fl1.jpg",
           "imgs/fl4.jpg",
  ]
  return (
    <div>
      <HomeSlider /> 
       <div className=" w-full px-2 sm:px-0 z-10 relative "> 
  <FlightSearchWidget /> 
</div>
      <DynamicSlider 
        title="Popular Destinations" 
        italicTitle="Around the World" 
        badge="Top Picks of your choice"
        data={destinations} 
      />
      <UmrahPackage />
         <HolidayPackages />   
      <FlightsInfo/>
      <BookingProcess/>
      <CustomSlider images={flayers}/>
    </div>
  );
}

export default HomeView;
