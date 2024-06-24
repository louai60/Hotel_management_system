import React from 'react';
import HouseKeepingServiceLayout from './HouseKeepingServiceLayout';
import HouseKeepingServiceHistory from "./Components/HouseKeepingServiceHistory";

const HouseKeepingServiceDashboard = () => {
    return (
        <HouseKeepingServiceLayout>
            <div className="relative ">
            </div>
            <div>
                <HouseKeepingServiceHistory />
            </div>
        </HouseKeepingServiceLayout>
    );
}

export default HouseKeepingServiceDashboard;
