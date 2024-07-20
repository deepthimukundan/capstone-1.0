import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { baseUrl } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ApplyLeave = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
  const employeeID = localStorage.getItem("userID"); // Assuming employeeID is 1 for this example

  useEffect(() => {
    // Fetch leaves when the component mounts
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(
        `${baseUrl}api/Leaves/Employee/${employeeID}`
      );
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const applyLeave = async () => {
    if (
      window.confirm(
        `Do you want to apply for leave on ${selectedDate.toDateString()}?`
      )
    ) {
      const leave = {
        employeeID: employeeID,
        date: selectedDate.toISOString(),
        status: "Pending",
      };

      try {
        const response = await fetch(`${baseUrl}api/Leaves`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leave),
        });

        if (response.ok) {
          toast.success("Leave applied successfully");
          fetchLeaves(); // Refresh the leaves list after applying
        } else {
          toast.error("Error applying for leave:", response.statusText);
        }
      } catch (error) {
        toast.error("Error applying for leave:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-5">
            <form className="form-inline">
              <div className="row">
                <div className="col-md-2">Choose Date</div>
                <div className="col-md-3">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    minDate={new Date()} // Disable past dates
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-primary ml-2"
                    onClick={applyLeave}
                  >
                    Apply Leave
                  </button>
                </div>{" "}
              </div>
            </form>
            <h3 className="mt-5">Your Leaves</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Leave ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.leaveID}>
                    <td>{leave.leaveID}</td>
                    <td>{new Date(leave.date).toLocaleDateString()}</td>
                    <td>{leave.status}</td>
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

export default ApplyLeave;
