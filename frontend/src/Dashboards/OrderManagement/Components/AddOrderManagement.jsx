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

const AddOrderManagement = ({ onOrderManagementAdded, editingOrderManagement, onOrderManagementUpdated, setEditingOrderManagement }) => {
    const [open, setOpen] = useState(false);
    const [orderDate, setOrderDate] = useState('');
    const [supplier, setSupplier] = useState('');
    const [requestingDepartment, setRequestingDepartment] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [receiptConfirmation, setReceiptConfirmation] = useState(false);

    useEffect(() => {
        if (editingOrderManagement) {
            setOrderDate(editingOrderManagement.orderDate);
            setSupplier(editingOrderManagement.supplier);
            setRequestingDepartment(editingOrderManagement.requestingDepartment);
            setOrderStatus(editingOrderManagement.orderStatus);
            setReceiptConfirmation(editingOrderManagement.receiptConfirmation);
            setOpen(true);
        }
    }, [editingOrderManagement]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingOrderManagement(null);
        clearForm();
    };

    const clearForm = () => {
        setOrderDate('');
        setSupplier('');
        setRequestingDepartment('');
        setOrderStatus('');
        setReceiptConfirmation(false);
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const orderManagementData = {
            orderDate,
            supplier,
            requestingDepartment,
            orderStatus,
            receiptConfirmation
        };

        try {
            if (editingOrderManagement) {
                const response = await axios.put(`http://localhost:8080/api/OrderManagements/${editingOrderManagement.id}`, orderManagementData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                onOrderManagementUpdated(response.data);
                toast.success('Order management updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8080/api/OrderManagements', orderManagementData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                onOrderManagementAdded(response.data);
                toast.success('Order management added successfully!');
            }
            handleClose();
            clearForm();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error submitting order management.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingOrderManagement ? 'Edit Order Management' : 'Add Order Management'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingOrderManagement ? 'Edit Order Management' : 'Add Order Management'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill out the form below to {editingOrderManagement ? 'edit' : 'add'} an order management entry.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            placeholder="Order Date"
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            placeholder="Supplier"
                            type="text"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            placeholder="Requesting Department"
                            type="text"
                            value={requestingDepartment}
                            onChange={(e) => setRequestingDepartment(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            placeholder="Order Status"
                            type="text"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        />
                        <div className="flex items-center">
                            <input
                                id="receiptConfirmation"
                                type="checkbox"
                                checked={receiptConfirmation}
                                onChange={(e) => setReceiptConfirmation(e.target.checked)}
                            />
                            <label htmlFor="receiptConfirmation" className="ml-2 text-sm text-gray-600">Receipt Confirmation</label>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingOrderManagement ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddOrderManagement;
