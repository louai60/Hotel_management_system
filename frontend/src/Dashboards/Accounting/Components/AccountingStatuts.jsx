import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountingStatuts() {
    const [accountings, setAccountings] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [newAccounting, setNewAccounting] = useState({
        periodCovered: '',
        totalExpenses: '',
        totalRooms: '',
        reportAuthor: '',
    });
    const itemsPerPage = 5;

    useEffect(() => {
        fetchAccountings();
    }, []);
    const fetchAccountings = async () => {
        try {
            const response = await axios.get('/api/accountings');
            setAccountings(response.data);
        } catch (error) {
            console.error('Error fetching accountings:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewAccounting({ ...newAccounting, [name]: value });
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/accountings', newAccounting);
            fetchAccountings();
            setNewAccounting({
                periodCovered: '',
                totalExpenses: '',
                totalRooms: '',
                reportAuthor: '',
            });
        } catch (error) {
            console.error('Error creating accounting:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/accountings/${id}`);
            fetchAccountings();
        } catch (error) {
            console.error('Error deleting accounting:', error);
        }
    };

    const filteredAccountings = accountings.filter((item) =>
        item.periodCovered.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAccountings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAccountings.length / itemsPerPage);

    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Accounting</h2>
            </header>
            <div className="p-3">
                {/* Filter */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Filter by period covered"
                        className="border border-slate-300 rounded p-2"
                    />
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">ID</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Period Covered</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Total Expenses</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Total Rooms</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Report Author</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.periodCovered}</td>
                                    <td className="p-2">{item.totalExpenses}</td>
                                    <td className="p-2">{item.totalRooms}</td>
                                    <td className="p-2">{item.reportAuthor}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                {/* Add Accounting */}
                <div className="mt-6">
                    <form onSubmit={handleCreate}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Period Covered
                            </label>
                            <input
                                type="text"
                                name="periodCovered"
                                value={newAccounting.periodCovered}
                                onChange={handleChange}
                                className="border border-slate-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Total Expenses
                            </label>
                            <input
                                type="number"
                                name="totalExpenses"
                                value={newAccounting.totalExpenses}
                                onChange={handleChange}
                                className="border border-slate-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Total Rooms
                            </label>
                            <input
                                type="number"
                                name="totalRooms"
                                value={newAccounting.totalRooms}
                                onChange={handleChange}
                                className="border border-slate-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Report Author
                            </label>
                            <input
                                type="text"
                                name="reportAuthor"
                                value={newAccounting.reportAuthor}
                                onChange={handleChange}
                                className="border border-slate-300 rounded p-2 w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Accounting
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AccountingStatuts;