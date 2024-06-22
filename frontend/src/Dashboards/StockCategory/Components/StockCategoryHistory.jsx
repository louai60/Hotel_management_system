

import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddStockCategory from './AddStockCategory';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const StockCategoryHistory = () => {
    const [stockCategories, setStockCategories] = useState([]);
    const [editingStockCategory, setEditingStockCategory] = useState(null);

    useEffect(() => {
        fetchStockCategories();
    }, []);

    const fetchStockCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stock-categories');
            setStockCategories(response.data);
        } catch (error) {
            console.error('Error fetching stock categories:', error);
        }
    };

    const handleStockCategoryAdded = (newStockCategory) => {
        setStockCategories([...stockCategories, newStockCategory]);
    };

    const handleEditClick = (stockCategory) => {
        setEditingStockCategory(stockCategory);
    };

    const handleUpdateStockCategory = async (updatedStockCategory) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/stock-categories/${updatedStockCategory.id}`, updatedStockCategory);
            setStockCategories(stockCategories.map(cat => cat.id === updatedStockCategory.id ? response.data : cat));
            setEditingStockCategory(null);
            toast.success('Stock category updated successfully!');
        } catch (error) {
            console.error('Error updating stock category:', error);
            toast.error('Error updating stock category. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/stock-categories/${id}`);
            setStockCategories(stockCategories.filter(cat => cat.id !== id));
            toast.success('Stock category deleted successfully!');
        } catch (error) {
            console.error('Error deleting stock category:', error);
            toast.error('Error deleting stock category. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddStockCategory
                onStockCategoryAdded={handleStockCategoryAdded}
                editingStockCategory={editingStockCategory}
                onStockCategoryUpdated={handleUpdateStockCategory}
                setEditingStockCategory={setEditingStockCategory}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {stockCategories.map((stockCategory) => (
                                <tr key={stockCategory.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{stockCategory.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{stockCategory.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(stockCategory)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(stockCategory.id)} color="secondary">
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

export default StockCategoryHistory;
