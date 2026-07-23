import Link from "next/link";
import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CONTENT = {
  h1: "Luxury Umrah Packages UK",
  sections: [
    {
      heading: "Experience Umrah with Comfort, Convenience and Peace of Mind",
      paragraphs: [
        "Performing Umrah is one of life's most meaningful spiritual journeys. At Travels Hook, we believe your focus should remain on worship and reflection, not on the stress of organising flights, hotels or transport. Our Luxury Umrah Packages are carefully planned to provide a smooth and comfortable travel experience for pilgrims departing from the UK.",
        "Whether you are travelling alone, as a couple, with your family or as part of a group, our luxury packages combine premium accommodation, carefully selected flights and personalised support to help make your journey as seamless as possible. Every itinerary is designed with convenience in mind, allowing you to spend more time in worship and less time worrying about travel arrangements.",
      ],
    },
    {
      heading: "Why Choose Our Luxury Umrah Packages?",
      paragraphs: [
        "A luxury Umrah package offers more than just premium accommodation. It provides peace of mind through carefully organised travel, dependable support and thoughtfully selected services that enhance your overall experience.",
        "With Travels Hook, you can expect:",
      ],
      bullets: [
        "Carefully selected hotels in Makkah and Madinah",
        "Comfortable flight options from the UK",
        "Airport and hotel transfers",
        "Assistance with travel arrangements",
        "Flexible package options",
        "Friendly customer support before and during your journey",
        "Family-friendly travel planning",
        "Competitive pricing with no hidden surprises",
      ],
      afterBullets: "Every package is tailored to help you enjoy a comfortable and memorable pilgrimage.",
    },
    {
      heading: "What's Included in Our Luxury Umrah Packages?",
      paragraphs: [
        "Our packages are designed to provide everything you need for a well-organised journey.",
        "Depending on your chosen package, your booking may include:",
      ],
      bullets: [
        "Return flights from the UK",
        "Luxury hotel accommodation in Makkah",
        "Luxury hotel accommodation in Madinah",
        "Airport transfers",
        "Ground transportation",
        "Assistance with Umrah travel requirements",
        "Experienced travel support",
        "Optional Ziyarah tours",
        "Flexible travel dates",
        "Various room-sharing options",
      ],
      afterBullets:
        "Specific inclusions may vary depending on your selected itinerary, travel dates and hotel availability.",
    },
    {
      heading: "Stay in Premium Hotels Near the Holy Mosques",
      paragraphs: [
        "One of the biggest advantages of choosing a luxury package is the quality and location of your accommodation.",
        "We work with carefully selected hotels that offer comfortable rooms, modern facilities and convenient access to the Holy Mosques whenever possible. Staying closer to the Haram reduces travel time and allows you to make the most of your time in worship.",
        "Many of our premium hotel options include spacious rooms, high-quality dining, excellent guest services and a welcoming environment for families and elderly travellers.",
      ],
    },
    {
      heading: "Flights from Major UK Airports",
      paragraphs: [
  <>
    Our <Link href="/hajj-umrah" className="font-bold text-orange-400 text-underline">  Umrah Packages</Link> are available with departures from major airports across the United Kingdom, subject to airline schedules and availability.
  </>,
  "Common departure airports include:"
],
      bullets: [
        "London Heathrow",
        "Manchester",
        "Birmingham",
        "Glasgow",
      ],
      afterBullets:
        "Our team can help you explore suitable flight options based on your preferred travel dates and departure location.",
    },
    {
      heading: "Luxury Umrah Packages for Families",
      paragraphs: [
        "Travelling with family requires careful planning, especially when young children or elderly relatives are involved.",
        "Our family-friendly luxury packages are designed to make your journey easier by offering comfortable accommodation, convenient transport and flexible room options. We understand that every family has different requirements, and we aim to provide solutions that match your travel preferences.",
        "Whether you're travelling with your spouse, parents or children, we'll help you find a package that suits your needs.",
      ],
    },
    {
      heading: "Why Book Early?",
      paragraphs: [
        "Booking your Luxury Umrah Package well in advance can provide several benefits.",
        "Early booking often gives you access to:",
      ],
      bullets: [
        "Better hotel availability",
        "More flight choices",
        "Greater flexibility with travel dates",
        "Competitive package pricing",
        "More time to prepare for your pilgrimage",
      ],
      afterBullets:
        "Peak travel periods such as Ramadan, school holidays and December tend to experience higher demand, making early planning especially worthwhile.",
    },
    {
      heading: "Personalised Luxury Umrah Packages",
      paragraphs: [
        "Every traveller has different expectations and budgets.",
        "That's why we offer personalised package options that can be tailored according to:",
      ],
      bullets: [
        "Preferred travel dates",
        "Number of travellers",
        "Hotel preferences",
        "Trip duration",
        "Room occupancy",
        "Family requirements",
      ],
      afterBullets:
        "Our experienced team will work with you to recommend a package that provides the right balance between comfort, convenience and value.",
    },
    {
      heading: "Why Choose Travels Hook?",
      paragraphs: [
  "Choosing the right travel agency is just as important as choosing the right package.",
  <>
    <Link href="/" className="font-bold text-orange-400 text-underline">Travels Hook</Link> is committed to providing professional service, transparent communication and carefully organised Umrah travel solutions for UK pilgrims.
  </>,

  "When you book with us, you benefit from:"
],

      bullets: [
        "Professional travel guidance",
        "Responsive customer support",
        "Carefully selected accommodation",
        "Flexible travel options",
        "Competitive pricing",
        "Personalised assistance from enquiry to return",
      ],
      afterBullets:
        "Our goal is to help every pilgrim travel with confidence while focusing on what matters most — their spiritual journey.",
    },
  ],
};
export default function UmrahSEOContent({
  content = CONTENT,
  maxHeight = "480px",
  className = "",
}) {
  return (
    <section className={ ` dark:text-white dark:bg-slate-950 py-12 px-4 bg-[#F7F9FE] ${className}`} >
      <div className="max-w-6xl mx-auto">

        {/* Outer card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-orange-400 border-b border-[#0A2540]">
            <h1 className="text-white text-lg md:text-2xl font-extrabold tracking-tight">
              {content.h1}
            </h1>
           
          </div>

          {/* Scrollable body */}
          <div
            className="overflow-y-auto px-6 py-6 space-y-8"
            style={{ maxHeight: maxHeight === "none" ? undefined : maxHeight }}
          >
            {content.sections.map((section, i) => (
              <div key={i} className="space-y-3">

                {/* Subheading */}
                <h2 className="text-[#0A2540] font-bold text-base md:text-lg leading-snug border-l-4 border-[#C9972C] pl-3">
                  {section.heading}
                </h2>

                {/* Paragraphs before bullets */}
                {section.paragraphs?.map((para, j) => (
                  <p key={j} className="text-[#6B7C93] text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Bullet list */}
                {section.bullets?.length > 0 && (
                  <ul className="space-y-1.5 pl-1">
                    {section.bullets.map((item, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-[#6B7C93] text-sm md:text-base">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9972C]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraph after bullets */}
                {section.afterBullets && (
                  <p className="text-[#6B7C93] text-sm md:text-base leading-relaxed">
                    {section.afterBullets}
                  </p>
                )}

              </div>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="h-8 bg-gradient-to-t from-white to-transparent -mt-8 pointer-events-none relative z-10" />
        </div>

      </div>
    </section>
  );
}