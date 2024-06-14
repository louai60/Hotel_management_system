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
import Dashboard_reception from './pages/Dashboard_reception';
import Dashboard_manger from './pages/Dashboard_manger';
import Dashboard_housekiping from './pages/Dashboard_housekiping';
import Dashboard_chef from './pages/Dashboard_chef';

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
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/reception_workers" element={<Dashboard_reception />} />
        <Route exact path="/manager" element={<Dashboard_manger />} />
        <Route exact path="/housekiping" element={<Dashboard_housekiping />} />
        <Route exact path="/kitechen" element={<Dashboard_chef />} />
      </Routes>
    </>
  );
}

export default App;
