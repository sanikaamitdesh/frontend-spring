import React from "react";
import { FaBell, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  
import "./Navbar.css"; 
import logo from "../Img/pic.jpg"; 

const Navbar = () => {
  const navigate = useNavigate();  
  const userName = localStorage.getItem("userName") || "User";  // ✅ Get logged-in name

  return (
    <nav className="navbar">
      {/* ✅ Left Side - Logo and Title */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <h1 className="navbar-title">Pune Institute of Computer Technology</h1>
      </div>

      {/* ✅ Right Side - Icons and User Name */}
      <div className="nav-right">
        <div className="notifications">
          <FaBell className="icon" />
          <span className="badge">3</span> 
        </div>

        <div className="messages" onClick={() => navigate("/messages")}>  
          <FaEnvelope className="icon" />
          <span className="badge">5</span>
        </div>

        {/* ✅ Display User Name instead of Profile */}
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">{userName}</span>  {/* ✅ User Name */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
