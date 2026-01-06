import CheckoutPage from "../../components/Checkout/CheckoutPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Checkout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  );
}
