
import React, { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
import "../Admin_Styles/UserManagement.css";
import { motion } from "framer-motion";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", prn: "12345", role: "Admin" },
    { id: 2, name: "Jane Smith", prn: "67890", role: "Student" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", prn: "", role: "Student" });


  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.prn) {
      alert("Please enter name and PRN.");
      return;
    }
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: "", prn: "", role: "Student" });
  };

  
  const handleRemoveUser = (id, role) => {
    if (role === "Admin") {
      alert("Cannot remove an Admin!");
      return;
    }
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Promote user to Admin
  const handleMakeAdmin = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: "Admin" } : user));
  };

  return (
    <div className="user-management">
      {/* <button className="back-btn">
        <FaArrowLeft /> Back
      </button> */}
      <button className="back-btn">
      <i className="fas fa-arrow-left"></i> {/* FontAwesome Icon */}
     </button>


    
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h2>

     
      <div className="add-user-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="prn"
          placeholder="PRN Number"
          value={newUser.prn}
          onChange={handleChange}
        />
        <select name="role" value={newUser.role} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="add-user-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>PRN</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.prn}</td>
              <td>{user.role}</td>
              <td className="action-buttons">
                {user.role === "Student" && (
                  <button className="make-admin-btn" onClick={() => handleMakeAdmin(user.id)}>
                    Make Admin
                  </button>
                )}
                <button className="remove-btn" onClick={() => handleRemoveUser(user.id, user.role)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

