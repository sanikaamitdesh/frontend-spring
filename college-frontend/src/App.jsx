import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import Status from "./pages/Status";
import History from "./pages/History";
import Messages from "./pages/Messages";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/request-form" element={<RequestForm />} />
            <Route path="/status" element={<Status />} />
            <Route path="/history" element={<History />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
