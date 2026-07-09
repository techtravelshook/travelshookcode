
import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/sidebar/sidebar";

export const metadata = {
  title: "TravelsHook Admin",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}