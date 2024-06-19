import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/register';
import CurrentUserDisplay from './pages/CurrentUser';
import PendingUsersTable from './pages/PendingUsers';
import HouseKeeping from './pages/HouseKeeping';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path='/' element={<Login />} />
        <Route exact path='/register' element={<Signup />} />
        <Route exact path='/user' element={<CurrentUserDisplay />} />
        <Route path='/pending' element={<PendingUsersTable /> } />
        <Route path='/housekeeping' element={<HouseKeeping/>} />

      </Routes>
    </>
  );
}

export default App;


// // App.jsx or main routing file
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import DashboardTemplate from './components/DashboardTemplate';
// import ReceptionDashboard from './components/ReciptionDashboard';
// import HousekeepingDashboard from './components/HouseKeepingDashboard';
// import AdminDashboard from './components/AdminDashboard'; 
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';


// const App = () => {
//   const getUserRole = () => {
//     // Fetch user role from local storage
//     return localStorage.getItem('user');
//   };

//   const userRole = getUserRole();

//   return (
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route exact path="/dashboard" element={<Dashboard />} />
//         <Route path="/unauthorized" element={<div>Unauthorized access</div>} />

//         {/* Admin route */}
//         <Route 
//           path="/admin" 
//           element={
//             userRole === "ROLE_ADMIN" ? (
//               <DashboardTemplate title="Admin Dashboard">
//                 <Dashboard />
//               </DashboardTemplate>
//             ) : (
//               <Navigate to="/unauthorized" />
//             )
//           }
//         />

//         {/* Reception route */}
//         <Route 
//           path="/reception" 
//           element={
//             ["Admin", "Receptionist"].includes(userRole) ? (
//               <DashboardTemplate title="Reception Dashboard">
//                 <ReceptionDashboard />
//               </DashboardTemplate>
//             ) : (
//               <Navigate to="/unauthorized" />
//             )
//           }
//         />

//         {/* Housekeeping route */}
//         <Route 
//           path="/housekeeping" 
//           element={
//             ["Admin", "Housekeeping"].includes(userRole) ? (
//               <DashboardTemplate title="Housekeeping Dashboard">
//                 <HousekeepingDashboard />
//               </DashboardTemplate>
//             ) : (
//               <Navigate to="/unauthorized" />
//             )
//           }
//         />

//         {/* Add more routes for other departments */}
        
//         {/* Default route */}
//         <Route 
//           path="*" 
//           element={<Navigate to="/" replace />} 
//         />
//       </Routes>
//   );
// };

// export default App;
