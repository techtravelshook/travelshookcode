import AllHolidays from "./AllHolidays";

async function getHolidays() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/holidays`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  const { data } = await res.json();

  return data;
}

export default async function PackagesPage() {
  const packages = await getHolidays();

  return <AllHolidays packages={packages} />;
}