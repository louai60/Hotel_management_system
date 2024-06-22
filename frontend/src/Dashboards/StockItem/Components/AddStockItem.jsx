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

const AddStockItem = ({ onStockItemAdded, editingStockItem, onStockItemUpdated, setEditingStockItem }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    useEffect(() => {
        if (editingStockItem) {
            setName(editingStockItem.name);
            setQuantity(editingStockItem.quantity);
            setSupplier(editingStockItem.supplier);
            setUnitPrice(editingStockItem.unitPrice);
            setOpen(true);
        }
    }, [editingStockItem]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingStockItem(null);
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setQuantity('');
        setSupplier('');
        setUnitPrice('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const stockItemData = { name, quantity, supplier, unitPrice };

        try {
            if (editingStockItem) {
                const response = await axios.put(`http://localhost:8080/api/stock-items/${editingStockItem.id}`, stockItemData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Stock item updated:', response.data);
                onStockItemUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/stock-items', stockItemData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Stock item created:', response.data);
                onStockItemAdded(response.data);
            }
            handleClose();
            toast.success(editingStockItem ? 'Stock item updated successfully!' : 'Stock item added successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting stock item:', error);
            toast.error(editingStockItem ? 'Error updating stock item. Please try again later.' : 'Error adding stock item. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingStockItem ? 'Edit Stock Item' : 'Add Stock Item'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingStockItem ? 'Edit Stock Item' : 'Add Stock Item'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingStockItem ? 'update' : 'add'} stock item.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            id="name"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            id="quantity"
                            placeholder="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            id="supplier"
                            placeholder="Supplier"
                            type="text"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            required
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            id="unitPrice"
                            placeholder="Unit Price"
                            type="number"
                            step="0.01"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingStockItem ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddStockItem;
