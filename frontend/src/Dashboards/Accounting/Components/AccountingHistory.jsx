import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddAccounting from './AddAccounting'; 
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const AccountingHistory = () => {
  const [accountings, setAccountings] = useState([]);
  const [editingAccounting, setEditingAccounting] = useState(null);

  useEffect(() => {
    fetchAccountings();
  }, []);

  const fetchAccountings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/accounting');
      setAccountings(response.data);
    } catch (error) {
      console.error('Error fetching accountings:', error);
    }
  };

  const handleAccountingAdded = (newAccounting) => {
    setAccountings([...accountings, newAccounting]);
  };

  const handleEditClick = (accounting) => {
    setEditingAccounting(accounting);
  };

  const handleUpdateAccounting = async (updatedAccounting) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/accounting/${updatedAccounting.id}`, updatedAccounting);
      setAccountings(accountings.map(acc => acc.id === updatedAccounting.id ? response.data : acc));
      setEditingAccounting(null);
      // toast.success('Accounting updated successfully!');
    } catch (error) {
      console.error('Error updating accounting:', error);
      toast.error('Error updating accounting. Please try again later.');
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/accounting/${id}`);
      setAccountings(accountings.filter(acc => acc.id !== id));
      toast.success('Accounting deleted successfully!');
    } catch (error) {
      console.error('Error deleting accounting:', error);
      toast.error('Error deleting accounting. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-end px-4 pt-4">
      <AddAccounting 
        onAccountingAdded={handleAccountingAdded} 
        editingAccounting={editingAccounting}
        onAccountingUpdated={handleUpdateAccounting}
        setEditingAccounting={setEditingAccounting}
      /> 
      <TitleCard>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period Covered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accountings.map((accounting) => (
                <tr key={accounting.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{accounting.periodCovered}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{accounting.totalExpenses}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{accounting.totalRooms}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{accounting.reportAuthor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button onClick={() => handleEditClick(accounting)} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(accounting.id)} color="secondary">
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

export default AccountingHistory;
