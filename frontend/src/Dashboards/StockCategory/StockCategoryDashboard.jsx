import React from 'react'
import StockCategoryLayout from './StockCategoryLayout';
import StockCategoryHistory from './Components/StockCategoryHistory';

const StockCategoryDashboard = () => {
    return (
        <StockCategoryLayout>
            <div className="relative ">
            </div>
            <div>
                <StockCategoryHistory />
            </div>
        </StockCategoryLayout>
    )
}

export default StockCategoryDashboard