import EditHolidayForm from "./EditHolidayForm";

async function getHoliday(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const url = `${baseUrl}/api/holiday-breaks/${id}`;

  console.log(url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  console.log(res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch holiday");
  }

  const { data } = await res.json();

  return data;
}

export default async function Page({ params }) {
  const { id } = await params;  // ← await this

  console.log("ID:", id);

  const holiday = await getHoliday(id);

  return <EditHolidayForm holiday={holiday} />;
}