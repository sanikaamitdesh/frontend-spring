import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Admin_Styles/AdminSidebar.css";
import { FaHome, FaFileAlt, FaUser, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav>
        <Link to="/admin-dashboard" className="menu-item">
          <FaHome className="icon" /> {isOpen && "Dashboard"}
        </Link>
        
        <Link to="/manage-requests" className="menu-item">
          <FaFileAlt className="icon" /> {isOpen && "Manage Requests"}
        </Link>

        <Link to="/user-management" className="menu-item">
          <FaUser className="icon" /> {isOpen && "User Management"}
        </Link>

        <Link to="/documents" className="menu-item">
          <FaFileAlt className="icon" /> {isOpen && "Documents"}
        </Link>

        <Link to="/notifications" className="menu-item">
          <FaBell className="icon" /> {isOpen && "Notifications"}
        </Link>

        <Link to="/settings" className="menu-item">
          <FaCog className="icon" /> {isOpen && "Settings"}
        </Link>

        <Link to="/logout" className="menu-item logout">
          <FaSignOutAlt className="icon" /> {isOpen && "Logout"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
