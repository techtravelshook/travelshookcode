import { getAdmin } from "@/lib/getAdmin";

import Link from "next/link";

const stats = [
  {
    label: "Total Flights",
    value: "1,284",
    change: "+12%",
    color: "bg-indigo-50 text-indigo-600",
    href: "/admin/flights",
  },
  {
    label: "Holiday Packages",
    value: "340",
    change: "+5%",
    color: "bg-emerald-50 text-emerald-600",
    href: "/admin/holidays",
  },
  {
    label: "Romantic Packages",
    value: "98",
    change: "+3%",
    color: "bg-rose-50 text-rose-600",
    href: "/admin/honeymoon",
  },
  {
    label: "Umrah Packages",
    value: "215",
    change: "+8%",
    color: "bg-amber-50 text-amber-600",
    href: "/admin/umrah",
  },
];
export default async function DashboardPage() {
   const admin = await getAdmin();

  return (
    <div className="space-y-6">
      <div>
         Welcome  {admin?.name} 👋
        <p className="text-slate-500 text-sm mt-1">Let&apos;s Make TravelsHook Award Winning</p>
      </div>

      {/* Stat cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((stat) => (
    <Link
      key={stat.label}
      href={stat.href}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
    >
      <p className="text-sm text-slate-500">{stat.label}</p>

      <p className="text-3xl font-bold text-slate-800 mt-1">
        {stat.value}
      </p>

      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${stat.color}`}
      >
        {stat.change} this month
      </span>
    </Link>
  ))}
</div>

      {/* Placeholder content area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Recent Bookings</h3>
        <p className="text-slate-400 text-sm">Booking table goes here…</p>
      </div>
    </div>
  );
}