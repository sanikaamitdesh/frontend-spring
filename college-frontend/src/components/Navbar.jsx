// import React from "react";
// import { FaBell, FaUserCircle, FaEnvelope } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";  // Import navigation hook
// import "../styles/Navbar.css"; 

// const Navbar = () => {
//   const navigate = useNavigate();  // Create navigation function

//   return (
//     <nav className="navbar">
//       <div className="nav-right">
//         {/* Notifications */}
//         <div className="notifications">
//           <FaBell className="icon" />
//           <span className="badge">3</span> 
//         </div>

//         {/* Messages */}
//         <div className="messages" onClick={() => navigate("/Messages")}>  {/* Navigate on Click */}
//           <FaEnvelope className="icon" />
//           <span className="badge">5</span>
//         </div>

//         {/* Profile */}
//         <div className="profile">
//           <FaUserCircle className="profile-icon" />
//           <span className="profile-name"> Profile </span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { FaBell, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  
import "../styles/Navbar.css"; 
import logo from "../Img/pic.jpg"; // Ensure the correct path

const Navbar = () => {
  const navigate = useNavigate();  

  return (
    <nav className="navbar">
      {/* Left Side - Logo and Title */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <h1 className="navbar-title">Pune Institute of Computer Technology</h1>
      </div>

      {/* Right Side - Icons */}
      <div className="nav-right">
        <div className="notifications">
          <FaBell className="icon" />
          <span className="badge">3</span> 
        </div>

        <div className="messages" onClick={() => navigate("/Messages")}>  
          <FaEnvelope className="icon" />
          <span className="badge">5</span>
        </div>

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span className="profile-name"> Profile </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
