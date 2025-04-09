// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar.jsx";
// import axios from "axios";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//     const [student, setStudent] = useState(null);
//     const [selectedDocument, setSelectedDocument] = useState("");
//     const [reason, setReason] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userEmail = localStorage.getItem("userName"); // Get email/username of logged-in user

//         if (!userEmail) {
//             console.error("User not logged in!");
//             return;
//         }

//         // Fetch student data based on logged-in email
//         axios.get(`http://localhost:8080/students/email/${userEmail}`)
//             .then(response => {
//                 if (response.data) {
//                     setStudent(response.data); // Set student details if found
//                     localStorage.setItem("rollNo", response.data.rollNo);
//                     localStorage.setItem("prnNo", response.data.prnNo); // Store rollNo for future requests
//                 }
//             })
//             .catch(error => {
//                 console.error("No student data found, profile incomplete:", error);
//                 setStudent(null); // Ensure profile incomplete is displayed
//             });
//     }, []);

//     // const handleRequestSubmit = () => {
//     //     if (!selectedDocument || !reason) {
//     //         alert("Please select a document and enter a reason before submitting request.");
//     //         return;
//     //     }
    
//     //     const prnNo = student ? student.prnNo : localStorage.getItem("prnNo"); // Get PRN from local storage
//     //     if (!prnNo) {
//     //         alert("PRN not found. Please complete your profile.");
//     //         return;
//     //     }
    
//     //     axios.post("http://localhost:8080/document-requests/create", null, {
//     //         params: {
//     //             prnNo: prnNo,
//     //             documentType: selectedDocument,
//     //             reason: reason
//     //         }
//     //     })
//     //     .then(response => {
//     //         alert(`Request submitted for ${selectedDocument} with reason: ${reason}`);
//     //         setSelectedDocument("");
//     //         setReason("");
//     //     })
//     //     .catch(error => {
//     //         console.error("Error submitting request:", error);
//     //         alert("Failed to submit request. Please try again.");
//     //     });
//     // };
//     const handleRequestSubmit = () => {
//         if (!selectedDocument || !reason) {
//             alert("Please select a document and enter a reason before submitting request.");
//             return;
//         }
    
//         const prnNo = student ? student.prnNo : localStorage.getItem("prnNo"); // Get PRN from local storage
//         if (!prnNo) {
//             alert("PRN not found. Please complete your profile.");
//             return;
//         }
    
//         axios.post("http://localhost:8080/document-requests/create", null, {
//             params: {
//                 prnNo: prnNo,
//                 documentType: selectedDocument,
//                 reason: reason,
//                 status: 1,  // Default to "Pending"
//                 document: ""    // Initially empty
//             }
//         })
//         .then(response => {
//             alert(`Request submitted for ${selectedDocument} with reason: ${reason}`);
//             setSelectedDocument("");
//             setReason("");
//         })
//         .catch(error => {
//             console.error("Error submitting request:", error);
//             alert("Failed to submit request. Please try again.");
//         });
//     };
    
//     return (
//         <div className="container">
//             <Sidebar />
//             <div className="main-content">
//                 <h1>Student Profile System</h1>
//                 <div className="dashboard">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Personal Information</th>
//                                 <th>Course Details</th>
//                                 <th>Profile Status</th>
//                                 <th>Request Document</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <strong>Name:</strong> {student ? student.name : "Loading..."} <br />
//                                 </td>
//                                 <td>
//                                     <strong>PRN Number:</strong> {student ? student.prnNo : "Loading..."}<br />
//                                     <strong>Year:</strong> {student ? student.year : "Loading..."}<br />
//                                     <strong>Branch:</strong> {student ? student.branch : "Loading..."}<br />
//                                     <strong>Roll No.:</strong> {student ? student.rollNo : "Loading..."}
//                                 </td>
//                                 <td className="status">
//                                     {student ? (
//                                         "Profile complete."
//                                     ) : (
//                                         <>
//                                             <span className="profile-incomplete">Profile Incomplete</span>
//                                             <button className="btn create-account-btn" onClick={() => navigate("/CreateAccount")}>
//                                                 Create Account
//                                             </button>
//                                         </>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <select className="dropdown" value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
//                                         <option value="">Select Document</option>
//                                         <option value="Bonafide Certificate">Bonafide Certificate</option>
//                                         <option value="LOC">LOC</option>
//                                         <option value="Exam Form">Exam Form</option>
//                                         <option value="Scholarship">Scholarship</option>
//                                     </select>
//                                     <textarea
//                                         className="reason-input"
//                                         placeholder="Enter reason for request..."
//                                         value={reason}
//                                         onChange={(e) => setReason(e.target.value)}
//                                     ></textarea>
//                                     <button className="btn request-btn" onClick={handleRequestSubmit}>Submit Request</button>
//                                 </td>
//                                 <td>
//                                     <Link to="/Status" className="btn">Check Status</Link>
//                                     <Link to="/History" className="btn">View History</Link>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div> 
//         </div>
//     );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/Dashboard.css";
import { FaFileUpload, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userName");
  
    // Clear old data
    setStudent(null);
    localStorage.removeItem("rollNo");
    localStorage.removeItem("prnNo");
  
    if (!userEmail) {
      console.error("User not logged in!");
      return;
    }
  
    axios.get(`http://localhost:8080/students/email/${userEmail}`)
      .then((response) => {
        if (response.data && response.data.name && response.data.prnNo && response.data.rollNo) {
          setStudent(response.data);
          localStorage.setItem("rollNo", response.data.rollNo);
          localStorage.setItem("prnNo", response.data.prnNo);
        } else {
          // Set student to null if incomplete data
          setStudent(null);
        }
      })
      .catch((error) => {
        console.error("No student data found, profile incomplete:", error);
        setStudent(null);
      });
  }, []);
  

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const handleVerificationUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    const studentId = student ? student.id : null;
    if (!studentId) {
      alert("Student ID not found. Please log in again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("reason", reason); // Add reason to the request
  
    try {
      const response = await axios.post(
        `http://localhost:8080/document-requests/${studentId}/upload-verification`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert(response.data);
      setFile(null);
      setReason(""); // Reset reason input after submission
    } catch (error) {
      console.error("Error uploading verification document:", error);
      alert("Failed to upload verification document.");
    }
  };
  
  

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };
  const handleRequestSubmit = async () => {
    if (!documentType || !reason) {
      alert("Please select a document and enter a reason before submitting request.");
      return;
    }
  
    const prnNo = student ? student.prnNo : localStorage.getItem("prnNo");
    if (!prnNo) {
      alert("PRN not found. Please complete your profile.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/document-requests/create", null, {
        params: {
          prnNo: prnNo,
          documentType: documentType,
          reason: reason,
          status: 1,
        },
      });
  
      const requestId = response.data.id; // ✅ Get document request ID from backend
  
      alert(`Request submitted for ${documentType} with reason: ${reason}`);
  
      // ✅ Upload the verification file right after request creation
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
  
        await axios.post(
          `http://localhost:8080/document-requests/${requestId}/upload-verification`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
  
        alert("Verification document uploaded!");
      }
  
      // Reset form
      setDocumentType("");
      setReason("");
      setFile(null);
      setPhoto(null);
      setAddress("");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };
  
  return (
    <motion.div className="main-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="welcome-text">Welcome, {student?.name || "Student"}</h1>
        <p className="sub-text">Manage your profile and request documents</p>

        <div className="dashboard-container">
          <div className="student-info">
            <h2 className="section-title">Student Information</h2>
            {student ? (
              <>
                <p><strong>PRN Number:</strong> {student.prnNo}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Branch:</strong> {student.branch}</p>
                <p><strong>Roll No.:</strong> {student.rollNo}</p>
                <div className="profile-status">✅ Profile Complete</div>
              </>
            ) : (
              <>
                <p><strong>⚠️ Profile Incomplete</strong></p>
                <p>Please <Link to="/CreateAccount">complete your profile</Link> to access document requests.</p>
                <div className="profile-status incomplete">Profile Incomplete</div>
              </>
            )}
          </div>

          {/* ✅ Show request section ONLY if profile is complete */}
          {student && (
            <div className="request-document">
              <h2 className="section-title">Request Document</h2>
              <p className="sub-text">Select a document type and provide verification details</p>

              <div className="tab-buttons">
                <button className="tab active">New Request</button>
                <Link to="/Status" className="tab">Check Status</Link>
                <Link to="/History" className="tab">Request History</Link>
              </div>


            {/* <div className="form-group">
              <label>Important Information</label>
              <p className="info-text">
                📌 Bonafide Certificate: Upload Last Semester Marksheet <br />
                📌 Leaving Certificate (LC): Upload BE Marksheet or ID Card <br />
                📌 LOC: Upload Passout Result <br />
                📌 Hall Ticket: Upload Previous Semester Marksheet <br />
                📌 ID Card: Upload Your Photo and Enter Address
              </p>
            </div> */}



              <div className="form-group">
                <label>Document Type</label>
                <select className="input-field" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                  <option value="">Select document type</option>
                  <option value="Bonafide Certificate">Bonafide Certificate</option>
                  <option value="Leaving Certificate">Leaving Certificate</option>
                  <option value="LOC">LOC</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Hall Ticket">Hall Ticket</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reason for Request</label>
                <textarea
                  className="input-field"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a detailed reason for your request..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Supporting Document</label>
                {documentType === "Bonafide Certificate" || documentType === "Hall Ticket" ? (
                  <div className="upload-box" onClick={() => document.getElementById("fileUpload").click()}>
                    <FaFileUpload className="upload-icon" />
                    <p>{file ? file.name : "Upload Required Marksheet"}</p>
                    <input type="file" id="fileUpload" hidden onChange={handleFileUpload} />
                  </div>
                ) : documentType === "Leaving Certificate" ? (
                  <div className="upload-box" onClick={() => document.getElementById("fileUpload").click()}>
                    <FaFileUpload className="upload-icon" />
                    <p>{file ? file.name : "Upload BE Marksheet or ID Card"}</p>
                    <input type="file" id="fileUpload" hidden onChange={handleFileUpload} />
                  </div>
                ) : documentType === "LOC" ? (
                  <div className="upload-box" onClick={() => document.getElementById("fileUpload").click()}>
                    <FaFileUpload className="upload-icon" />
                    <p>{file ? file.name : "Upload Passout Result"}</p>
                    <input type="file" id="fileUpload" hidden onChange={handleFileUpload} />
                  </div>
                ) : documentType === "ID Card" ? (
                  <>
                    <div className="upload-box" onClick={() => document.getElementById("photoUpload").click()}>
                      <FaFileUpload className="upload-icon" />
                      <p>{photo ? photo.name : "Upload Photo"}</p>
                      <input type="file" id="photoUpload" hidden onChange={handlePhotoUpload} />
                    </div>
                    <div className="form-group">
                      <label>Enter Address</label>
                      <textarea
                        className="input-field"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address here..."
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <p>Please select a document type first.</p>
                )}
              </div>

              <div className="form-buttons">
                <Link to="/" className="cancel-btn"><FaTimesCircle /> Cancel</Link>
                <button className="submit-btn" onClick={handleRequestSubmit}>Submit Request</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
