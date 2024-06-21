import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import DashboardTemplate from './components/DashboardTemplate';
// import ReceptionDashboard from './components/ReceptionDashboard';
import PendingUsersTable from "./partials/dashboard/PendingUsers";
import Landing_page from "./home";
import Login from './pages/Login';
import Signup from "./pages/register";

import "./css/style.css";
import HouseKeepingDashboard from "./Dashboards/HouseKeeping/HouseKeepingDashboard";
import ReceptionDashboard from './Dashboards/Reception/ReceptionDashboard';
import MaintenanceDashboard from './Dashboards/Maintenance/MaintenanceDashboard';
import Test from './Dashboards/Maintenance/Test';
import AccountingDashboard from './Dashboards/Accounting/AccountingDashboard';

const getUserRolePath = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.roles || [];

  const roleToPathMap = {
    ROLE_ADMIN: '/admin',
    ROLE_RECEPTIONIST: '/reception',
    ROLE_HOUSEKEEPING: '/housekeeping',
    ROLE_ACCOUNTING: '/accounting',
    ROLE_TECHNICIAN: '/maintenance',
    // ...
  };

  const userRole = roles.find(role => roleToPathMap[role]);
  return roleToPathMap[userRole] || '/unauthorized';
};

const App = () => {
  const userRolePath = getUserRolePath();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing_page />} />
        <Route exact path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/admin" element={<Dashboard />} />
        <Route path="/pending" element={<PendingUsersTable />} />
        <Route path="/unauthorized" element={<div>Unauthorized access</div>} />

        <Route path="/admin" element={
          userRolePath === '/admin' ? (
            <Dashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/reception" element={
          userRolePath === '/admin' || userRolePath === '/reception' ? (
            <ReceptionDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/housekeeping" element={
          userRolePath === '/admin' || userRolePath === '/housekeeping' ? (
            <HouseKeepingDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/maintenance" element={
          userRolePath === '/admin' || userRolePath === '/maintenance' ? (
            <MaintenanceDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/accounting" element={
          userRolePath === '/admin' || userRolePath === '/accounting' ? (
            <AccountingDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
