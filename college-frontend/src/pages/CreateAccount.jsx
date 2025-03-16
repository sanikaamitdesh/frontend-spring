import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios"; 
import "../styles/CreateAccount.css";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "", // ✅ Add email field
    year: "",
    rollNo: "",
    prnNo: "",
    branch: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!student.name || !student.email || !student.year || !student.rollNo || !student.prnNo || !student.branch) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/students/create", student);
      console.log("Response:", response.data);
      setSubmitted(true);

      // ✅ Store email and rollNo in localStorage
      localStorage.setItem("userEmail", student.email);
      localStorage.setItem("rollNo", student.rollNo);

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
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <label>Full Name:</label>
              <input type="text" name="name" value={student.name} onChange={handleChange} required />

              <label>Email:</label> {/* ✅ New Email Field */}
              <input type="email" name="email" value={student.email} onChange={handleChange} required />

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
              <input type="text" name="prnNo" value={student.prnNo} onChange={handleChange} required />

              <button type="submit">Create Account</button>
            </form>
          ) : (
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
