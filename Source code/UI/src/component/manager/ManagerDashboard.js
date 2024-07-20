import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function ManagerDashboard() {
  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-5">           
              <div className="row justify-content-center">
                <img src="./images/Manager.jpg" />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
