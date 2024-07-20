import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import axios from "axios";

const LeaveManagement = () => {
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
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const UpdateStatus = async (leaveID, leaveStatus) => {
    try {
      const response = await axios.put(
        `${baseUrl}api/Leaves/${leaveID}?Status=${leaveStatus}`
      );

      if (response.status === 204) {
        toast.success("Leave status updated successfully");
        fetchLeaves(); // Refresh the leaves list after applying
      } else {
        toast.error("Error while updating leave status:", response.statusText);
      }
    } catch (error) {
      toast.error("Error while updating leave status:", error);
    }
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
                  <th scope="col">Leave ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={leave.leaveID}>
                    <td>{index + 1}</td>
                    <td>{retrunEmployeeName(leave.employeeID)}</td>
                    <td>{new Date(leave.date).toLocaleDateString()}</td>
                    <td>{leave.status}</td>
                    <td>
                      {leave.status === "Pending" ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary ml-2"
                            onClick={() =>
                              UpdateStatus(leave.leaveID, "Approved")
                            }
                          >
                            Approve
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-warning mr-2"
                            onClick={() =>
                              UpdateStatus(leave.leaveID, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : leave.status === "Approved" ? (
                        <button
                          type="button"
                          className="btn btn-warning mr-2"
                          onClick={() =>
                            UpdateStatus(leave.leaveID, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      ) : leave.status === "Rejected" ? (
                        <button
                            type="button"
                            className="btn btn-primary ml-2"
                            onClick={() =>
                              UpdateStatus(leave.leaveID, "Approved")
                            }
                          >
                            Approve
                          </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default LeaveManagement;
