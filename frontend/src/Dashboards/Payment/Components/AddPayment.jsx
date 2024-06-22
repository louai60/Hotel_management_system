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

const AddPayment = ({ onPaymentAdded, editingPayment, onPaymentUpdated, setEditingPayment }) => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (editingPayment) {
            setAmount(editingPayment.amount);
            setPaymentDate(editingPayment.paymentDate.split('T')[0]);
            setPaymentMethod(editingPayment.paymentMethod);
            setStatus(editingPayment.status);
            setOpen(true);
        }
    }, [editingPayment]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingPayment(null);
        clearForm();
    };

    const clearForm = () => {
        setAmount('');
        setPaymentDate('');
        setPaymentMethod('');
        setStatus('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const paymentData = {
            amount: parseFloat(amount),
            paymentDate: `${paymentDate}T00:00:00`,
            paymentMethod,
            status
        };

        try {
            if (editingPayment) {
                paymentData.id = editingPayment.id;
                const response = await axios.put(`http://localhost:8080/api/payments/${editingPayment.id}`, paymentData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Payment updated:', response.data);
                onPaymentUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/payments', paymentData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Payment added:', response.data);
                onPaymentAdded(response.data);
            }
            handleClose();
            toast.success(editingPayment ? 'Payment updated successfully!' : 'Payment added successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting payment request:', error);
            toast.error(editingPayment ? 'Error updating payment. Please try again later.' : 'Error submitting payment request. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingPayment ? 'Edit Payment' : 'Add Payment'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingPayment ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingPayment ? 'update' : 'add'} a payment.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="amount"
                            placeholder="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="paymentDate"
                            placeholder="Payment Date"
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="paymentMethod"
                            placeholder="Payment Method"
                            type="text"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="status"
                            placeholder="Status"
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingPayment ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPayment;
