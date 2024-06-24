// CleaningDetailHistory.jsx

import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddCleaningDetail from './AddCleaningDetail';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const CleaningDetailHistory = () => {
    const [cleaningDetails, setCleaningDetails] = useState([]);
    const [editingCleaningDetail, setEditingCleaningDetail] = useState(null);

    useEffect(() => {
        fetchCleaningDetails();
    }, []);

    const fetchCleaningDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cleaning-details');
            setCleaningDetails(response.data);
        } catch (error) {
            console.error('Error fetching cleaning details:', error);
            toast.error('Error fetching cleaning details. Please try again later.');
        }
    };

    const handleCleaningDetailAdded = (newCleaningDetail) => {
        setCleaningDetails([...cleaningDetails, newCleaningDetail]);
    };

    const handleEditClick = (cleaningDetail) => {
        setEditingCleaningDetail(cleaningDetail);
    };

    const handleUpdateCleaningDetail = (updatedCleaningDetail) => {
        setCleaningDetails(cleaningDetails.map(cd => cd.id === updatedCleaningDetail.id ? updatedCleaningDetail : cd));
        setEditingCleaningDetail(null);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/cleaning-details/${id}`);
            setCleaningDetails(cleaningDetails.filter(cd => cd.id !== id));
            toast.success('Cleaning Detail deleted successfully!');
        } catch (error) {
            console.error('Error deleting cleaning detail:', error);
            toast.error('Error deleting cleaning detail. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddCleaningDetail
                onCleaningDetailAdded={handleCleaningDetailAdded}
                editingCleaningDetail={editingCleaningDetail}
                onCleaningDetailUpdated={handleUpdateCleaningDetail}
                setEditingCleaningDetail={setEditingCleaningDetail}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds Made</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bathrooms Cleaned</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trash Emptied</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Towels Replaced</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenities Replaced</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Used</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cleaningDetails.map((cleaningDetail) => (
                                <tr key={cleaningDetail.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.bedsMade ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.bathroomsCleaned ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.trashEmptied ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.towelsReplaced ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.amenitiesReplaced ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cleaningDetail.productsUsed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(cleaningDetail)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(cleaningDetail.id)} color="secondary">
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

export default CleaningDetailHistory;
