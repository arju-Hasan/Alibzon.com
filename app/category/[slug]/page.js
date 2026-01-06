import CategoryPage from "../../../components/Category/CategoryPage";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

export default function Category({ params }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CategoryPage category={params.slug} />
      </main>
      <Footer />
    </div>
  );
}
