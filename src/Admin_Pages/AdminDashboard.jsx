import React from "react";
import "../Admin_Styles/AdminDashboard.css";
import Sidebar from "../Admin_Pages/AdminSidebar.jsx";
import StudentList from "./StudentList"; 

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>

        {/* Statistics Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h2>150</h2>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h2>80</h2>
            <p>Total Requests</p>
          </div>
          <div className="stat-card">
            <h2>20</h2>
            <p>Pending Approvals</p>
          </div>
          <div className="stat-card">
            <h2>60</h2>
            <p>Completed Requests</p>
          </div>
        </div>

       
        <StudentList />
      </div>
    </div>
  );
};

export default AdminDashboard;
