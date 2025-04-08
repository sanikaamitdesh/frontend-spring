import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/home.css";
import logo from "../Img/hero-pic.jpg"
export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="home-container">
      <Sidebar />

      <div className="main-content">
        <div className="home-content">
        <section className="hero-section">
  
  <h1>Document Requests Made Simple</h1>
  <img src={logo} alt="Documents Illustration" />
  <p>A streamlined platform for students to request official documents and for administrators to manage approvals.</p>
  <ul className="feature-list">
    <li>✅ Easy document requests for students</li>
    <li>✅ Efficient approval workflow for administrators</li>
    <li>✅ Automatic PDF generation and delivery</li>
  </ul>
  {!isAuthenticated && (
    <button onClick={() => navigate("/register")} className="signup-btn">
      Create an Account
    </button>
  )}
</section>


          <section className="dashboard-section">
            <h2>Powerful Dashboards</h2>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Student Dashboard</h3>
                <p>Submit new document requests, track their status, and download approved documents from your personalized dashboard.</p>
              </div>
              <div className="card">
                <h3>Admin Dashboard</h3>
                <p>Manage document requests, approve/reject with comments, and monitor performance from a single admin panel.</p>
              </div>
            </div>
          </section>

          <section className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Login & Request</h3>
                <p>Students log in and submit requests.</p>
              </div>
              <div className="step">
                <h3>2. Admin Review</h3>
                <p>Admins review and take action.</p>
              </div>
              <div className="step">
                <h3>3. Automatic Delivery</h3>
                <p>PDF is auto-generated and sent to the student.</p>
              </div>
            </div>
          </section>

          <section className="key-features">
            <h2>Key Features</h2>
            <div className="feature-boxes">
              <div className="feature-box">
                <h3>Multiple Document Types</h3>
                <p>Supports transcripts, certificates, recommendation letters, and more.</p>
              </div>
              <div className="feature-box">
                <h3>Status Tracking</h3>
                <p>Real-time updates from submission to delivery.</p>
              </div>
              <div className="feature-box">
                <h3>Template-Based PDFs</h3>
                <p>Auto-filled and professionally formatted PDFs.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
