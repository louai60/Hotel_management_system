

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddStockCategory = ({ onStockCategoryAdded, editingStockCategory, onStockCategoryUpdated, setEditingStockCategory }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingStockCategory) {
            setName(editingStockCategory.name);
            setDescription(editingStockCategory.description);
            setOpen(true);
        }
    }, [editingStockCategory]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingStockCategory(null);
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setDescription('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const stockCategoryData = { name, description };

        try {
            if (editingStockCategory) {
                const response = await axios.put(`http://localhost:8080/api/stock-categories/${editingStockCategory.id}`, stockCategoryData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Stock category updated:', response.data);
                onStockCategoryUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/stock-categories', stockCategoryData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Stock category request submitted:', response.data);
                onStockCategoryAdded(response.data);
            }
            handleClose();
            toast.success(editingStockCategory ? 'Stock category updated successfully!' : 'Stock category request submitted successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting stock category request:', error);
            toast.error(editingStockCategory ? 'Error updating stock category. Please try again later.' : 'Error submitting stock category request. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingStockCategory ? 'Edit Stock Category' : 'Request Stock Category'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingStockCategory ? 'Edit Stock Category' : 'Stock Category Request'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingStockCategory ? 'update' : 'request'} stock category.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="name"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="description"
                            placeholder="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingStockCategory ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddStockCategory;
