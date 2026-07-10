import EditContentForm from "./EditContentForm";

async function getContent(slug) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/flightcontent/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }

  return await res.json();
}

export default async function Page({ params }) {
  const { slug } = await params;

  const content = await getContent(slug);

  return <EditContentForm content={content} />;
}