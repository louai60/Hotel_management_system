import React from 'react';
import RoomLayout from './RoomLayout';
import RoomHistory from './Components/RoomHistory';

const RoomDashboard = () => {
    return (
        <RoomLayout>
            <div className="relative ">
            </div>
            <div>
                <RoomHistory />
            </div>
        </RoomLayout>
    );
}

export default RoomDashboard;
