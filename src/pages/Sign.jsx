// import React, { useState } from "react";
// import "../styles/Sign.css";

// const SignupPage = () => {
//   const [activeTab, setActiveTab] = useState("login");
//   const [userType, setUserType] = useState("student");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Dummy login state

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(true); // Simulate login
//   };

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-page">
//         <div className="left-section">
//           <h1>
//             Document Requests
//             <br />
//             Made Simple
//           </h1>
//           <p>
//             A streamlined platform for students to request official documents and
//             for administrators to manage approvals.
//           </p>
//           <ul>
//             <li>✔️ Easy document requests for students</li>
//             <li>✔️ Efficient approval workflow for administrators</li>
//             <li>✔️ Automatic PDF generation and delivery</li>
//           </ul>
//         </div>

//         <div className="right-section">
//           <div className="tabs">
//             <button
//               className={activeTab === "login" ? "active" : ""}
//               onClick={() => setActiveTab("login")}
//             >
//               Login
//             </button>
//             <button
//               className={activeTab === "signup" ? "active" : ""}
//               onClick={() => setActiveTab("signup")}
//             >
//               Sign Up
//             </button>
//           </div>

//           {!isLoggedIn && activeTab === "login" && (
//             <div className="form-card">
//               <h2>Login to your account</h2>
//               <p>Enter your credentials to access your dashboard</p>
//               <form onSubmit={handleLogin}>
//                 <input
//                   type="email"
//                   placeholder="m.example@university.edu"
//                   required
//                 />
//                 <input type="password" placeholder="Password" required />

//                 <div className="user-role-toggle">
//                   <button
//                     type="button"
//                     className={userType === "student" ? "selected" : ""}
//                     onClick={() => setUserType("student")}
//                   >
//                     <span role="img" aria-label="student">👤</span> Student
//                   </button>
//                   <button
//                     type="button"
//                     className={userType === "admin" ? "selected" : ""}
//                     onClick={() => setUserType("admin")}
//                   >
//                     <span role="img" aria-label="admin">🛡️</span> Admin
//                   </button>
//                 </div>

//                 <button type="submit" className="primary-btn">Login</button>
//               </form>
//             </div>
//           )}

//           {!isLoggedIn && activeTab === "signup" && (
//             <div className="form-card">
//               <h2>Create a new account</h2>
//               <p>Fill in your details to register</p>
//               <form>
//                 <input type="text" placeholder="Full Name" required />
//                 <input type="email" placeholder="Email Address" required />
//                 <input type="password" placeholder="Password" required />

//                 <div className="user-role-toggle">
//                   <button
//                     type="button"
//                     className={userType === "student" ? "selected" : ""}
//                     onClick={() => setUserType("student")}
//                   >
//                     <span role="img" aria-label="student">👤</span> Student
//                   </button>
//                   <button
//                     type="button"
//                     className={userType === "admin" ? "selected" : ""}
//                     onClick={() => setUserType("admin")}
//                   >
//                     <span role="img" aria-label="admin">🛡️</span> Admin
//                   </button>
//                 </div>

//                 <button type="submit" className="primary-btn">Sign Up</button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import "../styles/Sign.css";


export default function SignUpLoginDashboard() {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState("student");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="dashboard-container">
 
      <div className="signup-wrapper">
        <div className="signup-page">
          {/* Left Intro */}
          <div className="left-section">
            <h1>
              Document Requests
              <br />
              Made Simple
            </h1>
            <p>
              A streamlined platform for students to request official documents and
              for administrators to manage approvals.
            </p>
            <ul>
              <li>✔️ Easy document requests for students</li>
              <li>✔️ Efficient approval workflow for administrators</li>
              <li>✔️ Automatic PDF generation and delivery</li>
            </ul>
          </div>

          {/* Right Form */}
          <div className="right-section">
            <div className="tabs">
              <button
                className={activeTab === "login" ? "active" : ""}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={activeTab === "signup" ? "active" : ""}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {!isLoggedIn && activeTab === "login" && (
              <div className="form-card">
                <h2>Login to your account</h2>
                <p>Enter your credentials to access your dashboard</p>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="m.example@university.edu" required />
                  <input type="password" placeholder="Password" required />
                  <button className="primary-btn" type="submit">Login</button>
                </form>
              </div>
            )}

            {!isLoggedIn && activeTab === "signup" && (
              <div className="form-card">
                <h2>Create an account</h2>
                <p>Sign up to start requesting or managing documents</p>
                <form>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="m.example@university.edu" required />
                  <input type="password" placeholder="Create Password" required />
                  <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <button className="primary-btn" type="submit">Sign Up</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <main className="dashboard-main">
        <h2 className="dashboard-heading">Powerful Dashboards</h2>
        <p className="dashboard-subheading">
          Tailored interfaces for students and administrators
        </p>

        <div className="dashboard-grid">
          {/* Student Dashboard */}
          <div className="dashboard-card">
            <h3 className="dashboard-card-header">Student Dashboard</h3>
            <div className="dashboard-card-body">
              <div className="dashboard-row">
                <span className="dashboard-label">Document Requests</span>
                <button className="dashboard-button">New Request</button>
              </div>
              <div className="dashboard-item pending">
                <div>Transcript Request</div>
                <div className="dashboard-date">Submitted: Apr 2, 2025</div>
              </div>
              <div className="dashboard-item approved">
                <div>Enrollment Certificate</div>
                <div className="dashboard-date">Submitted: Mar 28, 2025</div>
              </div>
            </div>
          </div>

          {/* Admin Dashboard */}
          <div className="dashboard-card">
            <h3 className="dashboard-card-header">Admin Dashboard</h3>
            <div className="dashboard-card-body">
              <div className="dashboard-row">
                <span className="dashboard-label">Pending Approvals</span>
                <button className="dashboard-button">View All</button>
              </div>
              <div className="dashboard-item pending">
                <div>Transcript Request - John Doe</div>
                <div className="dashboard-date">Received: Apr 3, 2025</div>
              </div>
              <div className="dashboard-item approved">
                <div>Bonafide Certificate - Jane Smith</div>
                <div className="dashboard-date">Approved: Mar 29, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
