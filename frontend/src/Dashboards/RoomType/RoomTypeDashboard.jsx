import React from "react";
import RoomTypeLayout from "./RoomTypeLayout";
import RoomTypeHistory from "./Components/RoomTypesHistory";

const RoomTypeDashboard = () => {
    return (
        <RoomTypeLayout>
            <div className="relative ">
            </div>
            <div>
                <RoomTypeHistory />
            </div>
        </RoomTypeLayout>
    );
}

export default RoomTypeDashboard;
