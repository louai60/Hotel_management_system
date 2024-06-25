import React, { useState } from 'react';
import RestaurantHeader from './Components/RestaurantHeader';
import RestaurantSidebar from './Components/RestaurantSidebar';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const RestaurantLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <RestaurantSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <RestaurantHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

export default RestaurantLayout;
