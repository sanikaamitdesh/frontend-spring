import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaFilter, FaSearch, FaArrowLeft, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Admin_Styles/ManageRequest.css";

const ManageRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [files, setFiles] = useState({});
  

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

  useEffect(() => {
    fetch("http://localhost:8080/document-requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        return response.json();
      })
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleFileChange = (event, id) => {
    setFiles((prevFiles) => ({ ...prevFiles, [id]: event.target.files[0] }));
  };

  const handleUpload = async (id) => {
    if (!files[id]) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[id]);

    try {
      const response = await fetch(`http://localhost:8080/document-requests/upload/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this request?")) {
      try {
        await fetch(`http://localhost:8080/document-requests/${id}/approve`, { method: "PUT" });

        setRequests((prevRequests) =>
          prevRequests.map((req) => (req.id === id ? { ...req, status: 2 } : req))
        );
      } catch (error) {
        console.error("Error approving request:", error);
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      try {
        await fetch(`http://localhost:8080/document-requests/${id}/reject`, { method: "PUT" });

        setRequests((prevRequests) =>
          prevRequests.map((req) => (req.id === id ? { ...req, status: 3 } : req))
        );
      } catch (error) {
        console.error("Error rejecting request:", error);
      }
    }
  };

  const filteredRequests = requests.filter((request) => {
    const statusText = getStatusText(request.status);
    return (
      (request.student?.prnNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <th>Upload Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.student?.prnNo || "N/A"}</td>
              <td>{request.documentType}</td>
              <td>{request.reason}</td>
              <td className={getStatusText(request.status).toLowerCase()}>
                {getStatusText(request.status)}
              </td>
              <td className="upload-column">
  {request.status === 2 ? (
    <>
      <input
        type="file"
        onChange={(e) => handleFileChange(e, request.id)}
        className="file-input"
      />
      <button className="upload-btn" onClick={() => handleUpload(request.id)}>
        <FaUpload />
      </button>
    </>
  ) : (
    <span style={{ color: "#999" }}>Only after approval</span>
  )}
</td>

              <td className="action-buttons">
                {request.status === 1 && (
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
              {request.status === 2 && (
  <button
    className="generate-btn"
    onClick={async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/document-requests/${request.id}/generate-and-upload`,
          {
            method: "POST",
          }
        );

        if (!response.ok) throw new Error("PDF generation failed");
        alert("PDF generated and uploaded!");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF generation failed.");
      }
    }}
  >
    Generate PDF
  </button>
)}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
