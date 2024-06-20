import React from 'react'

import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import AccountingSidebar from './AccountingSidebar'
import AccountingHeader from './AccountingHeader'
import AccountingStatus from './Components/AccountingStatus'

const AccountingDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    AccountingDashboard
    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <AccountingSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <AccountingHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Dashboard actions */}
                        {/* <div className="sm:flex sm:justify-between sm:items-center mb-8"> */}

                        {/* Left: Avatars */}
                        {/* <DashboardAvatars /> */}

                        <AccountingStatus />


                        {/* </div> */}
                    </div>
                </main>


            </div>
        </div>
    );
}

export default AccountingDashboard