import React from 'react';
import ReceptionLayout from './ReceptionLayout';
import AddReception from './Components/AddReception';
import ReservationHistory from './Components/ReservationHistory';
import AddPayment from '../Payment/Components/AddPayment';
import PaymentHistory from '../Payment/Components/PaymentHistory';

const ReceptionDashboard = () => {
  return (
    <ReceptionLayout>
      <div className="relative ">
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <AddReception />
          {/* <ReservationHistory /> */}
          <div className="relative ">
          </div>
          <div>
            <PaymentHistory />
          </div>

        </header>
      </div>
    </ReceptionLayout>
  );
}

export default ReceptionDashboard;
