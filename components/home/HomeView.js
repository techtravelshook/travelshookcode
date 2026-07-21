import dynamic from "next/dynamic";
import HomeSlider from "./slider";
import FlightSearchWidget from "@/components/filter/FlightFilter";
import CustomSlider from "../CustomSlider";
import ReviewsPage from "./googleReviews";
import GoogleReviews from "./googleReviews";


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
    price: "£320",
    image: "/imgs/dubai.jpg",
    time: "1hr",
    airline: "Emirates",
    hotel: "5 Star Hotel",
    rating: 4.8,
    travelers: "3 Adults",
    departure: "Lahore",
    duration: "4 Days / 3 Nights",
    features: ["Flight Included", "Hotel Included", "Airport Transfer"]
  },
  {
    city: "Istanbul",
    country: "Turkey",
    price: "£450",
    image: "/imgs/turkey.jpg",
    time: "3hr",
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
    price: "£280",
    image: "/imgs/hajj/hajj32.jpg",
    time: "4hr",
    airline: "Saudia",
    hotel: "Luxury Hotel near Haram",
    rating: 4.9,
    travelers: "3 Adults",
    departure: "Lahore",
    duration: "7 Days / 6 Nights",
    features: ["Flight Included", "Hotel Included", "Ziyarat Tour"]
  },
  {
    city: "Paris",
    country: "France",
    price: "£650",
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
    price: "£590",
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
    city: "Sydney",
    country: "Australia",
    price: "£850",
    image: "/imgs/flights/australia.jpg",
    time: "14hr",
    airline: "Malaysia Airlines",
    hotel: "4 Star Harbour View",
    rating: 4.8,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "7 Days / 6 Nights",
    features: ["Flight Included", "Hotel Included", "City Pass"]
  },
  {
    city: "Phuket",
    country: "Thailand",
    price: "£360",
    image: "/imgs/flights/thailand1.jpg",
    time: "5hr",
    airline: "Thai Airways",
    hotel: "Beachfront Resort",
    rating: 4.6,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "Island Tour"]
  },
  {
    city: "Johannesburg",
    country: "South Africa",
    price: "£570",
    image: "/imgs/flights/south-africa.jpg",
    time: "12hr",
    airline: "Qatar Airways",
    hotel: "Luxury Safari Lodge",
    rating: 4.7,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "6 Days / 5 Nights",
    features: ["Flight Included", "Hotel Included", "Safari Tour"]
  },
  {
    city: "Hunza Valley",
    country: "Pakistan",
    price: "£180",
    image: "/imgs/flights/pakistan2.jpg",
    time: "1.5hr",
    airline: "PIA",
    hotel: "Luxury Mountain Resort",
    rating: 4.9,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "5 Days / 4 Nights",
    features: ["Flight Included", "Hotel Included", "Tour Guide"]
  },
  {
    city: "Toronto",
    country: "Canada",
    price: "£890",
    image: "/imgs/flights/canada1.jpg",
    time: "15hr",
    airline: "Etihad Airways",
    hotel: "5 Star Downtown Hotel",
    rating: 4.7,
    travelers: "2 Adults",
    departure: "Lahore",
    duration: "8 Days / 7 Nights",
    features: ["Flight Included", "Hotel Included", "Airport Transfer"]
  }
];
function HomeView() {
  const flayers=[
    "imgs/sliderimgs/u01.webp",
    "imgs/sliderimgs/f002.webp",
    "imgs/sliderimgs/f003.webp",
    "imgs/sliderimgs/f004.webp",
   
    "imgs/sliderimgs/f005.webp",
    "imgs/sliderimgs/f006.webp",
    
    "imgs/sliderimgs/f008.webp",
    "imgs/sliderimgs/f007.webp",
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
      <GoogleReviews/>
      <CustomSlider images={flayers}/>
    </div>
  );
}

export default HomeView;
