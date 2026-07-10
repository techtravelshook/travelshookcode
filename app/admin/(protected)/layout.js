
import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/sidebar/sidebar";
import { getAdmin } from "@/lib/getAdmin";

export const metadata = {
  title: "TravelsHook Admin",
};

export default async function AdminLayout({ children }) {
  const admin = await getAdmin();
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar admin={admin}/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar  admin={admin}/>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}