import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

const AddAccounting = ({ onAccountingAdded, editingAccounting, onAccountingUpdated, setEditingAccounting }) => {
  const [open, setOpen] = useState(false);
  const [periodCovered, setPeriodCovered] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [reportAuthor, setReportAuthor] = useState('');

  useEffect(() => {
    if (editingAccounting) {
      setPeriodCovered(editingAccounting.periodCovered);
      setTotalExpenses(editingAccounting.totalExpenses.toString());
      setTotalRooms(editingAccounting.totalRooms.toString());
      setReportAuthor(editingAccounting.reportAuthor);
      setOpen(true);
    }
  }, [editingAccounting]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearForm();
    setEditingAccounting(null);
  };

  const clearForm = () => {
    setPeriodCovered('');
    setTotalExpenses('');
    setTotalRooms('');
    setReportAuthor('');
  };

  const handleSubmit = async () => {
    const accountingData = {
      periodCovered,
      totalExpenses: parseFloat(totalExpenses),
      totalRooms: parseInt(totalRooms),
      reportAuthor,
    };

    try {
      if (editingAccounting) {
        const response = await axios.put(`http://localhost:8080/api/accounting/${editingAccounting.id}`, accountingData);
        onAccountingUpdated(response.data);
        toast.success('Accounting updated successfully!');
      } else {
        const response = await axios.post('http://localhost:8080/api/accounting', accountingData);
        onAccountingAdded(response.data);
        toast.success('Accounting added successfully!');
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting accounting:', error);
      toast.error('Error submitting accounting. Please try again later.');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {editingAccounting ? 'Edit Accounting' : 'Add Accounting'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{editingAccounting ? 'Edit Accounting' : 'Add Accounting'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {editingAccounting ? 'update' : 'add'} accounting information.
          </DialogContentText>
          <div className="space-y-4">
            <TextField
              label="Period Covered"
              value={periodCovered}
              onChange={(e) => setPeriodCovered(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Total Expenses"
              value={totalExpenses}
              onChange={(e) => setTotalExpenses(e.target.value)}
              fullWidth
              type="number"
              required
            />
            <TextField
              label="Total Rooms"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              fullWidth
              type="number"
              required
            />
            <TextField
              label="Report Author"
              value={reportAuthor}
              onChange={(e) => setReportAuthor(e.target.value)}
              fullWidth
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingAccounting ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAccounting;
