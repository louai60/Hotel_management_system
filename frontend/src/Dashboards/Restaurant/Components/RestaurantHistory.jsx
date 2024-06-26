import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddRestaurant from './AddRestaurant';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const RestaurantHistory = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [editingRestaurant, setEditingRestaurant] = useState(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/restaurants');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleRestaurantAdded = (newRestaurant) => {
        setRestaurants([...restaurants, newRestaurant]);
    };

    const handleEditClick = (restaurant) => {
        setEditingRestaurant(restaurant);
    };

    const handleUpdateRestaurant = async (updatedRestaurant) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/restaurants/${updatedRestaurant.id}`, updatedRestaurant);
            setRestaurants(restaurants.map(rest => rest.id === updatedRestaurant.id ? response.data : rest));
            setEditingRestaurant(null);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            toast.error('Error updating restaurant. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/restaurants/${id}`);
            setRestaurants(restaurants.filter(rest => rest.id !== id));
            toast.success('Restaurant deleted successfully!');
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            toast.error('Error deleting restaurant. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddRestaurant
                onRestaurantAdded={handleRestaurantAdded}
                editingRestaurant={editingRestaurant}
                onRestaurantUpdated={handleUpdateRestaurant}
                setEditingRestaurant={setEditingRestaurant}
            />
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
                            {restaurants.map((restaurant) => (
                                <tr key={restaurant.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.createdAt.substring(0, 10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.updatedAt.substring(0, 10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(restaurant)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(restaurant.id)} color="secondary">
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

export default RestaurantHistory;
