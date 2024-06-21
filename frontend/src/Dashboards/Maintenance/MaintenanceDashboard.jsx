import React from 'react';
import MaintenanceLayout from './MaintenanceLayout';
import MaintenanceHistory from './components/MaintenanceHistory';
import AddMaintenance from './components/AddMaintenance';

const MaintenanceDashboard = () => {
  return (
    <MaintenanceLayout>
      <div className="relative ">
      </div>
        <div>
          <MaintenanceHistory />
        </div>
    </MaintenanceLayout>
  );
}

export default MaintenanceDashboard;
