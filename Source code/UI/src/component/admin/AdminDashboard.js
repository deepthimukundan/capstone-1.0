import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./AdminDashboard.css"; // Make sure to import the CSS file

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">          
          <div className="container mt-5">
            <div className="row justify-content-center">
              <img src="./images/Admin.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
