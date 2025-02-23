import React, { useState } from "react";
import { FaMicrophone, FaPaperclip, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import "../styles/Messages.css";

const ChatWithAdmin = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", type: "admin" },
    { text: "I need my bonafide certificate.", type: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: "user" }]);
      setInput("");  
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <FaUserCircle size={24} /> Admin
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <FaPaperclip className="icon" />
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FaMicrophone className="icon" />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWithAdmin;
