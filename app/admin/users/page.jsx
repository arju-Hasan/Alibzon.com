import AdminNavbar from "@/components/Admin/AdminNavbar";
import UserManage from "@/components/Admin/Usermajment";

export default function User() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>
        <UserManage />
      </main>
    </div>
  );
}
