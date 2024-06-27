import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleCard from "../../../components/Cards/TitleCard";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import AddRoom from './AddRoom';

const RoomHistory = () => {
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [updateD, setUpdateD] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, [updateD]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            toast.error('Error fetching rooms. Please try again later.');
        }
    };

    const handleRoomAdded = (newRoom) => {
        setRooms([...rooms, newRoom]);
        setUpdateD(!updateD)
    };

    const handleEditClick = (room) => {
        setEditingRoom(room);
    };

    const handleUpdateRoom = async (updatedRoom) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/rooms/${updatedRoom.id}`, updatedRoom);
            setRooms(rooms.map(r => r.id === updatedRoom.id ? response.data : r));
            setEditingRoom(null);
            toast.success('Room updated successfully!');
        } catch (error) {
            console.error('Error updating room:', error);
            toast.error('Error updating room. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/rooms/${id}`);
            setRooms(rooms.filter(room => room.id !== id));
            toast.success('Room deleted successfully!');
        } catch (error) {
            console.error('Error deleting room:', error);
            toast.error('Error deleting room. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddRoom
                onRoomAdded={handleRoomAdded}
                editingRoom={editingRoom}
                onRoomUpdated={handleUpdateRoom}
                setEditingRoom={setEditingRoom}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rooms.map((room) => (
                                <tr key={room.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{room.roomNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{room.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{room.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{room.type ? room.type.typeName : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <Button onClick={() => handleEditClick(room)} color="primary" variant="outlined" size="small">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(room.id)} color="secondary" variant="outlined" size="small">
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

export default RoomHistory;
