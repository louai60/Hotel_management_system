import React from 'react';
import OrderManagementLayout from './OrderManagementLayout';
import OrderManagementHistory from './Components/OrderManagementHistory';

const OrderManagementDashboard = () => {
    return (
        <OrderManagementLayout>
            <div className="relative ">
            </div>
            <div>
                <OrderManagementHistory />
            </div>
        </OrderManagementLayout>
    );
}

export default OrderManagementDashboard