import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

const AddRestaurant = ({ onRestaurantAdded, editingRestaurant, onRestaurantUpdated, setEditingRestaurant }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        if (editingRestaurant) {
            setName(editingRestaurant.name);
            setCreatedAt(editingRestaurant.createdAt.substring(0, 10)); // Keep only the date part
            setUpdatedAt(editingRestaurant.updatedAt.substring(0, 10)); // Keep only the date part
            setOpen(true);
        }
    }, [editingRestaurant]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearForm();
        setEditingRestaurant(null);
    };

    const clearForm = () => {
        setName('');
        setCreatedAt('');
        setUpdatedAt('');
    };

    const handleSubmit = async () => {
        const restaurantData = {
            name,
            createdAt: `${createdAt}T00:00:00`, // Combine date with time (midnight)
            updatedAt: `${updatedAt}T00:00:00`, // Combine date with time (midnight)
        };

        try {
            if (editingRestaurant) {
                const response = await axios.put(`http://localhost:8080/api/restaurants/${editingRestaurant.id}`, restaurantData);
                onRestaurantUpdated(response.data);
                toast.success('Restaurant updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8080/api/restaurants', restaurantData);
                onRestaurantAdded(response.data);
                toast.success('Restaurant added successfully!');
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting restaurant:', error);
            toast.error('Error submitting restaurant. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingRestaurant ? 'update' : 'add'} a restaurant.
                    </DialogContentText>
                    <div className="space-y-4">
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Created At"
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Updated At"
                            type="date"
                            value={updatedAt}
                            onChange={(e) => setUpdatedAt(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingRestaurant ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRestaurant;
