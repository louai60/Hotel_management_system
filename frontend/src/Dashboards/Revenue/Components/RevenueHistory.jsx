import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TitleCard from '../../../components/Cards/TitleCard';
import AddRevenue from './AddRevenue';
import { toast } from 'react-toastify';

const RevenueHistory = () => {
    const [revenues, setRevenues] = useState([]);
    const [editingRevenue, setEditingRevenue] = useState(null);
    const [updateData, setUpdateData] = useState(false);

    useEffect(() => {
        fetchRevenues();
    }, [updateData]);

    const fetchRevenues = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/revenues');
            setRevenues(response.data);
        } catch (error) {
            console.error('Error fetching revenues:', error);
            toast.error('Error fetching revenues. Please try again later.');
        }
    };

    const handleRevenueAdded = (newRevenue) => {
        setRevenues([...revenues, newRevenue]);
        setUpdateData(!updateData);
    };

    const handleEditClick = (revenue) => {
        setEditingRevenue(revenue);
    };

    const handleUpdateRevenue = async (updatedRevenue) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/revenues/${updatedRevenue.id}`, updatedRevenue);
            setRevenues(revenues.map(r => r.id === updatedRevenue.id ? response.data : r));
            setEditingRevenue(null);
            toast.success('Revenue updated successfully!');
        } catch (error) {
            console.error('Error updating revenue:', error);
            toast.error('Error updating revenue. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/revenues/${id}`);
            setRevenues(revenues.filter(revenue => revenue.id !== id));
            toast.success('Revenue deleted successfully!');
        } catch (error) {
            console.error('Error deleting revenue:', error);
            toast.error('Error deleting revenue. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddRevenue
                onRevenueAdded={handleRevenueAdded}
                editingRevenue={editingRevenue}
                onRevenueUpdated={handleUpdateRevenue}
                setEditingRevenue={setEditingRevenue}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indirect Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {revenues.map((revenue) => (
                                <tr key={revenue.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{revenue.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{revenue.directRevenue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{revenue.indirectRevenue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <Button onClick={() => handleEditClick(revenue)} color="primary" variant="outlined" size="small">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(revenue.id)} color="secondary" variant="outlined" size="small">
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

export default RevenueHistory;
