"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookNowPayLaterBanner from "@/components/flightservice/flightsplaces/FlightBanners";
import FlightDealsGrid from "@/components/flightservice/flightsplaces/FlightTickets";
import FlightHeroLayout from "@/components/flightservice/Header";
import { flightDestinations,africanCities,mostTravelledAfrica } from "../data/flightDestinations";
import FlightModal from "@/components/flightservice/FlightModal";
import BookingProcess from "@/components/hajjumrah/BookingProcess";
import DynamicFaqs from "@/components/flightservice/flightsplaces/DynamicFaqs";
import FlightsZigzag from "@/components/flightservice/FlightsZigzag";


export default function FlightPage() {
  const params = useParams();
  const slug = params.slug;

  const destination = flightDestinations[slug];

  const [liveDeals, setLiveDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!slug) return;

  const destination = flightDestinations[slug];
  if (!destination) return;

  setLoading(true);

  fetch(`/api/flightroute?type=${destination.apiType}`)
    .then((res) => res.json())
    .then((result) => {
      console.log("API RESULT:", result); // 🔥 debug
      setLiveDeals(result?.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [slug]);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div>
      <FlightHeroLayout
        title={destination.title}
        highlightText={destination.highlightText}
        description={destination.description}
        bgImage={destination.bgImage}
      />

      {loading ? (
        <div className="p-10 text-center">
          Loading flight pricing data...
        </div>
      ) : (
        <FlightDealsGrid
          cityName={destination.cityName}
          dealsData={liveDeals}
        />
      )}
<FlightsZigzag/>
      <BookNowPayLaterBanner />
      <DynamicFaqs/>
      <FlightModal/>
<BookingProcess/>
    </div>
  );
}