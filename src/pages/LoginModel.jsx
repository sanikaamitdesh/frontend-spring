

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginModel.css";
import { IoClose, IoArrowBack } from "react-icons/io5";

const LoginModal = ({ userType, onClose ,onSignupClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          identifier: formData.identifier,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (Array.isArray(response.data)) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin");
        navigate("/admin-dashboard", { state: { students: response.data } });
      } else {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "student");
        localStorage.setItem("userName", formData.identifier);
        navigate("/student-dashboard");
      }

      onClose();
    } catch (error) {
      alert("❌ Invalid Credentials!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {/* <IoArrowBack className="back-arrow" /> */}
          <IoClose className="close-icon" onClick={onClose} />
        </div>
        <h2>{userType === "admin" ? "Admin Login" : "Student Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Username or Email"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => {
                onClose();     // close login modal
                onSignupClick(); // open signup modal
            }} style={{ color: "#007BFF", cursor: "pointer", fontWeight: "bold" }}>
                Sign Up
            </span>
        </p>

      </div>
    </div>
  );
};

export default LoginModal;
