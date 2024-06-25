import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleCard from '../../../components/Cards/TitleCard';
import AddRoomType from './AddRoomType';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const RoomTypeHistory = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [editingRoomType, setEditingRoomType] = useState(null);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/roomTypes');
            setRoomTypes(response.data);
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const handleRoomTypeAdded = (newRoomType) => {
        setRoomTypes([...roomTypes, newRoomType]);
    };

    const handleEditClick = (roomType) => {
        setEditingRoomType(roomType);
    };

    const handleUpdateRoomType = async (updatedRoomType) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/roomTypes/${updatedRoomType.id}`, updatedRoomType);
            setRoomTypes(roomTypes.map(rt => rt.id === updatedRoomType.id ? response.data : rt));
            setEditingRoomType(null);
            toast.success('Room type updated successfully!');
        } catch (error) {
            console.error('Error updating room type:', error);
            toast.error('Error updating room type. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/roomTypes/${id}`);
            setRoomTypes(roomTypes.filter(rt => rt.id !== id));
            toast.success('Room type deleted successfully!');
        } catch (error) {
            console.error('Error deleting room type:', error);
            toast.error('Error deleting room type. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddRoomType
                onRoomTypeAdded={handleRoomTypeAdded}
                editingRoomType={editingRoomType}
                onRoomTypeUpdated={handleUpdateRoomType}
                setEditingRoomType={setEditingRoomType}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {roomTypes.map((roomType) => (
                                <tr key={roomType.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{roomType.typeName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{roomType.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{roomType.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(roomType)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(roomType.id)} color="secondary">
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

export default RoomTypeHistory;
