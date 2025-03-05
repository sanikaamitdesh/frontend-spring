import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [selectedDocument, setSelectedDocument] = useState("");
    const [reason, setReason] = useState("");

    const handleRequestSubmit = () => {
        if (!selectedDocument || !reason) {
            alert("Please select a document and enter a reason before submitting request.");
            return;
        }
        alert(`Request submitted for ${selectedDocument} with reason: ${reason}`);
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h1>Student Profile System</h1>
                <div className="dashboard">
                    <table>
                        <thead>
                            <tr>
                                <th>Personal Information</th>
                                <th>Course Details</th>
                                <th>Profile Status</th>
                                <th>Request Document</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Name:</strong> Pranali Gokul Lokhande<br />
                                   
                                </td>
                                <td>
                                    <strong>PRN Number:</strong> 72224329E<br />
                                    <strong>Year:</strong> SE<br />
                                    <strong>Branch:</strong> ENTC<br />
                                    <strong>Roll No.:</strong> 12345
                                </td>
                                <td className="status">
                                    Profile complete.<br />
                                    {/* <button className="update-btn">Update Year</button>
                                    <button className="update-btn">Update Roll No.</button> */}
                                </td>
                                <td>
                                    <select className="dropdown" value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
                                        <option value="">Select Document</option>
                                        <option value="Bonafide Certificate">Bonafide Certificate</option>
                                        <option value="LOC">LOC</option>
                                        <option value="Exam Form">Exam Form</option>
                                        <option value="Scholarship">Scholarship</option>
                                    </select>
                                    <textarea
                                        className="reason-input"
                                        placeholder="Enter reason for request..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                    <button className="btn request-btn" onClick={handleRequestSubmit}>Submit Request</button>
                                </td>
                                <td>
                                   
                                    <Link to="/Status" className="btn">Check Status</Link>
                                    <Link to="/History" className="btn">View History</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
