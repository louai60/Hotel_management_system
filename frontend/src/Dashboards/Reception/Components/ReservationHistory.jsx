import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReceptionLayout from '../ReceptionLayout';
import PaymentHistory from '../../Payment/Components/PaymentHistory';

const ReservationHistory = () => {
    const [receptions, setReceptions] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchReceptions();
        fetchPayments();
    }, []);

    const fetchReceptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/receptions');
            setReceptions(response.data);
        } catch (error) {
            console.error('Error fetching receptions:', error);
            alert('Error fetching receptions. Please try again.');
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            alert('Error fetching payments. Please try again.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/receptions/${id}`);
            setReceptions(receptions.filter(rec => rec.id !== id));
            alert('Reception deleted successfully!');
        } catch (error) {
            console.error('Error deleting reception:', error);
            alert('Error deleting reception. Please try again later.');
        }
    };

    // Merge receptions and payments data based on client ID
    const mergedData = receptions.map(reception => {
        const payment = payments.find(payment => payment.clientId === reception.clientId);
        return {
            ...reception,
            payment: payment || { amount: '', paymentDate: '', paymentMethod: '', status: '' } // Default values if no payment found
        };
    });

    return (
        <ReceptionLayout>
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">Customers and Payments</h2>
                </header>
                <div className="p-10">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full xl:w-full">
                            {/* Table header */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Check-in Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Check-out Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Number of Guests
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Special Requests
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Status
                                    </th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                                {mergedData.map(data => (
                                    <tr key={data.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.checkInDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.checkOutDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.numberOfGuests}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.specialRequests}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.payment.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.payment.paymentDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.payment.paymentMethod}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.payment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ReceptionLayout>
    );
};

export default ReservationHistory;
