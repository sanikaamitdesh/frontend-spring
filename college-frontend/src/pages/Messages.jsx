import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/Messages.css";

const ChatWithAdmin = () => {
  const optionsTree = {
    root: [
      { label: "📄 Request a Document", next: "request" },
      { label: "❓ Check Status", next: "status" },
      { label: "📚 Know Required Documents", next: "requirements" },
    ],
    request: [
      { label: "Bonafide Certificate", next: "bonafide" },
      { label: "Leaving Certificate", next: "lc" },
      { label: "ID Card", next: "id" },
      { label: "Hall Ticket", next: "hall" },
    ],
    bonafide: [
      { label: "✅ Upload your last semester's marksheet in the New Request tab." }
    ],
    lc: [
      { label: "✅ Upload your BE marksheet or your ID Card in the New Request tab." }
    ],
    id: [
      { label: "✅ Upload your photo and enter your address to request an ID Card." }
    ],
    hall: [
      { label: "✅ Upload your previous semester's marksheet for a Hall Ticket." }
    ],
    status: [
      { label: "🔍 Go to the dashboard and click on the 'Check Status' tab to see your document request status." }
    ],
    requirements: [
      { label: "📌 Bonafide Certificate ➡ Last Semester Marksheet" },
      { label: "📌 Leaving Certificate ➡ BE Marksheet or ID Card" },
      { label: "📌 ID Card ➡ Photo + Address" },
      { label: "📌 Hall Ticket ➡ Previous Semester Marksheet" }
    ],
  };

  const [currentPath, setCurrentPath] = useState("root");
  const [chatHistory, setChatHistory] = useState([
    { text: "Hello! How can I assist you?", type: "admin" },
  ]);

  const handleOptionClick = (option) => {
    const updatedHistory = [...chatHistory, { text: option.label, type: "user" }];

    if (option.next) {
      setChatHistory(updatedHistory);
      setCurrentPath(option.next);
    } else {
      // Final answer
      setChatHistory([...updatedHistory, { text: option.label, type: "admin" }]);
      setTimeout(() => setCurrentPath("root"), 300);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar />

      <div className="chat-container">
        <div className="chat-header">
          <FaUserCircle size={24} /> Admin ChatBot
        </div>

        <div className="chat-messages">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-options">
          {optionsTree[currentPath]?.map((option, index) => (
            <button
              key={index}
              className="chat-option-btn"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWithAdmin;
