// import React from 'react';
// import Image from 'next/image';

// export default function AboutUs() {
//   return (
//     <section className="py-16 px-4 max-w-7xl mx-auto font-sans">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
//         {/* Left Content Side */}
//         <div className="flex flex-col space-y-6">
//           <span className="text-[#E99238] font-bold text-lg uppercase tracking-wider">
//             Who We Are
//           </span>
          
//           <h2 className="text-3xl md:text-2xl lg:text-3xl font-extrabold text-[#1972A0] leading-tight">
//             Discover the Best Hajj and Umrah Experiences with TravelsHook
//           </h2>
          
//           <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//             Travels Hook is a trusted travel agency known for delivering reliable and affordable travel solutions across UK and beyond. We specialize in Umrah packages, honeymoon packages, customized vacation and holiday packages, flight bookings, hotel reservations, and complete visa assistance all designed to give you a smooth and worry-free travel experience.
//           </p>
          
//           <p className="text-gray-600 text-base md:text-lg leading-relaxed">
// What sets Travels Hook apart is the trust we&apos;ve built with thousands of satisfied travelers. Backed by consistently positive Google Reviews, we take pride in our transparent pricing, honest service, and genuine commitment to customer satisfaction. Every package we offer is planned by experienced travel consultants who understand the real needs of travelers, ensuring accurate information, timely support, and hassle-free bookings from start to finish.
//           </p>
//           <p className="text-gray-600 text-base md:text-lg leading-relaxed">
// Our growing community of happy customers and top-rated Google reviews reflect the trust and credibility we &apos;ve earned over the years. When you choose Travels Hook, you&apos;re not just booking a trip you&apos;re partnering with a team that values honesty, expertise, and long-term relationships over one-time transactions.

// Let Travels Hook be your reliable travel partner trusted by real travelers, proven by real results. Read what our travelers say check our Google Reviews today.
//           </p>
//         </div>

//         {/* Right Image Side */}
//         <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
//           <Image
//             src="/imgs/hajj/hajj23.jpg" 
//             alt="Makkah Clock Tower and Kaaba"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//       </div>
//     </section>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const services = [
  { name: 'Umrah Packages', href: '/hajj-umrah', icon: 'ti-building-mosque' },
  { name: 'Honeymoon Packages', href: '/holidays#holiday-deals', icon: 'ti-heart' },
  { name: 'Holiday Packages', href: '/holidays', icon: 'ti-beach' },
  { name: 'Flight Bookings', href: '/flights', icon: 'ti-plane' },
  { name: 'Hotel Reservations', href: '/cities-hotels', icon: 'ti-bed' },
 
];

export default function AboutUs() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-center">

        {/* Left Content Side */}
        <div className="flex flex-col space-y-5 md:space-y-6 lg:col-span-7">
          <span className="text-[#E99238] font-bold text-sm md:text-lg uppercase tracking-wider">
            Who We Are
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1972A0] leading-tight dark:text-orange-400">
            Discover the Best Hajj and Umrah Experiences with TravelsHook
          </h2>

          <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed dark:text-white">
            Travels Hook is a trusted travel agency known for delivering reliable and affordable
            travel solutions across the UK and beyond. We plan every journey around you, backed
            by thousands of satisfied travelers and consistently positive Google Reviews.
          </p>

          {/* Services Grid - clean, spaced, interlinked */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 pt-1">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-3 text-sm md:text-base font-semibold text-[#1972A0] dark:text-orange-300 hover:border-[#E99238] hover:text-[#E99238] hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <i className={`ti ${service.icon} text-lg text-[#E99238]`} aria-hidden="true" />
                {service.name}
              </Link>
            ))}
          </div>

          <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed dark:text-white pt-1">
            What sets Travels Hook apart is the trust we&apos;ve built over the years. We take
            pride in transparent pricing, honest service, and a genuine commitment to customer
            satisfaction. Every package is planned by experienced travel consultants who
            understand what real travelers need ensuring accurate information, timely support,
            and hassle-free bookings from start to finish.
          </p>

          <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed dark:text-white">
            Our growing community of happy customers and top-rated Google reviews reflect the
            credibility we&apos;ve earned. When you choose Travels Hook, you&apos;re not just
            booking a trip you&apos;re partnering with a team that values honesty, expertise,
            and long-term relationships over one-time transactions.
          </p>

          <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed dark:text-white">
            Let Travels Hook be your reliable travel partner — trusted by real travelers, proven
            by real results.{' '}
            <Link href="https://maps.app.goo.gl/tVS5aEjsscm9VCXu5" className="font-bold text-orange-400 hover:underline">
              Read what our travelers say on Google Reviews
            </Link>
            .
          </p>
        </div>
        {/* Right Image Side (Takes up 5 out of 12 columns on desktop) */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl lg:col-span-5">
          <Image
            src="/imgs/hajj/hajj23.jpg" 
            alt="Makkah Clock Tower and Kaaba"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
