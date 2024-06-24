import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import TitleCard from "../../../components/Cards/TitleCard";
import AddHouseKeepingService from './AddHouseKeepingService';

const HouseKeepingServiceHistory = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/house-keeping-services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Error fetching services. Please try again later.');
        }
    };

    const handleServiceAdded = (newService) => {
        setServices([...services, newService]);
    };

    const handleServiceUpdated = (updatedService) => {
        setServices(services.map(service => service.id === updatedService.id ? updatedService : service));
        setEditingService(null);
    };

    const handleEditClick = (service) => {
        setEditingService(service);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/house-keeping-services/${id}`);
            setServices(services.filter(service => service.id !== id));
            toast.success('Service deleted successfully!');
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Error deleting service. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddHouseKeepingService
                onServiceAdded={handleServiceAdded}
                editingService={editingService}
                onServiceUpdated={handleServiceUpdated}
                setEditingService={setEditingService}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cleaning Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Housekeeping Agent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(service.cleaningDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.houseKeepingAgent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.priority}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(service)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(service.id)} color="secondary">
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

export default HouseKeepingServiceHistory;
