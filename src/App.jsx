import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "../college-frontend/src/pages/Dashboard";

import Status from "../college-frontend/src/pages/Status";
import History from "../college-frontend/src/pages/History";
import Messages from "../college-frontend/src/pages/Messages";
import CreateAccount from "../college-frontend/src/pages/CreateAccount";
// import register from "../college-frontend/src/pages/Register";

import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
       
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protect Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          
            <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
            <Route path="/history" element={ <ProtectedRoute><History /> </ProtectedRoute>} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
