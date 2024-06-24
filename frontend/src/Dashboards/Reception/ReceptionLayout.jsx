import React, { useState } from 'react';
import ReceptionHeader from './Components/ReceptionHeader';
import ReceptionSidebar from './Components/ReceptionSidebar';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const ReceptionLayout = ({ children }) => {
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
    
                  {children}
    
    
                {/* </div> */}
              </div>
            </main>
    
    
          </div>
        </div>
      );
}

export default ReceptionLayout;
