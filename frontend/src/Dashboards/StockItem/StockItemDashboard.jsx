import React from 'react';
import StockItemLayout from './StockItemLayout';
import StockItemHistory from './Components/StockItemHistory';

const StockItemDashboard = () => {
    return (
        <StockItemLayout>
            <div className="relative ">
            </div>
            <div>
                <StockItemHistory />
            </div>
        </StockItemLayout>
    );
}

export default StockItemDashboard