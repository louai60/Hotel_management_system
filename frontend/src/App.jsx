// import React, { useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// import "./css/style.css";

// import "./charts/ChartjsConfig";

// // Import pages
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Signup from "./pages/register";
// import CurrentUserDisplay from "./pages/CurrentUser";
// import PendingUsersTable from "./pages/PendingUsers";
// import Accounting from "./pages/Accounting";
// import Maintenance from "./Dashboards/Maintenance/Maintenance";
// import HouseKeeping from "./Dashboards/HouseKeeping/HouseKeeping";
// import Landing_page from "./home";

// function App() {
//   const location = useLocation();

//   useEffect(() => {
//     document.querySelector("html").style.scrollBehavior = "auto";
//     window.scroll({ top: 0 });
//     document.querySelector("html").style.scrollBehavior = "";
//   }, [location.pathname]); // triggered on route change

//   return (
//     <>
//       <Routes>
//       <Route exact path="/" element={<Landing_page />} />
//         <Route exact path="/dashboard" element={<Dashboard />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/register" element={<Signup />} />
//         <Route exact path="/user" element={<CurrentUserDisplay />} />
//         <Route path="/pending" element={<PendingUsersTable />} />
//         <Route path="/accounting" element={<Accounting />} />
//         <Route path="/housekeeping" element={<HouseKeeping />} />

//         <Route path="/maintenance" element={<Maintenance />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import DashboardTemplate from './components/DashboardTemplate';
// import ReceptionDashboard from './components/ReceptionDashboard';
import PendingUsersTable from "./pages/PendingUsers";
import Landing_page from "./home";
import Login from './pages/Login';
import Signup from "./pages/register";

import "./css/style.css";
import HouseKeepingDashboard from "./Dashboards/HouseKeeping/HouseKeepingDashboard";

const getUserRolePath = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.roles || [];

  const roleToPathMap = {
    ROLE_ADMIN: '/admin',
    ROLE_RECEPTIONIST: '/reception',
    ROLE_HOUSEKEEPING: '/housekeeping',
    // ...
  };

  const userRole = roles.find(role => roleToPathMap[role]);
  return roleToPathMap[userRole] || '/unauthorized';
};
// console.log(userRole)

const App = () => {
  const userRolePath = getUserRolePath();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing_page />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/pending" element={<PendingUsersTable />} />
        <Route path="/unauthorized" element={<div>Unauthorized access</div>} />

        <Route path="/admin" element={
          userRolePath === '/admin' ? (
            <Dashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        {/* <Route path="/reception" element={
          userRolePath === '/admin' || userRolePath === '/reception' ? (
            <DashboardTemplate title="Reception Dashboard">
              <ReceptionDashboard />
            </DashboardTemplate>
          ) : (
            <Navigate to="/unauthorized" />
          )
        } /> */}

        <Route path="/housekeeping" element={
          userRolePath === '/admin' || userRolePath === '/housekeeping' ? (
            // <DashboardTemplate title="Housekeeping Dashboard">
            <HouseKeepingDashboard />
            // </DashboardTemplate>
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />


        {/* Default route */}
        <Route path="*" element={<Navigate to="/" replace />} />



        <Route path="/accounting" element={
          userRolePath === '/admin' || userRolePath === '/accounting' ? (
            // <DashboardTemplate title="Housekeeping Dashboard">
            <AccountingDashboard />
            // </DashboardTemplate>
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />


      </Routes>
    </Router>
  );
};

export default App;
