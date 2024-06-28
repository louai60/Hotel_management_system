import React from 'react';
import AdminLayout from './AdminLayout';
import DashboardCard07 from './dashboard/DashboardCard07';
import DashboardCard08 from './dashboard/DashboardCard08';
import DashboardCard09 from './dashboard/DashboardCard09';
import DashboardCard10 from './dashboard/DashboardCard10';
import DashboardCard13 from './dashboard/DashboardCard13';
import DashboardCard12 from './dashboard/DashboardCard12';
import DashboardCard11 from './dashboard/DashboardCard11';
import MaintenanceList from '../Dashboards/Maintenance/components/MaintenanceList';
import AccountingList from '../Dashboards/Accounting/Components/AccountingList';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="relative ">
      </div>
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard07 />

        {/* Line chart (Sales Over Time) */}
        <DashboardCard08 />
        {/* Stacked bar chart (Sales VS Refunds) */}
        <DashboardCard09 />
        {/* Maintenance */}
        <MaintenanceList />
        {/* Card (Customers) */}
        <DashboardCard10 />
        {/* Card (Reasons for Refunds) */}
        <DashboardCard11 />
        {/* AccountingList */}
        <AccountingList />
        {/* Card (Recent Activity) */}
        <DashboardCard12 />
        {/* Card (Income/Expenses) */}
        <DashboardCard13 />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
