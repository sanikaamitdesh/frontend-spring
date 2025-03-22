import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaFilter, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Admin_Styles/ManageRequest.css";

const ManageRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Convert status int to string
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  // ✅ Fetch requests from backend
  useEffect(() => {
    fetch("http://localhost:8080/document-requests")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Requests:", data);
        setRequests(data);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  // ✅ Approve request
  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this request?")) {
      fetch(`http://localhost:8080/document-requests/${id}/approve`, { method: "PUT" })
        .then((response) => response.json())
        .then(() => {
          setRequests((prevRequests) =>
            prevRequests.map((req) =>
              req.id === id ? { ...req, status: 2 } : req
            )
          );
        })
        .catch((error) => console.error("Error approving request:", error));
    }
  };

  // ✅ Reject request
  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      fetch(`http://localhost:8080/document-requests/${id}/reject`, { method: "PUT" })
        .then((response) => response.json())
        .then(() => {
          setRequests((prevRequests) =>
            prevRequests.map((req) =>
              req.id === id ? { ...req, status: 3 } : req
            )
          );
        })
        .catch((error) => console.error("Error rejecting request:", error));
    }
  };

  // ✅ Filtered request list based on search and status
  const filteredRequests = requests.filter((request) => {
    const statusText = getStatusText(request.status);
    return (
      (request.student?.prnNo?.includes(searchQuery) ||
        request.documentType?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "All" || statusText === statusFilter)
    );
  });

  return (
    <div className="manage-requests">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <h2>📄 Manage Student Requests</h2>

      <div className="search-filter-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by PRN or Document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
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
            <th>PRN Number</th>
            <th>Requested Document</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.student?.prnNo}</td>
              <td>{request.documentType}</td>
              <td>{request.reason}</td>
              <td className={getStatusText(request.status).toLowerCase()}>
                {getStatusText(request.status)}
              </td>
              <td className="action-buttons">
                {request.status === 1 && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(request.id)}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(request.id)}
                    >
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
