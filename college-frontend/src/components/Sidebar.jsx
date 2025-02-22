// import React from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaFileAlt, FaClock, FaHistory, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
// import "../styles/Sidebar.css";  

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2 className="logo">College Docs</h2>
//       <ul className="menu">
//         <li><Link to="/"><FaHome /> Dashboard</Link></li>
//         <li><Link to="/request-form"><FaFileAlt /> Request Form</Link></li>
//         <li><Link to="/status"><FaClock /> Status</Link></li>
//         <li><Link to="/history"><FaHistory /> History</Link></li>
//         <li><Link to="/messages"><FaEnvelope /> Messages</Link></li>
//         <li className="logout"><FaSignOutAlt /> Logout</li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaClock, FaHistory, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Menu (Without Logo) */}
      <ul className="menu">
        <li><Link to="/"><FaHome />Home</Link></li>
        <li><Link to="/request-form"><FaFileAlt /> Request Form</Link></li>
        <li><Link to="/status"><FaClock /> Status</Link></li>
        <li><Link to="/history"><FaHistory /> History</Link></li>
        <li><Link to="/messages"><FaEnvelope /> Messages</Link></li>
        <li className="logout"><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;


