import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/admin-dashboard.css"; // Import CSS

const AdminDashboard = () => {
  const location = useLocation();
  const students = location.state?.students || [];
  const [showRegistered, setShowRegistered] = useState(false);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button className="blue" onClick={() => setShowRegistered(true)}>Show Registered Students</button>
        <button className="gray">Show Bonafide Requests (Coming Soon)</button>
      </div>

      {showRegistered && (
        <div className="table-container">
          <h3>Registered Students</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
