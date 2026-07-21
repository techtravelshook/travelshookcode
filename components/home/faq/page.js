import HomeFaq from "./HomeFaq";

export default function FaqSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does an Umrah package cost from the UK?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of an Umrah package depends on your travel dates, hotel category, flight availability, and length of stay. Travels Hook offers affordable 3-star, 4-star, and 5-star Umrah packages with transparent pricing and no hidden charges."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in a Travels Hook Umrah package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Umrah packages can include return flights, Umrah visa assistance, hotel accommodation near Masjid al-Haram and Masjid an-Nabawi, airport transfers, and optional Ziyarat tours. Package inclusions vary depending on the selected package."
        }
      },
      {
        "@type": "Question",
        "name": "How long does Umrah visa processing take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Umrah visa processing usually takes a few working days after all required documents have been submitted. Processing times may vary depending on travel season and Saudi regulations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize my Umrah package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Travels Hook offers customised Umrah packages where you can choose your preferred travel dates, hotels, flights, room type, and additional services to suit your requirements and budget."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer family and group Umrah packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We provide Umrah packages for individuals, couples, families, and groups with flexible hotel options and personalised travel arrangements."
        }
      },
      {
        "@type": "Question",
        "name": "Can I book an Umrah package online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can enquire and book your Umrah package online through Travels Hook. Our travel specialists will guide you throughout the booking process and provide dedicated support before and during your journey."
        }
      },
      {
        "@type": "Question",
        "name": "Why choose Travels Hook for Umrah?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Travels Hook provides trusted Umrah packages with competitive pricing, experienced travel consultants, visa assistance, quality accommodation, and dedicated customer support to help make your pilgrimage smooth and stress-free."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <HomeFaq />
    </>
  );
}