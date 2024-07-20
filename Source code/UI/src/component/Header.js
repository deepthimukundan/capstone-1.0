import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userEmail");
    // Redirect to the login page or home page
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to={localStorage.getItem("Role") === "2" ? "/admin-dashboard" : localStorage.getItem("Role") === "3" ? "/manager-dashboard" : "/employee-dashboard"}>
          HRMS - {localStorage.getItem("Role") === "2" ? "Admin" : localStorage.getItem("Role") === "3" ? "Manager" : "Employee"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
