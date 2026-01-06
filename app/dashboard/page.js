import DashboardPage from "../../components/Dashboard/DashboardPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
}
