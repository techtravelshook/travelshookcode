
import AllPackages from "./AllPackages";

async function getHolidays() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/honeymoon`, {
    cache: "no-store",
  });
 if (!res.ok) {
  const text = await res.text();
  console.log(text);
  throw new Error(`Failed to fetch packages (${res.status})`);
}
  const { data } = await res.json();
  return data;
}

export default async function PackagesPage() {
  const packages = await getHolidays();

  return <AllPackages packages={packages} />;
}