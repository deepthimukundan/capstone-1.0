import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import { baseUrl } from "../../constants";
import Sidebar from "../Sidebar";

const EmployeeReporting = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employees, setEmployees] = useState([]);

  const designations = [
    "Software developer",
    "Senior Software developer",
    "Manager",
    "Senior Manager",
    "Database Architect",
  ];
  const departments = ["HR", "IT", "Development", "Finance"];

  useEffect(() => {
    fetchEmployees();
    fetchAllEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Employee`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/EmployeeInformation/GetUsersInfo`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const fetchData = async () => {
    try {
      const url = `${baseUrl}api/EmployeeInformation/GetUserInfo?name=${name}&department=${department}&designation=${designation}`;
      const response = await axios.get(url, {
        params: {
          name: name,
          department: department,
          designation: designation,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-5">
            <h1>User Information</h1>
            <form onSubmit={handleSearch}>
              <div className="row justify-content-center mb-3">
                <div className="col-md-3">
                  <select
                    className="form-control"
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designation}
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  >
                    <option value="">Select User</option>
                    {employees.map((employee) => (
                      <option key={employee.name} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="btn btn-primary w-100">
                    Search
                  </button>
                </div>
              </div>
            </form>
            <table className="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Joining Date</th>
                  <th>Designation</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={user.ID}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNo}</td>
                    <td>{new Date(user.joiningDate).toLocaleDateString()}</td>
                    <td>{user.designation}</td>
                    <td>{user.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeReporting;
