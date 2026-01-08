import LoginPage from "../../components/Auth/LoginPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <LoginPage />
      </main>
      <Footer />
    </div>
  );
}
