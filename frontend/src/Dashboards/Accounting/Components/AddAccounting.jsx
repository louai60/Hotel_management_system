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

const AddAccounting = ({ onAccountingAdded, editingAccounting, onAccountingUpdated, setEditingAccounting }) => {
  const [open, setOpen] = useState(false);
  const [periodCovered, setPeriodCovered] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [reportAuthor, setReportAuthor] = useState('');

  useEffect(() => {
    if (editingAccounting) {
      setPeriodCovered(editingAccounting.periodCovered);
      setTotalExpenses(editingAccounting.totalExpenses);
      setTotalRooms(editingAccounting.totalRooms);
      setReportAuthor(editingAccounting.reportAuthor);
      setOpen(true);
    }
  }, [editingAccounting]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAccounting(null);
    clearForm();
  };

  const clearForm = () => {
    setPeriodCovered('');
    setTotalExpenses('');
    setTotalRooms('');
    setReportAuthor('');
  };

  const handleSubmit = async () => {
    const authToken = localStorage.getItem('auth');
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = user.roles;

    const accountingData = {
      periodCovered,
      totalExpenses: parseFloat(totalExpenses),
      totalRooms: parseInt(totalRooms, 10),
      reportAuthor
    };

    try {
      if (editingAccounting) {
        accountingData.id = editingAccounting.id;
        const response = await axios.put(`http://localhost:8080/api/accounting/${editingAccounting.id}`, accountingData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Roles': roles.join(',')
          }
        });
        console.log('Accounting updated:', response.data);
        onAccountingUpdated(response.data);
      } else {
        const response = await axios.post('http://localhost:8080/api/accounting', accountingData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Roles': roles.join(',')
          }
        });
        console.log('Accounting request submitted:', response.data);
        onAccountingAdded(response.data);
      }
      handleClose();
      // Show success toast
      toast.success(editingAccounting ? 'Accounting updated successfully!' : 'Accounting request submitted successfully!');
      // Clear form fields
      clearForm();
    } catch (error) {
      console.error('Error submitting accounting request:', error);
      // Show error toast
      toast.error(editingAccounting ? 'Error updating accounting. Please try again later.' : 'Error submitting accounting request. Please try again later.');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {editingAccounting ? 'Edit Accounting' : 'Request Accounting'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{editingAccounting ? 'Edit Accounting' : 'Accounting Request'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {editingAccounting ? 'update' : 'request'} accounting.
          </DialogContentText>
          <div className="space-y-4">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="periodCovered"
              placeholder="Period Covered"
              type="text"
              value={periodCovered}
              onChange={(e) => setPeriodCovered(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="totalExpenses"
              placeholder="Total Expenses"
              type="number"
              value={totalExpenses}
              onChange={(e) => setTotalExpenses(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="totalRooms"
              placeholder="Total Rooms"
              type="number"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="reportAuthor"
              placeholder="Report Author"
              type="text"
              value={reportAuthor}
              onChange={(e) => setReportAuthor(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingAccounting ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAccounting;
