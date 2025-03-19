import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Back Button Icon
import "../Admin_Styles/UserManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();


  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", prn: "12345", role: "Student" },
    { id: 2, name: "Jane Smith", prn: "67890", role: "Student" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", prn: "", role: "Student" });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    if (newUser.name && newUser.prn) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", prn: "", role: "Student" });
    }
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const assignAdmin = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role: "Admin" } : user)));
  };

  return (
    <div className="user-management-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <h2>👥 User Management</h2>

      {/* Add New User */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} />
        <input type="text" name="prn" placeholder="PRN Number" value={newUser.prn} onChange={handleInputChange} />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Users Table */}
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
              <td className={`role-${user.role.toLowerCase()}`}>{user.role}</td>
              <td>
                {user.role === "Student" && (
                  <button className="assign-admin-btn" onClick={() => assignAdmin(user.id)}>Make Admin</button>
                )}
                <button className="remove-user-btn" onClick={() => removeUser(user.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
