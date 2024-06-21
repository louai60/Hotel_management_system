import React from 'react';
import AccountingLayout from './AccountingLayout';
import AccountingHistory from './Components/AccountingHistory';
import AddAccounting from './components/AddAccounting';

const AccountingDashboard = () => {
  return (
    <AccountingLayout>
      <div className="relative ">
      </div>
        <div>
          <AccountingHistory />
        </div>
    </AccountingLayout>
  );
}

export default AccountingDashboard;
