// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import "../Admin_Styles/Document.css";
// import { FaArrowLeft } from "react-icons/fa";

// const DocumentManagement = () => {
//   const navigate = useNavigate();
//   const [templates, setTemplates] = useState([]);
//   const [generatedDocs, setGeneratedDocs] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([
//     { id: 1, studentName: "John Doe", document: "Bonafide Certificate" },
//     { id: 2, studentName: "Jane Smith", document: "Transcript" },
//   ]);

//   const handleTemplateUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setTemplates([...templates, { id: templates.length + 1, name: file.name, file }]);
//     }
//   };

//   const approveRequest = (requestId) => {
//     const request = pendingRequests.find((r) => r.id === requestId);
//     if (request) {
//       const newDoc = {
//         id: generatedDocs.length + 1,
//         studentName: request.studentName,
//         documentName: request.document,
//         dateIssued: new Date().toLocaleDateString(),
//       };

//       setGeneratedDocs([...generatedDocs, newDoc]);
//       setPendingRequests(pendingRequests.filter((r) => r.id !== requestId));
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="document-management-container">
       
//         <button className="back-button" onClick={() => navigate(-1)}>
//             <FaArrowLeft />
//         </button>

//         <h2>📄 Document Management</h2>

//         <div className="pending-requests">
//           <h3>Pending Document Requests</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Student Name</th>
//                 <th>Requested Document</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingRequests.map((req) => (
//                 <tr key={req.id}>
//                   <td>{req.studentName}</td>
//                   <td>{req.document}</td>
//                   <td>
//                     <button className="approve-btn" onClick={() => approveRequest(req.id)}>Approve & Send</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="upload-section">
//           <h3>Upload Document Template</h3>
//           <input type="file" onChange={handleTemplateUpload} />
//         </div>
//         <div className="templates-list">
//           <h3>Available Templates</h3>
//           <ul>
//             {templates.map((template) => (
//               <li key={template.id}>{template.name}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Issued Documents History */}
//         <div className="history">
//           <h3>Issued Documents History</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Student Name</th>
//                 <th>Document</th>
//                 <th>Date Issued</th>
//               </tr>
//             </thead>
//             <tbody>
//               {generatedDocs.map((doc) => (
//                 <tr key={doc.id}>
//                   <td>{doc.studentName}</td>
//                   <td>{doc.documentName}</td>
//                   <td>{doc.dateIssued}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentManagement;

import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FaArrowLeft } from "react-icons/fa"; 
import "../Admin_Styles/Document.css";

const DocumentManagement = () => {
  const navigate = useNavigate();

  const pendingRequests = [
    { id: 1, student: "John Doe", document: "Bonafide Certificate" },
    { id: 2, student: "Jane Smith", document: "Transcript" },
  ];

  const issuedDocuments = [
    { id: 1, student: "John Doe", document: "Bonafide Certificate", date: "20-03-2025" },
  ];

  const handleApprove = (id) => {
    alert(`Document Approved and Generated for Student ID: ${id}`);
  };

  return (
    <div className="document-container">
      {/* Back Icon */}
      <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />

      <h2 className="section-title">📄 Document Management</h2>

      {/* Pending Requests */}
      <div className="card">
        <h3>Pending Document Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Requested Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.student}</td>
                <td>{req.document}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(req.id)}>
                    ✅ Approve & Generate PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issued Documents History */}
      <div className="card">
        <h3>📜 Issued Documents History</h3>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Document</th>
              <th>Date Issued</th>
            </tr>
          </thead>
          <tbody>
            {issuedDocuments.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.student}</td>
                <td>{doc.document}</td>
                <td>{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManagement;
