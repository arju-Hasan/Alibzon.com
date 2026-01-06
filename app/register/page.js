import RegisterPage from "../../components/Auth/RegisterPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <RegisterPage />
      </main>
      <Footer />
    </div>
  );
}
