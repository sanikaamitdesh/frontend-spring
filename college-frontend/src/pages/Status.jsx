import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../styles/Status.css";

const Status = () => {
    const [requests, setRequests] = useState([
        { id: 101, document: "Bonafide Certificate", date: "18-Feb-2025", status: "pending" },
        { id: 102, document: "Marksheet", date: "15-Feb-2025", status: "in progress" },
    ]);

    return (
        <div className="status-page">
            <Sidebar /> {/* Sidebar Added */}
            
            <div className="status-container">
                <h2>Current Requests Status</h2>
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Document Type</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td>{req.id}</td>
                                <td>{req.document}</td>
                                <td>{req.date}</td>
                                <td>
                                    <span className={`status ${req.status}`}>
                                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    {req.status === "pending" ? (
                                        <button className="cancel-btn">Cancel</button>
                                    ) : (
                                        <button className="track-btn">Track</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Status;
