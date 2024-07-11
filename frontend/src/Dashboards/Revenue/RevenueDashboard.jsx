import React from 'react';
import RevenueLayout from './RevenueLayout';
import RevenueHistory from './Components/RevenueHistory';

const RevenueDashboard = () => {
    return (
        <RevenueLayout>
            <div className="relative ">
            </div>
            <div>
                <RevenueHistory />
            </div>
        </RevenueLayout>
    );
}

export default RevenueDashboard;
