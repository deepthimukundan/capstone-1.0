import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Attendance = () => {
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const employeeId = localStorage.getItem("userID");
      const response = await axios.get(
        `${baseUrl}api/Attendance/GetAttendanceByEmployee/${employeeId}`
      );
      setAttendanceList(response.data);
    } catch (error) {
      toast.error("Error fetching attendance data: " + error.message);
    }
  };

  const handleAddAttendance = async (e) => {
    e.preventDefault();

    const attendance = {
      employeeId: parseInt(localStorage.getItem("userID")),
      date: formatDate(new Date()),
      loginTime,
      logoutTime,
    };

    try {
      const response = await axios.post(
        `${baseUrl}api/Attendance/AddAttendance`,
        JSON.stringify(attendance),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Attendance added successfully");
        setLoginTime("");
        setLogoutTime("");
        fetchAttendanceData(); // Refresh the attendance list
      } else {
        toast.error("Failed to add attendance");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-5">
            <h2>Mark Attendance</h2>
            <form onSubmit={handleAddAttendance}>
              <div className="row">
                <div className="col-md-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formatDate(new Date())}
                    required
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label>Login Time:</label>
                  <input
                    type="time"
                    className="form-control"
                    value={loginTime}
                    onChange={(e) => setLoginTime(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label>Logout Time:</label>
                  <input
                    type="time"
                    className="form-control"
                    value={logoutTime}
                    onChange={(e) => setLogoutTime(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-primary mt-3">
                    Add Attendance
                  </button>
                </div>
              </div>
            </form>
            <table className="table table-bordered table-hover table-stripped mt-2">
              <thead>
                <tr class="table-dark">
                  <th>Date</th>
                  <th>Login Time</th>
                  <th>Logout Time</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((attendance) => (
                  <tr key={attendance.attendanceID}>
                    <td>{attendance.date.split("T")[0]}</td>
                    <td>{attendance.loginTime}</td>
                    <td>{attendance.logoutTime}</td>
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

export default Attendance;
