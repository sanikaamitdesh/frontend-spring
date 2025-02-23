import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/home.css"; // ✅ Ensure CSS is imported

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // ✅ Check if logged in

  return (
    <div className="home-container">
      <Sidebar /> {/* ✅ Sidebar properly placed */}
      <Navbar />

      <div className="main-content">
        <div className="home-content">
          <h1>Welcome!</h1>

          {/* ✅ Show "Sign Up" message & button only if NOT logged in */}
          {!isAuthenticated && (
            <>
              <p>Sign up to continue.</p>
              <button onClick={() => navigate("/register")} className="signup-btn">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
