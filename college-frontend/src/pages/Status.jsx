// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar"; // Import Sidebar
// import "../styles/Status.css";

// const Status = () => {
//     const [requests, setRequests] = useState([
//         { id: 101, document: "Bonafide Certificate", date: "18-Feb-2025", status: "pending" },
//         { id: 102, document: "Marksheet", date: "15-Feb-2025", status: "in progress" },
//     ]);

//     return (
//         <div className="status-page">
//             <Sidebar /> {/* Sidebar Added */}
            
//             <div className="status-container">
//                 <h2>Current Requests Status</h2>
//                 <table className="status-table">
//                     <thead>
//                         <tr>
//                             <th>Request ID</th>
//                             <th>Document Type</th>
//                             <th>Date</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {requests.map((req) => (
//                             <tr key={req.id}>
//                                 <td>{req.id}</td>
//                                 <td>{req.document}</td>
//                                 <td>{req.date}</td>
//                                 <td>
//                                     <span className={`status ${req.status}`}>
//                                         {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     {req.status === "pending" ? (
//                                         <button className="cancel-btn">Cancel</button>
//                                     ) : (
//                                         <button className="track-btn">Track</button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Status;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Status.css";

const API_URL = "http://localhost:8080/document-requests"; 

const Status = () => {
    const [requests, setRequests] = useState([]);
    const prnNo = localStorage.getItem("prnNo"); // Ensure PRN is retrieved properly

    useEffect(() => {
        if (!prnNo) {
            console.error("PRN No is missing!");
            return;
        }

        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/${prnNo}`);
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching request statuses:", error);
            }
        };
        fetchRequests();
    }, [prnNo]);

    return (
        <div className="status-page">
            <Sidebar />
            <div className="status-container">
                <h2>Current Requests Status</h2>
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Document Type</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td>{req.id}</td>
                                <td>{req.documentType}</td>
                                <td>{req.reason}</td>
                                <td>
                                    <span className={`status ${req.status ? "approved" : "pending"}`}>
                                        {req.statusString}
                                    </span>
                                </td>
                                <td>
                                    {req.status ? (
                                        <button className="track-btn">Track</button>
                                    ) : (
                                        <button className="cancel-btn">Cancel</button>
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
