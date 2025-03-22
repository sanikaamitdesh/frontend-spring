import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [student, setStudent] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState("");
    const [reason, setReason] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userName"); // Get email/username of logged-in user

        if (!userEmail) {
            console.error("User not logged in!");
            return;
        }

        // Fetch student data based on logged-in email
        axios.get(`http://localhost:8080/students/email/${userEmail}`)
            .then(response => {
                if (response.data) {
                    setStudent(response.data); // Set student details if found
                    localStorage.setItem("rollNo", response.data.rollNo); // Store rollNo for future requests
                }
            })
            .catch(error => {
                console.error("No student data found, profile incomplete:", error);
                setStudent(null); // Ensure profile incomplete is displayed
            });
    }, []);

    // const handleRequestSubmit = () => {
    //     if (!selectedDocument || !reason) {
    //         alert("Please select a document and enter a reason before submitting request.");
    //         return;
    //     }
    
    //     const prnNo = student ? student.prnNo : localStorage.getItem("prnNo"); // Get PRN from local storage
    //     if (!prnNo) {
    //         alert("PRN not found. Please complete your profile.");
    //         return;
    //     }
    
    //     axios.post("http://localhost:8080/document-requests/create", null, {
    //         params: {
    //             prnNo: prnNo,
    //             documentType: selectedDocument,
    //             reason: reason
    //         }
    //     })
    //     .then(response => {
    //         alert(`Request submitted for ${selectedDocument} with reason: ${reason}`);
    //         setSelectedDocument("");
    //         setReason("");
    //     })
    //     .catch(error => {
    //         console.error("Error submitting request:", error);
    //         alert("Failed to submit request. Please try again.");
    //     });
    // };
    const handleRequestSubmit = () => {
        if (!selectedDocument || !reason) {
            alert("Please select a document and enter a reason before submitting request.");
            return;
        }
    
        const prnNo = student ? student.prnNo : localStorage.getItem("prnNo"); // Get PRN from local storage
        if (!prnNo) {
            alert("PRN not found. Please complete your profile.");
            return;
        }
    
        axios.post("http://localhost:8080/document-requests/create", null, {
            params: {
                prnNo: prnNo,
                documentType: selectedDocument,
                reason: reason,
                status: 1,  // Default to "Pending"
                document: ""    // Initially empty
            }
        })
        .then(response => {
            alert(`Request submitted for ${selectedDocument} with reason: ${reason}`);
            setSelectedDocument("");
            setReason("");
        })
        .catch(error => {
            console.error("Error submitting request:", error);
            alert("Failed to submit request. Please try again.");
        });
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
                                    <strong>Name:</strong> {student ? student.name : "Loading..."} <br />
                                </td>
                                <td>
                                    <strong>PRN Number:</strong> {student ? student.prnNo : "Loading..."}<br />
                                    <strong>Year:</strong> {student ? student.year : "Loading..."}<br />
                                    <strong>Branch:</strong> {student ? student.branch : "Loading..."}<br />
                                    <strong>Roll No.:</strong> {student ? student.rollNo : "Loading..."}
                                </td>
                                <td className="status">
                                    {student ? (
                                        "Profile complete."
                                    ) : (
                                        <>
                                            <span className="profile-incomplete">Profile Incomplete</span>
                                            <button className="btn create-account-btn" onClick={() => navigate("/CreateAccount")}>
                                                Create Account
                                            </button>
                                        </>
                                    )}
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
