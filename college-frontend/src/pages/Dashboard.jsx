import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

const Dashboard = () => {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <h2>Student Dashboard</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
