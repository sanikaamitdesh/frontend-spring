import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaFilter, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Admin_Styles/ManageRequest.css";

const ManageRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch requests from backend
  useEffect(() => {
    fetch("http://localhost:8080/document-requests")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Requests:", data); // Debugging step
        setRequests(data);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);
  
// // Approve request by PRN
// const handleApprove = (prnNo) => {
//   if (window.confirm(`Are you sure you want to approve requests for PRN: ${prnNo}?`)) {
//     fetch(`http://localhost:8080/document-requests/${prnNo}/approve`, { method: "PUT" })
//       .then((response) => response.json())
//       .then(() => {
//         setRequests(requests.map((req) => 
//           req.student.prnNo === prnNo ? { ...req, statusString: "Approved" } : req
//         ));
//       })
//       .catch((error) => console.error("Error approving request:", error));
//   }
// };

// // Reject request by PRN
// const handleReject = (prnNo) => {
//   if (window.confirm(`Are you sure you want to reject requests for PRN: ${prnNo}?`)) {
//     fetch(`http://localhost:8080/document-requests/${prnNo}/reject`, { method: "PUT" })
//       .then((response) => response.json())
//       .then(() => {
//         setRequests(requests.map((req) => 
//           req.student.prnNo === prnNo ? { ...req, statusString: "Rejected" } : req
//         ));
//       })
//       .catch((error) => console.error("Error rejecting request:", error));
//   }
// };

const handleApprove = (id) => {
  if (window.confirm(`Are you sure you want to approve this request?`)) {
    fetch(`http://localhost:8080/document-requests/${id}/approve`, { method: "PUT" })
      .then((response) => response.json())
      .then((data) => {
        //console.log("API Response:", data); // Debugging 
        setRequests(requests.map((req) => 
          req.id === id ? { ...req, statusString: data.statusString } : req
        ));
      })
      .catch((error) => console.error("Error approving request:", error));
  }
};
const handleReject = (id) => {
  if (window.confirm(`Are you sure you want to reject this request?`)) {
    fetch(`http://localhost:8080/document-requests/${id}/reject`, { method: "PUT" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reject request");
        }
        return response.json();
      })
      .then((data) => {
       // console.log("API Response:", data); // Debugging

        // Update request list with new status
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id
              ? { ...req, status: data.status, statusString: data.status ? "Approved" : "Rejected" }
              : req
          )
        );
      })
      .catch((error) => console.error("Error rejecting request:", error));
  }
};


  const filteredRequests = requests.filter((request) => {
  return (
    (request.student?.prnNo?.includes(searchQuery) || 
     request.documentType?.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === "All" || request.statusString === statusFilter)
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
          <input type="text" placeholder="Search by PRN or Document..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                <td className={request.statusString.toLowerCase()}>
                  {request.statusString}
              </td>

              {/* <td className={request.status.toLowerCase()}>{request.status}</td> */}
              <td className="action-buttons">
                  {request.statusString === "Pending" && (
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
