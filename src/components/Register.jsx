import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/register.css"; // Import CSS

const Register = () => {
  const navigate = useNavigate();
  
  // State Variables
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState(""); // Stores OTP entered by user
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP was sent
  const [loading, setLoading] = useState(false); // Loading state

  // Handles input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles OTP input
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // **Step 1: Send OTP when user enters email**
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", { email: formData.email.trim()});
      // console.log("Response:", response.data); // ✅ Debugging
      alert(response.data); // ✅ Debugging: Show OTP Sent Message
      setOtpSent(true); // ✅ Show OTP input field
    } catch (error) {
      alert("❌ Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // **Step 2: Verify OTP and Register User**
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/verify-otp", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp: otp,
      });

      alert("✅ Student Registered Successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("❌ OTP Verification Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Student Signup</h2>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            disabled={otpSent} // Disable fields after OTP is sent
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            disabled={otpSent}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            disabled={otpSent}
          />

          {/* Show "Send OTP" Button before OTP is sent */}
          {!otpSent && (
            <button type="submit" className="send-otp-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP Input Field (Appears after OTP is sent) */}
          {otpSent && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleOtpChange}
                required
              />
              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP & Register"}
              </button>
            </>
          )}
        </form>

        {/* Navigation Buttons */}
        <div className="buttons-container">
          <button onClick={() => navigate("/login")} className="signin-btn">
            Already registered? Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
