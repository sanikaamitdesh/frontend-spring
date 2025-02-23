import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaFileAlt, FaClock, FaHistory, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");  // ✅ Remove authentication flag
    localStorage.removeItem("userRole");         // ✅ Remove user role
    localStorage.removeItem("userName");         // ✅ Remove user name
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <div className="sidebar">
      {/* Sidebar Menu */}
      <ul className="menu">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/request-form"><FaFileAlt /> Request Form</Link></li>
        <li><Link to="/status"><FaClock /> Status</Link></li>
        <li><Link to="/history"><FaHistory /> History</Link></li>
        <li><Link to="/messages"><FaEnvelope /> Messages</Link></li>
        
        {/* ✅ Logout Button */}
        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
