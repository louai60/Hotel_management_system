import React from 'react';
import PoolLayout from './PoolLayout';
import PoolHistory from './Components/PoolHistory';

const PoolDashboard = () => {
    return (
        <PoolLayout>
            <div className="relative ">
            </div>
            <div>
                <PoolHistory />
            </div>
        </PoolLayout>
    );
}

export default PoolDashboard;
