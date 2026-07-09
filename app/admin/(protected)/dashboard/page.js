// app/admin/dashboard/page.jsx

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, Morgan 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Heres whats happening with TravelsHook today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Flights", value: "1,284", change: "+12%", color: "bg-indigo-50 text-indigo-600" },
          { label: "Holiday Packages", value: "340", change: "+5%", color: "bg-emerald-50 text-emerald-600" },
          { label: "Romantic Packages", value: "98", change: "+3%", color: "bg-rose-50 text-rose-600" },
          { label: "Umrah Packages", value: "215", change: "+8%", color: "bg-amber-50 text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${stat.color}`}>
              {stat.change} this month
            </span>
          </div>
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