import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddMaintenance from './AddMaintenance'; 
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const MaintenanceHistory = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [editingMaintenance, setEditingMaintenance] = useState(null);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/maintenance');
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenances:', error);
    }
  };

  const handleMaintenanceAdded = (newMaintenance) => {
    setMaintenances([...maintenances, newMaintenance]);
  };

  const handleEditClick = (maintenance) => {
    setEditingMaintenance(maintenance);
  };

  const handleUpdateMaintenance = async (updatedMaintenance) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/maintenance/${updatedMaintenance.id}`, updatedMaintenance);
      setMaintenances(maintenances.map(maintenance => maintenance.id === updatedMaintenance.id ? response.data : maintenance));
      setEditingMaintenance(null);
      toast.success('Maintenance updated successfully!');
    } catch (error) {
      console.error('Error updating maintenance:', error);
      toast.error('Error updating maintenance. Please try again later.');
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/maintenance/${id}`);
      setMaintenances(maintenances.filter(maintenance => maintenance.id !== id));
      toast.success('Maintenance deleted successfully!');
    } catch (error) {
      console.error('Error deleting maintenance:', error);
      toast.error('Error deleting maintenance. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-end px-4 pt-4">
      <AddMaintenance 
        onMaintenanceAdded={handleMaintenanceAdded} 
        editingMaintenance={editingMaintenance}
        onMaintenanceUpdated={handleUpdateMaintenance}
        setEditingMaintenance={setEditingMaintenance}
      /> 
      <TitleCard>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsible Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {maintenances.map((maintenance) => (
                <tr key={maintenance.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(maintenance.interventionDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.responsibleTechnician}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maintenance.priority}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button onClick={() => handleEditClick(maintenance)} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(maintenance.id)} color="secondary">
                      Delete
                    </Button>
                  </td>
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
