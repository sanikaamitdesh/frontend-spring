// src/components/Layout.jsx
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import "./Layout.css";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <Sidebar /> {/* optional */}
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
