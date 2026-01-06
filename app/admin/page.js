import AdminDashboard from "../../components/Admin/AdminDashboard";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminCheck from "../../components/Admin/AdminCheck";

export default function Admin() {
  return (
    <AdminCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <main>
          <AdminDashboard />
        </main>
      </div>
    </AdminCheck>
  );
}
