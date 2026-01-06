import ProductDetails from "../../../components/Product/ProductDetails";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

export default function ProductPage({ params }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProductDetails productId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
