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
            toast.error('Error fetching order managements.');
        }
    };

    const handleOrderManagementAdded = (newOrderManagement) => {
        setOrderManagements([...orderManagements, newOrderManagement]);
        toast.success('Order management added successfully!');
    };

    const handleEditClick = (orderManagement) => {
        setEditingOrderManagement(orderManagement);
    };

    const handleUpdateOrderManagement = async (updatedOrderManagement) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/OrderManagements/${updatedOrderManagement.id}`, updatedOrderManagement);
            setOrderManagements(orderManagements.map(om => om.id === updatedOrderManagement.id ? response.data : om));
            setEditingOrderManagement(null);
            toast.success('Order management updated successfully!');
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

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    };

    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Order Management</h2>
            </header>
            <div className="p-3 flex flex-col items-end px-4 pt-4">
                <AddOrderManagement
                    onOrderManagementAdded={handleOrderManagementAdded}
                    editingOrderManagement={editingOrderManagement}
                    onOrderManagementUpdated={handleUpdateOrderManagement}
                    setEditingOrderManagement={setEditingOrderManagement}
                />
                <TitleCard>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full dark:text-slate-300">
                            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                                <tr>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Order Date</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Supplier</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Requesting Department</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Order Status</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Receipt Confirmation</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Actions</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                {orderManagements.map((orderManagement) => (
                                    <tr key={orderManagement.id}>
                                        <td className="p-2">
                                            <div className="text-slate-800 dark:text-slate-100">{formatDate(orderManagement.orderDate)}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-slate-800 dark:text-slate-100">{orderManagement.supplier}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-slate-800 dark:text-slate-100">{orderManagement.requestingDepartment}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-slate-800 dark:text-slate-100">{orderManagement.orderStatus}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-slate-800 dark:text-slate-100">{orderManagement.receiptConfirmation ? 'Yes' : 'No'}</div>
                                        </td>
                                        <td className="p-2">
                                            <Button onClick={() => handleEditClick(orderManagement)} variant="contained" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteClick(orderManagement.id)} variant="contained" color="secondary">
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

export default OrderManagementHistory;
