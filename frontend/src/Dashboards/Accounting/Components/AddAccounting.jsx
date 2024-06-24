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

const AddHouseKeepingService = ({ onServiceAdded, editingService, onServiceUpdated, setEditingService }) => {
  const [open, setOpen] = useState(false);
  const [cleaningDate, setCleaningDate] = useState('');
  const [houseKeepingAgent, setHouseKeepingAgent] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (editingService) {
      setCleaningDate(editingService.cleaningDate);
      setHouseKeepingAgent(editingService.houseKeepingAgent);
      setPriority(editingService.priority);
      setOpen(true);
    }
  }, [editingService]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearForm();
    setEditingService(null);
  };

  const clearForm = () => {
    setCleaningDate('');
    setHouseKeepingAgent('');
    setPriority('');
  };

  const handleSubmit = async () => {
    const serviceData = {
      cleaningDate,
      houseKeepingAgent,
      priority,
    };

    try {
      if (editingService) {
        const response = await axios.put(`http://localhost:8080/api/house-keeping-services/${editingService.id}`, serviceData);
        onServiceUpdated(response.data);
        toast.success('Housekeeping service updated successfully!');
      } else {
        const response = await axios.post('http://localhost:8080/api/house-keeping-services', serviceData);
        onServiceAdded(response.data);
        toast.success('Housekeeping service added successfully!');
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast.error('Error submitting service request. Please try again later.');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {editingService ? 'Edit Service' : 'Add Service'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{editingService ? 'Edit Housekeeping Service' : 'Add Housekeeping Service'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {editingService ? 'update' : 'add'} a housekeeping service.
          </DialogContentText>
          <div className="space-y-4">
            <TextField
              label="Cleaning Date"
              type="date"
              value={cleaningDate}
              onChange={(e) => setCleaningDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Housekeeping Agent"
              value={houseKeepingAgent}
              onChange={(e) => setHouseKeepingAgent(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
            {editingService ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddHouseKeepingService;
