import React from 'react';
import OrderDetailsLayout from './OrderDetailsLayout';
import OrderDetailsHistory from './Components/OrderDetailsHistory';

const OrderDetailsDashboard = () => {
    return (
        <OrderDetailsLayout>
            <div className="relative ">
            </div>
            <div>
                <OrderDetailsHistory />
            </div>
        </OrderDetailsLayout>
    );
}

export default OrderDetailsDashboard;
