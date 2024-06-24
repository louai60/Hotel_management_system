import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const PoolHistory = () => {
    const [pools, setPools] = useState([]);

    useEffect(() => {
        fetchPools();
    }, []);

    const fetchPools = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pools');
            setPools(response.data);
        } catch (error) {
            console.error('Error fetching pools:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/pools/${id}`);
            setPools(pools.filter(pool => pool.id !== id));
            toast.success('Pool deleted successfully!');
        } catch (error) {
            console.error('Error deleting pool:', error);
            toast.error('Error deleting pool. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pools.map((pool) => (
                                <tr key={pool.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{pool.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pool.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pool.updatedAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleDeleteClick(pool.id)} color="secondary">
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

export default PoolHistory;
