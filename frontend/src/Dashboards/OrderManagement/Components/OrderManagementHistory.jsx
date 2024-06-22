import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddOrderManagement from './AddOrderManagement';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const OrderManagementHistory = () => {
    const [orderManagements, setOrderManagements] = useState([]);
    const [editingOrderManagement, setEditingOrderManagement] = useState(null);

    useEffect(() => {
        fetchOrderManagements();
    }, []);

    const fetchOrderManagements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/OrderManagements');
            setOrderManagements(response.data);
        } catch (error) {
            console.error('Error fetching order managements:', error);
        }
    };

    const handleOrderManagementAdded = (newOrderManagement) => {
        setOrderManagements([...orderManagements, newOrderManagement]);
    };

    const handleEditClick = (orderManagement) => {
        setEditingOrderManagement(orderManagement);
    };

    const handleUpdateOrderManagement = async (updatedOrderManagement) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/OrderManagements/${updatedOrderManagement.id}`, updatedOrderManagement);
            setOrderManagements(orderManagements.map(om => om.id === updatedOrderManagement.id ? response.data : om));
            setEditingOrderManagement(null);
        } catch (error) {
            console.error('Error updating order management:', error);
            toast.error('Error updating order management. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/OrderManagements/${id}`);
            setOrderManagements(orderManagements.filter(om => om.id !== id));
            toast.success('Order management deleted successfully!');
        } catch (error) {
            console.error('Error deleting order management:', error);
            toast.error('Error deleting order management. Please try again later.');
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddOrderManagement
                onOrderManagementAdded={handleOrderManagementAdded}
                editingOrderManagement={editingOrderManagement}
                onOrderManagementUpdated={handleUpdateOrderManagement}
                setEditingOrderManagement={setEditingOrderManagement}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requesting Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt Confirmation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orderManagements.map((orderManagement) => (
                                <tr key={orderManagement.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(orderManagement.orderDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderManagement.supplier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderManagement.requestingDepartment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderManagement.orderStatus}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderManagement.receiptConfirmation ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(orderManagement)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(orderManagement.id)} color="secondary">
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

export default OrderManagementHistory;
