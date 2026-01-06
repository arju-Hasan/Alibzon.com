import AdminOrdersPage from "../../../components/Admin/AdminOrdersPage";
import AdminNavbar from "../../../components/Admin/AdminNavbar";

export default function AdminOrders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>
        <AdminOrdersPage />
      </main>
    </div>
  );
}
