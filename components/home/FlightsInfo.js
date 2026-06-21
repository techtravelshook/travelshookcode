import React from 'react';
import { PlaneTakeoff } from 'lucide-react';

const flights = [
  { to: 'Nigeria',      price: '349', pence: '00' },
  { to: 'Ghana',        price: '500', pence: '00' },
  { to: 'Kenya',        price: '287', pence: '50' },
  { to: 'South Africa', price: '364', pence: '99' },
  { to: 'Ethiopia',     price: '347', pence: '00' },
  { to: 'Zimbabwe',     price: '463', pence: '00' },
  { to: 'Morocco',      price: '246', pence: '75' },
  { to: 'Egypt',        price: '340', pence: '00' },
  { to: 'Rwanda',       price: '362', pence: '50' },
  { to: 'Angola',       price: '419', pence: '00' },
  { to: 'Pakistan',     price: '337', pence: '63' },
  { to: 'Bangladesh',   price: '420', pence: '90' },
  { to: 'Dubai',        price: '299', pence: '00' },
  { to: 'Thailand',     price: '804', pence: '00' },
  { to: 'Sri Lanka',    price: '320', pence: '59' },
  { to: 'Philippines',  price: '341', pence: '89' },
  { to: 'Spain',        price: '235', pence: '00' },
  { to: 'Greece',       price: '201', pence: '00' },
];

const col1 = flights.slice(0, 6);
const col2 = flights.slice(6, 12);
const col3 = flights.slice(12, 18);

function FlightRow({ destination, price, pence }) {
  return (
    <div className="group flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-white/[0.06] hover:border-[#F7931E]/30 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <PlaneTakeoff
          size={14}
          className="text-slate-400 dark:text-white/25 group-hover:text-[#F7931E] transition-colors duration-200 shrink-0"
        />
        <span className="text-[13.5px] text-slate-600 dark:text-white/70 group-hover:text-slate-900 group-hover:dark:text-white transition-colors duration-200">
          Flights to {destination}
        </span>
      </div>
      <div className="flex items-baseline gap-0 ml-6">
        <span className="text-[11px] text-slate-400 dark:text-white/35 mr-1">fr.</span>
        <span className="text-[13.5px] font-bold text-slate-800 dark:text-white/90 group-hover:text-[#F7931E] transition-colors duration-200">
          £{price}
        </span>
        <span className="text-[10px] font-bold text-slate-400 dark:text-white/45 leading-none self-start mt-0.5">
          .{pence}
        </span>
      </div>
    </div>
  );
}

const FlightsInfo = () => {
  return (
    <section className="relative overflow-hidden w-full bg-white dark:bg-[#01080C] py-14 text-slate-900 dark:text-white transition-colors duration-500">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
              Top Booked Routes
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              Trending Destinations &
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent  pr-2 ml-2">
                Fares
              </span>
            </h2>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Most booked routes this week — grab yours before prices rise.
            </p>

          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
          <div>
            {col1.map((f) => (
              <FlightRow key={f.to} destination={f.to} price={f.price} pence={f.pence} />
            ))}
          </div>
          <div>
            {col2.map((f) => (
              <FlightRow key={f.to} destination={f.to} price={f.price} pence={f.pence} />
            ))}
          </div>
          <div>
            {col3.map((f) => (
              <FlightRow key={f.to} destination={f.to} price={f.price} pence={f.pence} />
            ))}
          </div>
        </div>
        <p className="mt-8 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          * Prices shown are the lowest available fares and may vary. All prices include taxes & fees.
        </p>
      </div>
    </section>
  );
};

export default FlightsInfo;
