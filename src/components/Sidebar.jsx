import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserGraduate, FaSignInAlt, FaUserPlus, FaUserShield, FaFileAlt } from "react-icons/fa";
import "./Sidebar.css";

import logo from "../Img/pic.jpg"

const Sidebar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
      
      </div>
      
      <ul className="menu">
        <li><Link to="/"><FaHome /><span>  Home</span></Link></li>

        {/* Student Section */}
        <li className="submenu disabled">
          <FaUserGraduate /><span>Student</span>
        </li>
        <li><Link to="/register"><FaUserPlus /><span> Sign Up</span></Link></li>
        <li><Link to="/login"><FaSignInAlt /><span> Log In</span></Link></li>

       
        {/* Admin Section */}
        <li className="submenu disabled">
          <FaUserShield /><span> Admin</span>
        </li>
        <li><Link to="/login"><FaSignInAlt /><span>Log In</span></Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
