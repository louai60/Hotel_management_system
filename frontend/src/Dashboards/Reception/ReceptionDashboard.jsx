import React, { useState } from 'react';


import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import ReceptionSidebar from './ReceptionSidebar'
import ReceptionHeader from './ReceptionHeader'
import Reception from './Components/Reception'


function ReceptionDashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <ReceptionSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <ReceptionHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            {/* <div className="sm:flex sm:justify-between sm:items-center mb-8"> */}

            {/* Left: Avatars */}
            {/* <DashboardAvatars /> */}

            <Reception />


            {/* </div> */}
          </div>
        </main>


      </div>
    </div>
  );
}

export default ReceptionDashboard;