import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MaintenanceList = () => {
    const [maintenances, setMaintenances] = useState([]);

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
        
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Maintenance</h2>
            </header>

            <div className="overflow-x-auto p-4">
                <table className="table-auto w-full text-sm dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                        <tr>
                            <th className="px-2 py-1">
                                <div className="font-semibold text-left">Intervention Date</div>
                            </th>
                            <th className="px-2 py-1">
                                <div className="font-semibold text-left">Location</div>
                            </th>
                            <th className="px-2 py-1">
                                <div className="font-semibold text-left">Responsible Technician</div>
                            </th>
                            <th className="px-2 py-1">
                                <div className="font-semibold text-left">Priority</div>
                            </th>
                            {/* <th className="px-2 py-1">
                                <div className="font-semibold text-left">Actions</div>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {maintenances.map((maintenance) => (
                            <tr key={maintenance.id}>
                                <td className="px-2 py-1 whitespace-nowrap">{new Date(maintenance.interventionDate).toLocaleDateString()}</td>
                                <td className="px-2 py-1 whitespace-nowrap">{maintenance.location}</td>
                                <td className="px-2 py-1 whitespace-nowrap">{maintenance.responsibleTechnician}</td>
                                <td className="px-2 py-1 whitespace-nowrap">{maintenance.priority}</td>
                                {/* <td className="px-2 py-1 space-x-2">
                                    <button
                                        onClick={() => handleEditClick(maintenance)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(maintenance.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceList;