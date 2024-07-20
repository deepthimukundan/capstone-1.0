import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../constants";
import userManager from './authConfig';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isManagerLogin, setIsManagerLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginUrl = isManagerLogin 
      ? `${baseUrl}api/Users/managerlogin` 
      : `${baseUrl}api/Users/Login`;

    try {
      const response = await axios.post(loginUrl, {
        Email: email,
        password: password,
      });
      // Check if response or data is null or undefined
      if (!response || !response.data) {
        throw new Error("Invalid response");
      }
      if (response.data && response.data.user && response.data.user.role) {
        localStorage.setItem("Role", response.data.user.role);

        console.log("Login successful:", response.data);
        localStorage.setItem("userEmail", response.data.user.email);        
        if (response.data.user.role === 2) {
          localStorage.setItem("userID", response.data.user.employeeID);
          navigate("/admin-dashboard");
        } else if (response.data.user.role === 3) {
          localStorage.setItem("userID", response.data.user.managerID);
          navigate("/manager-dashboard");
        } else {
          localStorage.setItem("userID", response.data.user.employeeID);
          navigate("/employee-dashboard");
        }
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      }
    }
  };

  const handleODICLogin = () => {
    userManager.signinRedirect();
  };

  // Example function to handle logout
async function logout() {
  try {
    await userManager.signoutRedirect();
  } catch (error) {
    console.error('Logout error:', error);
  }
}


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            HRMS - Login
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="managerLogin"
                      checked={isManagerLogin}
                      onChange={(e) => setIsManagerLogin(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="managerLogin">
                      Manager Login
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  {/* <button onClick={handleODICLogin}>ODIC Login</button>
                  <button onClick={logout}>Logout</button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
