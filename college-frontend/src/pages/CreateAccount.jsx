 import React, { useState } from "react";
// import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar component

import Sidebar from "../components/Sidebar.jsx";
import "../styles/CreateAccount.css";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    year: "",
    rollNo: "",
    prnNo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.name && student.year && student.rollNo && student.prnNo) {
      setSubmitted(true);
    } else {
      alert("Please fill all fields");
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

              <label>Year:</label>
              <select name="year" value={student.year} onChange={handleChange} required>
                <option value="">Select Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
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
              <p><strong>Year:</strong> {student.year}</p>
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
