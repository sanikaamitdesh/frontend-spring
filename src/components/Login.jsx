import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"; // Import CSS

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", 
        { 
          identifier: formData.email,  // ✅ Change "email" to "identifier"
          password: formData.password
        }, 
        {
          headers: { "Content-Type": "application/json" } // ✅ Send JSON data
        }
      );
  
      console.log(response.data); // ✅ Debugging: See response from backend
  
      if (Array.isArray(response.data)) {
        navigate("/admin-dashboard", { state: { students: response.data } });
      } else {
        alert("✅ Student Login Successful!");
      }
    } catch (error) {
      console.error(error.response?.data || "Unknown Error"); // ✅ Debugging: Log error response
      alert("❌ Invalid Credentials!");
    }
  };
  
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email/Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
          <button type="submit" onClick={() => navigate("/register")} >not registered? sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
