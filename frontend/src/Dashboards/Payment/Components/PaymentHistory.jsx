import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleCard from "../../../components/Cards/TitleCard";
import AddPayment from './AddPayment';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

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
            toast.error('Error fetching payments. Please try again later.');
        }
    };

    const handlePaymentAdded = (newPayment) => {
        setPayments([...payments, newPayment]);
    };

    const handleEditClick = (payment) => {
        setEditingPayment(payment);
    };

    const handleUpdatePayment = async (updatedPayment) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/payments/${updatedPayment.id}`, updatedPayment);
            setPayments(payments.map(p => p.id === updatedPayment.id ? response.data : p));
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
            setPayments(payments.filter(p => p.id !== id));
            toast.success('Payment deleted successfully!');
        } catch (error) {
            console.error('Error deleting payment:', error);
            toast.error('Error deleting payment. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddPayment onPaymentAdded={handlePaymentAdded} />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(payment)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(payment.id)} color="secondary">
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

export default PaymentHistory;
