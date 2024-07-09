import React from 'react';
import AdminLayout from './AdminLayout';
import DashboardCard01 from './dashboard/DashboardCard01';
import DashboardCard02 from './dashboard/DashboardCard02';
import DashboardCard03 from './dashboard/DashboardCard03';
import DashboardCard08 from './dashboard/DashboardCard08';
import DashboardCard09 from './dashboard/DashboardCard09';
import DashboardCard10 from './dashboard/DashboardCard10';
import DashboardCard11 from './dashboard/DashboardCard11';
import DashboardCard12 from './dashboard/DashboardCard12';
import DashboardCard13 from './dashboard/DashboardCard13';
import MaintenanceList from './dashboard/MaintenanceList';
import AccountingList from './dashboard/AccountingList';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="relative ">
      </div>
        <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-12"> 
              <DashboardCard08 />
        </div>
          {/* <DashboardCard01 />
          <DashboardCard02 />
          <DashboardCard03 /> */}
          {/* Line chart (Sales Over Time) */}
          {/* <DashboardCard08 /> */}
          {/* Stacked bar chart (Sales VS Refunds) */}
          {/* <DashboardCard09 /> */}
          
          {/* Card (Customers) */}
          <DashboardCard10 />
          {/* Card (Reasons for Refunds) */}
          {/* <DashboardCard11 /> */}
          <AccountingList />
          <MaintenanceList />
          {/* Card (Recent Activity) */}
          {/* <DashboardCard12 /> */}
          {/* Card (Income/Expenses) */}
          {/* <DashboardCard13 /> */}
    </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
