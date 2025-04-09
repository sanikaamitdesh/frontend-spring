import React, { useEffect, useState } from 'react';
import '../styles/History.css';
import Sidebar from '../components/Sidebar.jsx';
import axios from 'axios';

const History = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const prnNo = localStorage.getItem('prnNo');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/document-requests/history/${prnNo}`);
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    if (prnNo) {
      fetchHistory();
    }
  }, [prnNo]);

  const handleReapply = async (id) => {
    try {
      await axios.post(`http://localhost:8080/document-requests/${id}/reapply`);
      alert('Reapplied successfully!');
      window.location.reload(); // reload the updated list
    } catch (error) {
      console.error("Reapply failed:", error);
      alert('Reapply failed');
    }
  };
  

  return (
    <div className="history-layout">
      <Sidebar />
      <div className="history-page">
        <h2 className="title">Request History</h2>
        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                {requests && requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{req.documentType}</td>
                      <td>{new Date(req.id).toLocaleDateString()}</td> {/* Replace with actual date if available */}
                      <td>
                        <span className={`status ${
                          req.status === 2 ? 'completed' :
                          req.status === 3 ? 'rejected' : 'pending'
                        }`}>
                          {req.status === 2 ? 'Completed' : req.status === 3 ? 'Rejected' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {req.status === 2 ? (
                          <a href={`http://localhost:8080/document-requests/${req.id}/download`} className="btn download">Download</a>
                        ) : req.status === 3 ? (
                          <button className="btn reapply" onClick={() => handleReapply(req.id)}>Reapply</button>


                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No history available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
