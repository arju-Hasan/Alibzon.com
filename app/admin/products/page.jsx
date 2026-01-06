import AdminProductsPage from "../../../components/Admin/AdminProductsPage";
import AdminNavbar from "../../../components/Admin/AdminNavbar";

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>
        <AdminProductsPage />
      </main>
    </div>
  );
}
