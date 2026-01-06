import CartPage from "../../components/Cart/CartPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
    </div>
  );
}
