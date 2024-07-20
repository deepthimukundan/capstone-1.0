import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login";
import AdminDashboard from "./component/admin/AdminDashboard";
import Attendance from "./component/employee/Attendance";
import ApplyLeave from "./component/employee/ApplyLeave";
import EmployeeOnboarding from "./component/admin/EmployeeOnboarding";
import EmployeeManagement from "./component/admin/EmployeeManagement";
import EmployeeReporting from "./component/admin/EmployeeReporting";
import LeaveManagement from "./component/manager/LeaveManagement";
import LeaveReporting from "./component/manager/LeaveReporting";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import ManagerDashboard from "./component/manager/ManagerDashboard";
import ManagerOnboarding from "./component/admin/ManagerOnboarding";
import Odiclogin from "./component/Odiclogin";
import { AuthProvider, useAuth } from "./component/AuthContext";
import Callback from "./component/Callback";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();
  return user ? <Component {...rest} /> : <Navigate to="/" />;
};

const RouterPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />

        {/* Employee Pages */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/apply-leave" element={<ApplyLeave/>} />

        {/* Admin Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/employee-onboarding" element={<EmployeeOnboarding/>} />
        <Route path="/employee-management" element={<EmployeeManagement/>} />
        <Route path="/employee-reporting" element={<EmployeeReporting/>} />
        <Route path="/manager-onboarding" element={<ManagerOnboarding/>} />

        {/* Manager Pages */}
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/leave-management" element={<LeaveManagement/>} />
        <Route path="/leave-reporting" element={<LeaveReporting />} />
      </Routes>
    </Router>
  );
};

// const RouterPage = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/callback" element={<Callback />} />

//           {/* Employee Pages */}
//           <Route path="/employee-dashboard" element={EmployeeDashboard}/>
//           <Route path="/attendance" element={Attendance}/>
//           <Route path="/apply-leave" element={ApplyLeave}/>

//           {/* Admin Pages */}
//           <Route path="/admin-dashboard" element={AdminDashboard}/>
//           <Route path="/employee-onboarding" element={EmployeeOnboarding}/>
//           <Route path="/employee-management" element={EmployeeManagement}/>
//           <Route path="/employee-reporting" element={EmployeeReporting}/>
//           <Route path="/manager-onboarding" element={ManagerOnboarding}/>

//           {/* Manager Pages */}
//           <Route path="/manager-dashboard" element={ManagerDashboard}/>
//           <Route path="/leave-management" element={LeaveManagement}/>
//           <Route path="/leave-reporting" element={LeaveReporting}/>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

export default RouterPage;
