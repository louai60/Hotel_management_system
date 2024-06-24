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

const AddOrderDetails = ({ onOrderDetailAdded, editingOrderDetail, onOrderDetailUpdated, setEditingOrderDetail }) => {
    const [open, setOpen] = useState(false);
    const [orderedProducts, setOrderedProducts] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        if (editingOrderDetail) {
            setOrderedProducts(editingOrderDetail.orderedProducts);
            setQuantity(editingOrderDetail.quantity.toString());
            setUnitPrice(editingOrderDetail.unitPrice.toString());
            setTotal(editingOrderDetail.total.toString());
            setOpen(true);
        }
    }, [editingOrderDetail]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingOrderDetail(null);
        clearForm();
    };

    const clearForm = () => {
        setOrderedProducts('');
        setQuantity('');
        setUnitPrice('');
        setTotal('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const orderDetailData = {
            orderedProducts,
            quantity: parseFloat(quantity),
            unitPrice: parseFloat(unitPrice),
            total: parseFloat(total)
        };

        try {
            if (editingOrderDetail) {
                orderDetailData.id = editingOrderDetail.id;
                const response = await axios.put(`http://localhost:8080/api/order-details/${editingOrderDetail.id}`, orderDetailData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Order detail updated:', response.data);
                onOrderDetailUpdated(response.data);
                toast.success('Order detail updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8080/api/order-details', orderDetailData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Order detail added:', response.data);
                onOrderDetailAdded(response.data);
                toast.success('Order detail added successfully!');
            }
            handleClose();
            clearForm();
        } catch (error) {
            console.error('Error submitting order detail:', error);
            toast.error('Error submitting order detail. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingOrderDetail ? 'Edit Order Detail' : 'Add Order Detail'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingOrderDetail ? 'Edit Order Detail' : 'Add Order Detail'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingOrderDetail ? 'update' : 'add'} order detail.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="orderedProducts"
                            placeholder="Ordered Products"
                            type="text"
                            value={orderedProducts}
                            onChange={(e) => setOrderedProducts(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="quantity"
                            placeholder="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="unitPrice"
                            placeholder="Unit Price"
                            type="number"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="total"
                            placeholder="Total"
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingOrderDetail ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddOrderDetails;
