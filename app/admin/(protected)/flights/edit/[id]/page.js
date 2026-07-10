import EditFlightForm from "./EditFlightForm";
import { notFound } from "next/navigation";

async function getFlight(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  try {
    const res = await fetch(
      `${baseUrl}/api/flightroute/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching flight:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  const flight = await getFlight(id);

  if (!flight) {
    notFound();
  }

  return <EditFlightForm flight={flight} />;
}