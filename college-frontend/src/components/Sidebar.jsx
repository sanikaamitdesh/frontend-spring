// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Sidebar.css";
// import logo from "../Img/pic.jpg" // Add your logo image

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <img src={logo} alt="SPPU Logo" className="logo" />
           
//             <ul>
//                 <li><Link to="/student-dashboard">Dashboard</Link></li>
//                 <li><Link to="/Messages">Messages</Link></li>
//                 <li><Link to="/notifications">Notifications</Link></li>
//                 <li><Link to="/logout">Log Out</Link></li>
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../Img/pic.jpg" // Add your logo image

const Sidebar = () => {
    const navigate = useNavigate();
    const isRegistered = localStorage.getItem("rollNo");
    const handleLogout = () => {
        // Clear authentication-related data if any
        localStorage.removeItem("token");
        localStorage.removeItem("rollNo");
        localStorage.removeItem("rollNo"); // If using JWT authentication
        sessionStorage.clear(); // If using session storage

        // Redirect to the home page
        navigate("/");
    };

    return (
        <div className="sidebar">
            <img src={logo} alt="Logo" className="logo" />
            <ul>
                <li><Link to="/student-dashboard">Dashboard</Link></li>
                <li><Link to="/Messages">Messages</Link></li>
                <li><Link to="/notifications">Notifications</Link></li>

                {!isRegistered && (
                    <li><Link to="/CreateAccount">Create Account</Link></li>
                )}
                {/* Use a button instead of Link for Logout */}
                <li><button className="logout-btn" onClick={handleLogout}>Log Out</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
