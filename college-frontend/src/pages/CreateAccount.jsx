
import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios"; 
import "../styles/CreateAccount.css";

const StudentForm = () => {
  const [step, setStep] = useState(1); // 1=verify, 2=otp, 3=form
  const [student, setStudent] = useState({
    name: "",
    email: "",
    year: "",
    rollNo: "",
    prnNo: "",
    branch: ""
  });
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Verify PRN + Email
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/verify/send-otp`, null, {
        params: {
          prnNo: student.prnNo,
          email: student.email
        }
      });

      if (res.data.message) {
        alert(res.data.message); //OTP sent successfully
        setStep(2); 
      } else if (res.data.error) {
        alert(res.data.error); //  PRN and email do not match
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert(error.response?.data?.error || "Verification failed");
    }
  };

  //Verify OTP
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/verify/verify-otp`, null, {
        params: {
          email: student.email,
          otp: otp
        }
      });

      if (res.data.message) {
        alert(res.data.message);
        setStep(3); 
      } else if (res.data.error) {
        alert(res.data.error); // Invalid or expired OTP
      }
    } catch (error) {
      console.error("OTP error:", error);
      alert(error.response?.data?.error || "OTP verification failed");
    }
  };

  //Create Account
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.email || !student.year || !student.rollNo || !student.prnNo || !student.branch) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/students/create", student);
      setSubmitted(true);
      localStorage.setItem("userEmail", student.email);
      localStorage.setItem("rollNo", student.rollNo);
      localStorage.setItem("prnNo", student.prnNo);
      alert("Student Registered Successfully!");
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to create student account. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <div className="form-container">
          <h2>Student Registration</h2>

          {/*Verify PRN + Email */}
          {step === 1 && (
            <form onSubmit={handleVerify}>
              <label>PRN No:</label>
              <input type="text" name="prnNo" value={student.prnNo} onChange={handleChange} required />

              <label>Official Email:</label>
              <input type="email" name="email" value={student.email} onChange={handleChange} required />

              <button type="submit">Verify</button>
            </form>
          )}

          {/* Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpVerify}>
              <label>Enter OTP sent to your Email:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit">Verify OTP</button>
            </form>
          )}

          {/*Registration Form */}
          {step === 3 && !submitted && (
            <form onSubmit={handleSubmit}>
              <label>Full Name:</label>
              <input type="text" name="name" value={student.name} onChange={handleChange} required />

              <label>Email:</label>
              <input type="email" name="email" value={student.email} readOnly />

              <label>Year:</label>
              <select name="year" value={student.year} onChange={handleChange} required>
                <option value="">Select Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>

              <label>Branch:</label>
              <select name="branch" value={student.branch} onChange={handleChange} required>
                <option value="">Select Branch</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="ENTC">ENTC</option>
                <option value="AIDS">AIDS</option>
              </select>

              <label>Roll No:</label>
              <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} required />

              <label>PRN No:</label>
              <input type="text" name="prnNo" value={student.prnNo} readOnly />

              <button type="submit">Create Account</button>
            </form>
          )}

  
          {submitted && (
            <div className="success-message">
              <h3>Student Registered Successfully!</h3>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
              <p><strong>PRN No:</strong> {student.prnNo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
