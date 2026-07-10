import FlightsTable from "./FlightsTable";

async function getFlights() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/flightroute`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch flights");
  }

  const data = await res.json();

  return data.data;
}

export default async function FlightsPage() {
  const flights = await getFlights();
 

  return <FlightsTable flights={flights} />;

}
