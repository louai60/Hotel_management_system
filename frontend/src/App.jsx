import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Admin_Dashboard from './pages/Admin_Dashboard';
import Reception_Dashboard from './pages/Reception_Dashboard';
import Chef_Dashboard from './pages/Chef_Dashboard';
import Home from './Home';
import Login from './pages/Login';
import CurrentUserDisplay from './pages/CurrentUser';
import PendingUsersTable from './pages/PendingUsers';

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Admin_Dashboard />} />
        <Route exact path="/reception" element={<Reception_Dashboard />} />
        <Route exact path="/chef" element={<Chef_Dashboard />} />

        <Route exact path='/user' element={<CurrentUserDisplay />} />
        <Route path='/pending' element={<PendingUsersTable /> } />


      </Routes>
    </>
  );
}

export default App;
