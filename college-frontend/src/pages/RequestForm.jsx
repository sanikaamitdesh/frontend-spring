// import React from "react";

// const RequestForm = () => {
//   return <h1>Request Form</h1>;
// };

// export default RequestForm;
import React, { useState } from "react";
import "../styles/RequestForm.css"; 
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    branch: "",
    prn: "",
    rollNo: "",
    documentType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Request Submitted Successfully!");
    // Add API call logic here if needed
  };

  return (
    <div className="request-form-container">
      <Sidebar />
      <Navbar />
      <h2>Request a Document</h2>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Year:</label>
          <select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
            <option value="Final">Final</option>
          </select>
        </div>

        <div className="form-group">
          <label>Branch:</label>
          <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>PRN No:</label>
          <input type="text" name="prn" value={formData.prn} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Roll No:</label>
          <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Document Type:</label>
          <select name="documentType" value={formData.documentType} onChange={handleChange} required>
            <option value="">Select Document</option>
            <option value="Bonafide Certificate">Bonafide Certificate</option>
            <option value="Marksheet">Marksheet</option>
            <option value="Leaving Certificate">Leaving Certificate</option>
            <option value="LOR">Letter of Recommendation</option>
          </select>
        </div>

        <div className="form-group">
          <label>Message (Reason for Request):</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="request-button">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForm;
