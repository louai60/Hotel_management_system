import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddMaintenance from './AddMaintenance'; 

const MaintenanceHistory = () => {
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/maintenance/all');
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenances:', error);
    }
  };

  const handleMaintenanceAdded = (newMaintenance) => {
    setMaintenances([...maintenances, newMaintenance]);
  };

  return (
    <div className="flex flex-col items-end px-4 pt-4"> {/* Adjust padding as needed */}
      <AddMaintenance onMaintenanceAdded={handleMaintenanceAdded} /> 
      <TitleCard>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsible Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {maintenances.map((maintenance) => (
                <tr key={maintenance.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(maintenance.interventionDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.responsibleTechnician}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </div>
  );
};

export default MaintenanceHistory;
