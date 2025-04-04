import React, { useEffect, useState } from "react";
import "../Admin_Styles/AdminDashboard.css";
import Sidebar from "../Admin_Pages/AdminSidebar.jsx";
import StudentList from "./StudentList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRequests: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/document-requests/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];

  const filteredChartData =
    statusFilter === "all"
      ? chartData
      : chartData.filter((item) => item.name.toLowerCase() === statusFilter);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>

        {/* Stat Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <h2>{stats.totalStudents}</h2>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalRequests}</h2>
            <p>Total Requests</p>
          </div>
          <div className="stat-card">
            <h2>{stats.pending}</h2>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h2>{stats.approved}</h2>
            <p>Approved</p>
          </div>
          <div className="stat-card">
            <h2>{stats.rejected}</h2>
            <p>Rejected</p>
          </div>
        </div>

       

        {/* Chart */}
        <div className="chart-section">
          <h2>Request Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#5D87FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
         {/* Filters Section */}
         <div className="filter-bar">
          {/* Class Filter */}
          {/* <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          
            <option value="FE">FE</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select> */}

          {/* Status Filter */}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name or PRN"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Student List with Filters */}
        <StudentList
          classFilter={classFilter}
          statusFilter={statusFilter}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
