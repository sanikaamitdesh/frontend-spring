import React, { useState } from "react";
import { FaCheck, FaTimes, FaFilter, FaSearch, FaArrowLeft } from "react-icons/fa";
import "../Admin_Styles/ManageRequest.css";
import { useNavigate } from "react-router-dom"; // For navigation

const ManageRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", prn: "12345", document: "Bonafide Certificate", date: "2025-03-19", status: "Pending" },
    { id: 2, name: "Jane Smith", prn: "67890", document: "Transcript", date: "2025-03-18", status: "Pending" },
    { id: 3, name: "Emily Johnson", prn: "11223", document: "Leaving Certificate", date: "2025-03-17", status: "Approved" },
    { id: 4, name: "Michael Brown", prn: "44556", document: "Fee Receipt", date: "2025-03-16", status: "Rejected" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this request?")) {
      setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Approved" } : req)));
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req)));
    }
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (request.name.toLowerCase().includes(searchQuery.toLowerCase()) || request.prn.includes(searchQuery)) &&
      (statusFilter === "All" || request.status === statusFilter)
    );
  });

  return (
    <div className="manage-requests">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <h2>📄 Manage Student Requests</h2>

      <div className="search-filter-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search by name or PRN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>PRN Number</th>
            <th>Requested Document</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.prn}</td>
              <td>{request.document}</td>
              <td>{request.date}</td>
              <td className={request.status.toLowerCase()}>{request.status}</td>
              <td className="action-buttons">
                {request.status === "Pending" && (
                  <>
                    <button className="approve-btn" onClick={() => handleApprove(request.id)}>
                      <FaCheck /> Approve
                    </button>
                    <button className="reject-btn" onClick={() => handleReject(request.id)}>
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
