import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./home.css"; // Import CSS

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome!</h1>
        <p>Sign up to continue.</p>

        {/* ✅ Clicking this opens the Register Page */}
        <button onClick={() => navigate("/register")} className="signup-btn">
          Sign Up
        </button>
      </div>
      <Footer />
    </div>
  );
}
