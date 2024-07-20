import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../constants";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import axios from "axios";

const LeaveReporting = () => {
  const [leaves, setLeaves] = useState([]);
  const managerID = localStorage.getItem("userID");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch leaves when the component mounts
    fetchLeaves();
    fetchUsers();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(`${baseUrl}api/Leaves/Manager/${managerID}`);
      const data = await response.json();
      const leaveSummary = groupAndCountLeaves(data);
      setLeaves(leaveSummary);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const groupAndCountLeaves = (leaves) => {
    const groupedLeaves = leaves.reduce((acc, leave) => {
      if (leave.status === "Approved") {
        if (!acc[leave.employeeID]) {
          acc[leave.employeeID] = 0;
        }
        acc[leave.employeeID] += 1;
      }
      return acc;
    }, {});

    return Object.keys(groupedLeaves).map((employeeID) => ({
      employeeID: parseInt(employeeID),
      count: groupedLeaves[employeeID],
    }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/api/Employee`);
      setUsers(response.data);
      console.log("Users", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const retrunEmployeeName = (empId) => {
    debugger
    const user = users.find((employee) => employee.employeeID === empId);
    if (user !== null && user !== undefined) return user.name;
    else return "No Manager";
  };

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-1">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Serial</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Count</th>
                  <th scope="col">Progress</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={leave.leaveID}>
                    <td>{index + 1}</td>
                    <td>{leave.employeeID}</td>
                    <td>{retrunEmployeeName(leave.employeeID)}</td>
                    <td>{leave.count}</td>                   
                    <td>
                      <div class="progress">
                        <div
                          className={
                            leave.count <= 2
                              ? "progress-bar bg-warning"
                              : leave.count > 2 &&
                                leave.count <= 3
                              ? "progress-bar bg-info"
                              : "progress-bar bg-success"
                          }
                          role="progressbar"
                          style={{ width: `${leave.count * 100}%` }}
                          aria-valuenow="2"
                          aria-valuemin="1"
                          aria-valuemax="5"
                        >
                          {leave.count}
                        </div>
                      </div>
                    </td>
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

export default LeaveReporting;
