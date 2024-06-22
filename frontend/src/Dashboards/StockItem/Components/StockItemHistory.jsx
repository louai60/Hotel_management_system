import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import TitleCard from '../../../components/Cards/TitleCard';
import AddStockItem from './AddStockItem';

const StockItemHistory = () => {
    const [stockItems, setStockItems] = useState([]);
    const [editingStockItem, setEditingStockItem] = useState(null);

    useEffect(() => {
        fetchStockItems();
    }, []);

    const fetchStockItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stock-items');
            setStockItems(response.data);
        } catch (error) {
            console.error('Error fetching stock items:', error);
        }
    };

    const handleStockItemAdded = (newStockItem) => {
        setStockItems([...stockItems, newStockItem]);
    };

    const handleEditClick = (stockItem) => {
        setEditingStockItem(stockItem);
    };

    const handleUpdateStockItem = async (updatedStockItem) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/stock-items/${updatedStockItem.id}`, updatedStockItem);
            setStockItems(stockItems.map(item => item.id === updatedStockItem.id ? response.data : item));
            setEditingStockItem(null);
            toast.success('Stock item updated successfully!');
        } catch (error) {
            console.error('Error updating stock item:', error);
            toast.error('Error updating stock item. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/stock-items/${id}`);
            setStockItems(stockItems.filter(item => item.id !== id));
            toast.success('Stock item deleted successfully!');
        } catch (error) {
            console.error('Error deleting stock item:', error);
            toast.error('Error deleting stock item. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddStockItem
                onStockItemAdded={handleStockItemAdded}
                editingStockItem={editingStockItem}
                onStockItemUpdated={handleUpdateStockItem}
                setEditingStockItem={setEditingStockItem}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {stockItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.supplier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.unitPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(item)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(item.id)} color="secondary">
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

export default StockItemHistory;
