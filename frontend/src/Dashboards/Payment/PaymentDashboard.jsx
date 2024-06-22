import React from 'react';
import PaymentLayout from './PaymentLayout';
import PaymentHistory from './Components/PaymentHistory';

const PaymentDashboard = () => {
    return (
        <PaymentLayout>
            <div className="relative ">
            </div>
            <div>
                <PaymentHistory />
            </div>
        </PaymentLayout>
    );
}

export default PaymentDashboard