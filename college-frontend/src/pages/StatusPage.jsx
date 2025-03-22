// src/pages/StatusPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/StatusPage.css";

const StatusPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const prnNo = localStorage.getItem("prnNo");

        if (!prnNo) {
            alert("PRN not found. Please complete your profile first.");
            return;
        }

        axios.get(`http://localhost:8080/document-requests/${prnNo}`)
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error("Error fetching request status:", error);
            });
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Pending";
            case 2:
                return "Approved";
            case 3:
                return "Rejected";
            default:
                return "Pending";
        }
    };
    

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h2>Request Status</h2>
                {requests.length === 0 ? (
                    <p>No requests found.</p>
                ) : (
                    <table className="status-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>PRN</th>
                                <th>Status</th>
                                <th>Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.student?.name || "N/A"}</td>
                                    <td>{req.student?.prnNo || "N/A"}</td>
                                    <td>{getStatusText(req.status)}</td>
                                    <td>
                                        {req.document ? (
                                            <a
                                                href={req.document}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Document
                                            </a>
                                        ) : (
                                            "Not Uploaded"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StatusPage;
