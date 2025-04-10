// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/login.css"; 
// // import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Sidebar from "../components/Sidebar";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post("http://localhost:8080/auth/login", 
//             { identifier: formData.email, password: formData.password }, 
//             { headers: { "Content-Type": "application/json" } }
//         );

//         if (response.data) {
//             localStorage.setItem("isAuthenticated", "true");
//             localStorage.setItem("userRole", "student");
//             localStorage.setItem("userName", formData.email); // ✅ Store only email
//         }
//         if (Array.isArray(response.data)) {
//           localStorage.setItem("isAuthenticated", "true");
//           localStorage.setItem("userRole", "admin");
//           localStorage.setItem("userName", "Admin"); // ✅ Store Admin name
//           navigate("/admin-dashboard", { state: { students: response.data } });
//         } else {
//           localStorage.setItem("isAuthenticated", "true");
//           localStorage.setItem("userRole", "student");
//           localStorage.setItem("userName", formData.email); // ✅ Store Student name
//           navigate("/student-dashboard");
//         }
//         // navigate("/student-dashboard");
//     } catch (error) {
//         console.error(error.response?.data || "Unknown Error");
//         alert("❌ Invalid Credentials!");
//     }
// };

//   return (
//     <div className="main-content">
//       <Sidebar />
//       {/* <Navbar /> */}
//       <div className="login-container">
//         <div className="login-box">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="email" placeholder="Email/Username" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit">Login</button>
//             <button type="button" onClick={() => navigate("/register")}>Not registered? Sign Up</button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Footer from "../components/Footer";
import LoginModal from "../pages/LoginModel.jsx";

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="login-page">
        <button className="open-login-btn" onClick={() => setShowModal(true)}>
          Student Login
        </button>

        {showModal && (
          <LoginModal
            userType="student"
            onClose={() => setShowModal(false)}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Login;
