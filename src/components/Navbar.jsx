import { useState } from "react";
import "./Navbar.css";
// import logo from "../Img/pic.jpg";
import LoginModal from "../pages/LoginModel";
import SignupModal from "../pages/SignupModel";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("");

  const openLogin = (type) => {
    setUserType(type);
    setShowLogin(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          {/* <span className="brand">DocuGen</span> */}
        </div>

        <div className="navbar-right">
          <ul className="navbar-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>

          <div className="navbar-buttons">
            <button className="btn" onClick={() => openLogin("student")}>Student Login</button>
            <button className="btn" onClick={() => openLogin("admin")}>Admin Login</button>
            <button className="btn primary" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </div>
      </nav>

            {showLogin && (
        <LoginModal
          userType={userType}
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal onClose={() => setShowSignup(false)} />
      )}
    </>
  );
}
