import Link from "next/link";

async function getContents() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/flightcontent`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch flight content");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page() {
  const contents = await getContents();

  return (
    <div className="w-full min-h-screen bg-slate-50 p-8 font-sans antialiased selection:bg-slate-200">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Simplified Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
            Flights
          </h1>
        </div>

        {/* Minimalist Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-medium tracking-wide text-xs uppercase">
                  <th className="px-6 py-3.5 w-20">ID</th>
                  <th className="px-6 py-3.5 min-w-[240px]">Route Path</th>
                  <th className="px-6 py-3.5 w-40">Type</th>
                  <th className="px-6 py-3.5 text-right w-40">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {contents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-slate-400 font-normal tracking-wide">
                      Empty
                    </td>
                  </tr>
                ) : (
                  contents.map((content) => (
                    <tr 
                      key={content.id} 
                      className="hover:bg-slate-50/40 transition-colors group"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {content.id}
                      </td>
                      
                      {/* Route Path */}
                      <td className="px-6 py-4 font-mono text-xs text-slate-900 font-medium break-all tracking-tight">
                        {content.slug}
                      </td>
                      
                      {/* API Type Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center text-xs text-slate-500 capitalize tracking-tight">
                          {content.apiType}
                        </span>
                      </td>
                      
                      {/* Text-Based Actions */}
                     <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium tracking-tight">
  <div className="flex items-center justify-end gap-3">
    <Link 
      href={`/admin/flight-content/view/${content.slug}`}
      className="bg-[#197696] hover:bg-[#135b75] text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors"
    >
      View
    </Link>
    <Link 
      href={`/admin/flight-content/edit/${content.slug}`}
      className="bg-[#F6931F] hover:bg-[#d67b13] text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors"
    >
      Edit
    </Link>
  </div>
</td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
