import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddOrderDetails from './AddOrderDetails';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const OrderDetailsHistory = () => {
    const [orderDetailsList, setOrderDetailsList] = useState([]);
    const [editingOrderDetail, setEditingOrderDetail] = useState(null);

    useEffect(() => {
        fetchOrderDetailsList();
    }, []);

    const fetchOrderDetailsList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/order-details');
            setOrderDetailsList(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleOrderDetailAdded = (newOrderDetail) => {
        setOrderDetailsList([...orderDetailsList, newOrderDetail]);
    };

    const handleEditClick = (orderDetail) => {
        setEditingOrderDetail(orderDetail);
    };

    const handleUpdateOrderDetail = async (updatedOrderDetail) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/order-details/${updatedOrderDetail.id}`, updatedOrderDetail);
            setOrderDetailsList(orderDetailsList.map(detail => detail.id === updatedOrderDetail.id ? response.data : detail));
            setEditingOrderDetail(null);
            toast.success('Order detail updated successfully!');
        } catch (error) {
            console.error('Error updating order detail:', error);
            toast.error('Error updating order detail. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/order-details/${id}`);
            setOrderDetailsList(orderDetailsList.filter(detail => detail.id !== id));
            toast.success('Order detail deleted successfully!');
        } catch (error) {
            console.error('Error deleting order detail:', error);
            toast.error('Error deleting order detail. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddOrderDetails
                onOrderDetailAdded={handleOrderDetailAdded}
                editingOrderDetail={editingOrderDetail}
                onOrderDetailUpdated={handleUpdateOrderDetail}
                setEditingOrderDetail={setEditingOrderDetail}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Products</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orderDetailsList.map((orderDetail) => (
                                <tr key={orderDetail.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderDetail.orderedProducts}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderDetail.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderDetail.unitPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{orderDetail.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(orderDetail)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(orderDetail.id)} color="secondary">
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

export default OrderDetailsHistory;
