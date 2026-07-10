import Image from "next/image";

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

  return res.json();
}

export default async function Page({ params }) {
  const { slug } = await params;

  const content = await getContent(slug);

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8 capitalize text-orange-500">
        {content.apiType} Flight Content
      </h1>

      {/* Section 1 */}

      <div className="bg-white rounded-xl shadow p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          {content.section1Title}
        </h2>

        <Image
          src={`/${content.section1img}`}
          width={900}
          height={500}
          alt={content.section1Title}
          className="rounded-lg mb-6"
        />

        <p className="text-gray-700 leading-8">
          {content.section1Content}
        </p>

      </div>

      {/* Section 2 */}

      <div className="bg-white rounded-xl shadow p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          {content.section2Title}
        </h2>

        <Image
          src={`/${content.section2img}`}
          width={900}
          height={500}
          alt={content.section2Title}
          className="rounded-lg mb-6"
        />

        <p className="text-gray-700 leading-8">
          {content.section2Content}
        </p>

      </div>

      {/* FAQs */}

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-3xl font-bold mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          {content.faqs?.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-5"
            >
              <h3 className="font-semibold text-lg mb-2">
                {faq.q}
              </h3>

              <p className="text-gray-700">
                {faq.a}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}