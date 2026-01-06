import SearchPage from "../../components/Search/SearchPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Search() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <SearchPage />
      </main>
      <Footer />
    </div>
  );
}
