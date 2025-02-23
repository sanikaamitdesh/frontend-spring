import React, { useState } from "react";
import "../styles/History.css";  

const History = () => {
    const [history, setHistory] = useState([
        { id: 201, document: "Bonafide Certificate", date: "10-Feb-2025", status: "approved" },
        { id: 202, document: "Marksheet", date: "05-Feb-2025", status: "rejected" },
        { id: 203, document: "Leaving Certificate", date: "02-Feb-2025", status: "completed" },
    ]);

    return (
        <div className="history-container">
            <h2>Request History</h2>
            <table className="history-table">
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
                    {history.map((req) => (
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
                                {req.status === "approved" ? (
                                    <button className="download-btn">Download</button>
                                ) : req.status === "rejected" ? (
                                    <button className="reapply-btn">Reapply</button>
                                ) : (
                                    <span>✔ Completed</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
