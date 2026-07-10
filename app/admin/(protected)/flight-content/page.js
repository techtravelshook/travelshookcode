import Link from "next/link";
import { Eye, Edit3, Trash2, Plus, FileText, Search } from "lucide-react"; // Beautiful visual icons

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
    <div className="w-full min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#197696]/10 to-[#197696]/5 text-[#197696]">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                Flight Content
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Manage and structure copy for custom flight routes
              </p>
            </div>
          </div>
        </div>

        {/* Table Container Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                  <th className="px-6 py-4 w-20">ID</th>
                  <th className="px-6 py-4 min-w-[240px]">Slug / Route Path</th>
                  <th className="px-6 py-4 w-40">API Type</th>
                  <th className="px-6 py-4 text-center w-52">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {contents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                      No flight content found. Create one to get started!
                    </td>
                  </tr>
                ) : (
                  contents.map((content) => (
                    <tr 
                      key={content.id} 
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* ID Cell */}
                      <td className="px-6 py-4 font-mono font-medium text-slate-400">
                        #{content.id}
                      </td>

                      {/* Slug Cell */}
                      <td className="px-6 py-4 font-mono text-xs text-[#197696] font-semibold tracking-tight break-all">
                        {content.slug}
                      </td>

                      {/* API Type Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#197696]/10 text-[#197696] border border-[#197696]/5 capitalize">
                          {content.apiType}
                        </span>
                      </td>

                      {/* Actions Cluster */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/flight-content/view/${content.slug}`}
                            title="View Content"
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/flight-content/edit/${content.slug}`}
                            title="Edit Content"
                            className="p-2 text-slate-400 hover:text-[#F6931F] hover:bg-[#F6931F]/10 rounded-lg transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
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
