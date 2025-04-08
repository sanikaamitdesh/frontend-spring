import React from 'react';
import '../styles/History.css';
import Sidebar from '../components/Sidebar.jsx';

const History = ({ requests }) => {
  return (
    <div className="history-layout">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="history-page">
        <h2 className="title">Request History</h2>
        <div className="table-container">
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
                    <td>{req.date}</td>
                    <td>
                      <span
                        className={`status ${
                          req.status === 'Completed'
                            ? 'completed'
                            : req.status === 'Rejected'
                            ? 'rejected'
                            : ''
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === 'Completed' ? (
                        <button className="btn download">Download</button>
                      ) : req.status === 'Rejected' ? (
                        <button className="btn reapply">Reapply</button>
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
        </div>
      </div>
    </div>
  );
};

export default History;
