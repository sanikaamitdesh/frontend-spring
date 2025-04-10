import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/Home.css"
import logo from "../Img/doc.jpeg"
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";


  const steps = [
    {
      id: '01',
      title: 'Submit Request',
      description: 'Fill out the document request form with the required information and submit your request.',
      icon: '📄',
      image: '/images/submit.png',
      bgClass: 'step-blue',
    },
    {
      id: '02',
      title: 'Admin Review',
      description: 'Administrators review your request for accuracy and completeness.',
      icon: '👥',
      image: '/images/admin-review.png',
      bgClass: 'step-purple',
    },
    {
      id: '03',
      title: 'Approval/Rejection',
      description: 'Your request is either approved or rejected with detailed feedback.',
      icon: '✅',
      image: '/images/approval.png',
      bgClass: 'step-indigo',
    },
    {
      id: '04',
      title: 'Document Delivery',
      description: 'If approved, your document is automatically generated and made available for download.',
      icon: '📤',
      image: '/images/delivery.png',
      bgClass: 'step-purple',
    },
  ];

  return (
    <div className="home-container">
    
    <Navbar />

      <div className="main-content">
        <div className="home-content">
          
        <section className="hero-section new-hero"  id="faq">
          <div className="hero-text">
            <span className="badge">Student Document Portal</span>
            <h1>
              <span style={{ color: "rgb(46 102 157)" }}>Streamlined<br />Document</span> <br />
              <span style={{ fontWeight: "bold", color: "#111" }}>Generation System</span>
            </h1>
            <p>
              Request, track, and receive official academic documents with ease.
              Our automated system simplifies the entire process from request to delivery.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/request")}>Request Document</button>


              <button className="secondary-btn" onClick={() => navigate("/how-it-works")}>Learn More</button>
            </div>
          </div>

          <div className="hero-image-container">
            <img src={logo} alt="Document Workflow" className="hero-image" />
            <div className="approval-badge">
              <span role="img" aria-label="approved">📄</span> Document Approved
            </div>
          </div>
        </section>


          {/* <section className="dashboard-section">
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
          </section> */}

          <section    className="features-section" id="features" >
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Our document generation system is designed to simplify the entire process for both students and administrators.
            </p>

            <div className="feature-cards">
              <div className="feature-card card-blue">
                <div className="feature-icon">📄</div>
                <h3>Easy Document Requests</h3>
                <p>Submit document requests in minutes with our intuitive form system designed specifically for students.</p>
              </div>

              <div className="feature-card card-indigo">
                <div className="feature-icon">⏱️</div>
                <h3>Real-time Status Updates</h3>
                <p>Track your document status in real-time from submission to approval or rejection with detailed progress indicators.</p>
              </div>

              <div className="feature-card card-purple">
                <div className="feature-icon">✅</div>
                <h3>Instant PDF Generation</h3>
                <p>Receive your approved documents instantly as professionally formatted PDFs ready for download or sharing.</p>
              </div>

              <div className="feature-card card-magenta">
                <div className="feature-icon">⚠️</div>
                <h3>Detailed Feedback</h3>
                <p>If your request is rejected, receive clear explanations and guidance on how to correct and resubmit.</p>
              </div>
            </div>
          </section>


          {/* <section className="how-it-works">
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
          </section> */}

        <section className="how-it-works" id="how-it-works">
              <h2 className="how-title">How It Works</h2>
              <p className="how-subtitle">
                Our streamlined process makes document requests and approvals simple and efficient.
              </p>

              <div className="steps-wrapper">
                {steps.map((step) => (
                  <div className="step-card" key={step.id}>
                    <div className="step-image">
                      <img src={step.image} alt={step.title} />
                      <span className="step-number">{step.id}</span>
                      <div className={`step-icon ${step.bgClass}`}>{step.icon}</div>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="streamline-docs">
            <div className="hero-card">
              <div className="hero-content">
                <h2>Ready to streamline your document process?</h2>
                <p>Join thousands of students and administrators using our platform to simplify document management.</p>
              </div>
              <div className="hero-buttons">
                <button className="primary-btn">🡺 Student Portal</button>
                <button className="secondary-btn">Admin Portal</button>
              </div>
            </div>
          </section>



          
        </div>
      </div>

      <Footer />


    </div>
  );
}
