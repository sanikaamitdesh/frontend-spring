
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
                console.error("Error fetching request status try again:", error);
            });
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return { text: "⏳ Pending", color: "orange" };
            case 2:
                return { text: "✅ Approved", color: "green" };
            case 3:
                return { text: "❌ Rejected", color: "red" };
            default:
                return { text: "⏳ Pending", color: "orange" };
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
                                <th>Document Type</th>
                                <th>Status</th>
                                <th>Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => {
                                const statusInfo = getStatusText(req.status);
                                return (
                                    <tr key={req.id}>
                                        <td>{req.documentType || "N/A"}</td>
                                        <td style={{ color: statusInfo.color, fontWeight: "bold" }}>
                                            {statusInfo.text}
                                        </td>
                                        <td>
                                            {req.documentName ? (
                                                <a
                                                    href={`http://localhost:8080/document-requests/${req.id}/download`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Download {req.documentName}
                                                </a>
                                            ) : (
                                                "Not Uploaded"
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StatusPage;

