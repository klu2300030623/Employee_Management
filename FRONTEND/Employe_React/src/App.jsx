import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "", department: "" });
  const [editing, setEditing] = useState(false);

  const BASE_URL = "http://localhost:6050";

  useEffect(() => {
    loadEmployees();
  }, []);

  // Load all employees
  const loadEmployees = async () => {
    const result = await axios.get(`${BASE_URL}/employees`);
    setEmployees(result.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`${BASE_URL}/update/${formData.id}`, formData);
    } else {
      await axios.post(`${BASE_URL}/add`, formData);
    }
    setFormData({ id: "", name: "", email: "", department: "" });
    setEditing(false);
    loadEmployees();
  };

  // Edit employee
  const editEmployee = (emp) => {
    setFormData(emp);
    setEditing(true);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    loadEmployees();
  };

  return (
    <div style={{ margin: "30px", fontFamily: "Arial" }}>
      <h2>👨‍💼 Employee Management System</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />{" "}
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />{" "}
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />{" "}
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => editEmployee(emp)}>Edit</button>{" "}
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <button onClick={async () => {
        const res = await axios.get(`${BASE_URL}/klu`);
        alert(res.data);
      }}>
        🔗 Call /klu Endpoint
      </button>
    </div>
  );
};

export default App;
