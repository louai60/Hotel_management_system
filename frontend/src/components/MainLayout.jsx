// MainLayout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginRight: '10px' }}>
              <NavLink to="/admin" style={{ color: '#fff' }}>Admin</NavLink>
            </li>
            <li style={{ marginRight: '10px' }}>
              <NavLink to="/reception" style={{ color: '#fff' }}>Reception</NavLink>
            </li>
            <li style={{ marginRight: '10px' }}>
              <NavLink to="/housekeeping" style={{ color: '#fff' }}>Housekeeping</NavLink>
            </li>
            <li>
              <NavLink to="/maintenance" style={{ color: '#fff' }}>Maintenance</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <nav style={{ width: '200px', background: '#f0f0f0', padding: '10px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/admin">Admin</NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/reception">Reception</NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/housekeeping">Housekeeping</NavLink>
            </li>
            <li>
              <NavLink to="/maintenance">Maintenance</NavLink>
            </li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: '10px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
