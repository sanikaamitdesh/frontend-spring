import React, { useEffect, useState } from "react";
import "../Admin_Styles/StudentList.css";

const StudentList = ({ classFilter, statusFilter, searchQuery }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/auth/auth_users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched students:", data);
        setStudents(data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !searchQuery ||
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.prnNo?.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesSearch;
  });
  

  return (
    <div className="student-list">
      <h2>Registered Students</h2>

      <table>
        <thead>
          <tr>
            <th>PRN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.prnNo}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.year}</td>
                <td>{student.branch}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
