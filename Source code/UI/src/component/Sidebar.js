import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("Role");

  const employeeMenu = (
    <>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/attendance">
          Attendance Management
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/apply-leave">
          Leave Management
        </Link>
      </li>
    </>
  );

  const adminMenu = (
    <>
     <li className="nav-item">
        <Link className="nav-link text-white" to="/manager-onboarding">
          Manager Management
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/employee-onboarding">
          Employee Onboarding
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/employee-management">
          Employee Management
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/employee-reporting">
          Employee Reporting
        </Link>
      </li>    
    </>
  );

  const supervisorMenu = (
    <>
    <li className="nav-item">
        <Link className="nav-link text-white" to="/leave-management">
          Leave Management
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/leave-reporting">
          Leave Reporting
        </Link>
      </li>
    </>
  );

  return (
    <div className="sidebar bg-dark text-white">
      <ul className="nav flex-column">
        {role === "1" && employeeMenu}
        {role === "2" && adminMenu}
        {role === "3" && supervisorMenu}
      </ul>
    </div>
  );
};

export default Sidebar;
