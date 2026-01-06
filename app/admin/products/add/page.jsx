import AddProductPage from "../../../../components/Admin/AddProductPage";
import AdminNavbar from "../../../../components/Admin/AdminNavbar";

export default function AddProduct() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>
        <AddProductPage />
      </main>
    </div>
  );
}
