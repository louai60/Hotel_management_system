import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import PendingUsersTable from "./partials/components/PendingUsers";
import LandingPage from "./home";
import Login from './pages/Login';
import Signup from "./pages/register";
import HouseKeepingDashboard from "./Dashboards/HouseKeeping/HouseKeepingDashboard";
import ReceptionDashboard from './Dashboards/Reception/ReceptionDashboard';
import MaintenanceDashboard from './Dashboards/Maintenance/MaintenanceDashboard';
import AccountingDashboard from './Dashboards/Accounting/AccountingDashboard';
import StockCategoryDashboard from './Dashboards/StockCategory/StockCategoryDashboard';
import Test from './Dashboards/Maintenance/Test';
import "./css/style.css";
import StockItemDashboard from './Dashboards/StockItem/StockItemDashboard';
import OrderManagementDashboard from './Dashboards/OrderManagement/OrderManagementDashboard';
import PaymentDashboard from './Dashboards/Payment/PaymentDashboard';
import ResetPasswordForm from './pages/ResetPasswordForm';
import RequestResetPasswordPage from './pages/RequestResetPasswordPage';
import DescriptionOfTheInterventionDashboard from './Dashboards/DescriptionOfTheIntervent/DescriptionOfTheInterventDashboard';
import AdminDashboard from './partials/AdminDashboard';
import FollowUpAndValidationDashboard from './Dashboards/FollowUpAndValidation/FollowUpAndValidationDashboard';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.roles || [];

  const roleToPathMap = {
    ROLE_ADMIN: '/admin',
    ROLE_RECEPTIONIST: '/reception',
    ROLE_HOUSEKEEPING: '/housekeeping',
    ROLE_TECHNICIAN: '/maintenance',
    ROLE_ACCOUNTING: '/accounting',
    // Add more roles as necessary
  };

  const getUserRolePath = () => {
    const userRole = roles.find(role => roleToPathMap[role]);
    return roleToPathMap[userRole] || '/unauthorized';
  };

  const userRolePath = getUserRolePath();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-reset-password" element={<RequestResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/admin" element={
          userRolePath === '/admin' ? (
            <AdminDashboard />
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

        <Route path="/stockcategory" element={
          userRolePath === '/admin' || userRolePath === '/stockcategory' ? (
            <StockCategoryDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/stockitem" element={
          userRolePath === '/admin' || userRolePath === '/stockitem' ? (
            <StockItemDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/ordermanagement" element={
          userRolePath === '/admin' || userRolePath === '/ordermanagement' ? (
            <OrderManagementDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/payment" element={
          userRolePath === '/admin' || userRolePath === '/payment' ? (
            <PaymentDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/descriptionoftheintervention" element={
          userRolePath === '/admin' || userRolePath === '/descriptionoftheintervention' ? (
            <DescriptionOfTheInterventionDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/followupandvalidation" element={
          userRolePath === '/admin' || userRolePath === '/followupandvalidation' ? (
            <FollowUpAndValidationDashboard Dashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/admin/pending" element={<PendingUsersTable />} />
        <Route path="/unauthorized" element={<div>Unauthorized access</div>} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
