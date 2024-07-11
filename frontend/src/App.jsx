import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PendingUsersTable from "./partials/components/PendingUsers";
import LandingPage from "./home";
import Login from './pages/Login';
import Signup from "./pages/register";
import AddEmployee from "./partials/components/AddEmployee";
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
import CleaningDetailDashboard from './Dashboards/CleaningDetail/CleaningDetailDashboard';
import FollowUpAndValidationDashboard from './Dashboards/FollowUpAndValidation/FollowUpAndValidationDashboard';
import OrderDetailsDashboard from './Dashboards/OrderDetails/OrderDetailsDashboard';
import HouseKeepingServiceDashboard from './Dashboards/HouseKeepingService/HouseKeepingServiceDashboard';
import PoolDashboard from './Dashboards/Pool/PoolDashboard';
import RestaurantDashboard from './Dashboards/Restaurant/RestaurantDashboard';
import RoomDashboard from './Dashboards/Room/RoomDashboard';
import RoomTypeDashboard from './Dashboards/RoomType/RoomTypeDashboard';
import Unauthorized from './components/Unauthorized';
import PaymentForm from './pages/Payment';
import UserList from './partials/Chat/UserList';
import ChatBox from './partials/Chat/ChatBox';
import Chat from './partials/Chat/Chat';
import RevenueDashboard from './Dashboards/Revenue/RevenueDashboard';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.roles || [];

  const roleToPathMap = {
    ROLE_ADMIN: '/admin',
    ROLE_RECEPTIONIST: '/reception',
    ROLE_HOUSEKEEPING: '/housekeeping',
    ROLE_TECHNICIAN: '/maintenance',
    ROLE_ACCOUNTING: '/accounting',
  };

  const getUserRolePath = () => {
    const userRole = roles.find(role => roleToPathMap[role]);
    return roleToPathMap[userRole] || '/unauthorized';
  };

  const userRolePath = getUserRolePath();

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-reset-password" element={<RequestResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />

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
            <FollowUpAndValidationDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/cleaningdetail" element={
          userRolePath === '/admin' || userRolePath === '/cleaningdetail' ? (
            <CleaningDetailDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/orderdetails" element={
          userRolePath === '/admin' || userRolePath === '/orderdetails' ? (
            <OrderDetailsDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/housekeepingservice" element={
          userRolePath === '/admin' || userRolePath === '/housekeepingservice' ? (
            <HouseKeepingServiceDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/pool" element={
          userRolePath === '/admin' || userRolePath === '/pool' ? (
            <PoolDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/restaurant" element={
          userRolePath === '/admin' || userRolePath === '/restaurant' ? (
            <RestaurantDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/roomtype" element={
          userRolePath === '/admin' || userRolePath === '/roomtype' ? (
            <RoomTypeDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/room" element={
          userRolePath === '/admin' || userRolePath === '/room' ? (
            <RoomDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/revenue" element={
          userRolePath === '/admin' || userRolePath === '/revenue' ? (
            <RevenueDashboard />
          ) : (
            <Navigate to="/unauthorized" />
          )
        } />

        <Route path="/admin/pending" element={<PendingUsersTable />} />
        <Route path="/admin/addEmployee" element={<AddEmployee />} />
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
