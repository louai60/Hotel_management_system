import React from 'react';
import AdminLayout from './AdminLayout';
import DashboardCard07 from './dashboard/DashboardCard07';
import DashboardCard08 from './dashboard/DashboardCard08';
import DashboardCard09 from './dashboard/DashboardCard09';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="relative ">
      </div>
        <div className="grid gap-6">

              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <div className="grid grid-cols-12 gap-6">

                <DashboardCard08 />
                {/* Stacked bar chart (Sales VS Refunds) */}
                  <DashboardCard09 />
                  {/* Card (Customers) */}
                  {/* <DashboardCard10 /> */}
                  {/* Card (Reasons for Refunds) */}
                  {/* <DashboardCard11 /> */}
                  {/* Card (Recent Activity) */}
                  {/* <DashboardCard12 /> */}
                  {/* Card (Income/Expenses) */}
                  {/* <DashboardCard13 /> */}
              </div>
        </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
