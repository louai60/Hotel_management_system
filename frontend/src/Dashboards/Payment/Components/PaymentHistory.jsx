import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPayment from './AddPayment';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [editingPayment, setEditingPayment] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            toast.error('Error fetching payments.');
        }
    };

    const handlePaymentAdded = (newPayment) => {
        setPayments([...payments, newPayment]);
        toast.success('Payment added successfully!');
    };

    const handleEditClick = (payment) => {
        setEditingPayment(payment);
    };

    const handleUpdatePayment = async (updatedPayment) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/payments/${updatedPayment.id}`, updatedPayment);
            setPayments(payments.map(pmt => pmt.id === updatedPayment.id ? response.data : pmt));
            setEditingPayment(null);
            toast.success('Payment updated successfully!');
        } catch (error) {
            console.error('Error updating payment:', error);
            toast.error('Error updating payment. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/payments/${id}`);
            setPayments(payments.filter(pmt => pmt.id !== id));
            toast.success('Payment deleted successfully!');
        } catch (error) {
            console.error('Error deleting payment:', error);
            toast.error('Error deleting payment. Please try again later.');
        }
    };

    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Payment</h2>
            </header>
            <div className="p-3 flex flex-col items-end px-4 pt-4">
                <AddPayment
                    onPaymentAdded={handlePaymentAdded}
                    editingPayment={editingPayment}
                    onPaymentUpdated={handleUpdatePayment}
                    setEditingPayment={setEditingPayment}
                />
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Amount</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Payment Date</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Payment Method</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Status</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="p-2">
                                        <div className="text-slate-800 dark:text-slate-100">{payment.amount}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-slate-800 dark:text-slate-100">{payment.paymentDate.split('T')[0]}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-slate-800 dark:text-slate-100">{payment.paymentMethod}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-slate-800 dark:text-slate-100">{payment.status}</div>
                                    </td>
                                    <td className="p-2">
                                        <Button onClick={() => handleEditClick(payment)} variant="contained" color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(payment.id)} variant="contained" color="secondary">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
