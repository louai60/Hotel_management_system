import React from 'react';
import RestaurantLayout from './RestaurantLayout';
import RestaurantHistory from './Components/RestaurantHistory';

const RestaurantDashboard = () => {
    return (
        <RestaurantLayout>
            <div className="relative ">
            </div>
            <div>
                <RestaurantHistory />
            </div>
        </RestaurantLayout>
    );
}

export default RestaurantDashboard;
