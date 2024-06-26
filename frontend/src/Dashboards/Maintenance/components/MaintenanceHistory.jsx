import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleCard from '../../../components/Cards/TitleCard';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import AddMaintenance from './AddMaintenance';

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
      toast.error('Error fetching maintenances.');
    }
  };

  const handleMaintenanceAdded = (newMaintenance) => {
    setMaintenances([...maintenances, newMaintenance]);
    toast.success('Maintenance added successfully!');
  };

  const handleEditClick = (maintenance) => {
    setEditingMaintenance(maintenance);
  };

  const handleUpdateMaintenance = async (updatedMaintenance) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/maintenance/${updatedMaintenance.id}`, updatedMaintenance);
      setMaintenances(maintenances.map(m => m.id === updatedMaintenance.id ? response.data : m));
      setEditingMaintenance(null);
      toast.success('Maintenance updated successfully!');
    } catch (error) {
      console.error('Error updating maintenance:', error);
      toast.error('Error updating maintenance.');
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/maintenance/${id}`);
      setMaintenances(maintenances.filter(m => m.id !== id));
      toast.success('Maintenance deleted successfully!');
    } catch (error) {
      console.error('Error deleting maintenance:', error);
      toast.error('Error deleting maintenance.');
    }
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Maintenance</h2>
      </header>
      <div className="p-3 flex flex-col items-end px-4 pt-4">
        <AddMaintenance
          onMaintenanceAdded={handleMaintenanceAdded}
          editingMaintenance={editingMaintenance}
          onMaintenanceUpdated={handleUpdateMaintenance}
          setEditingMaintenance={setEditingMaintenance}
        />
        <TitleCard>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Intervention Date</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Location</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Responsible Technician</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Priority</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {maintenances.map((maintenance) => (
                  <tr key={maintenance.id}>
                    <td className="p-2">
                      <div className="px-6 py-4 whitespace-nowrap">{new Date(maintenance.interventionDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-2">
                      <div className="px-6 py-4 whitespace-nowrap">{maintenance.location}</div>
                    </td>
                    <td className="p-2">
                      <div className="px-6 py-4 whitespace-nowrap">{maintenance.responsibleTechnician}</div>
                    </td>
                    <td className="p-2">
                      <div className="px-6 py-4 whitespace-nowrap">{maintenance.priority}</div>
                    </td>
                    <td className="p-2 space-x-2">
                      <Button onClick={() => handleEditClick(maintenance)} color="primary" >
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteClick(maintenance.id)} color="secondary" >
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
    </div>
  );
};

export default MaintenanceHistory;
