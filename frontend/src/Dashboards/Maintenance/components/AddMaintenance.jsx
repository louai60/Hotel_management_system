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

const AddMaintenance = ({ onMaintenanceAdded, editingMaintenance, onMaintenanceUpdated, setEditingMaintenance }) => {
  const [open, setOpen] = useState(false);
  const [interventionDate, setInterventionDate] = useState('');
  const [location, setLocation] = useState('');
  const [responsibleTechnician, setResponsibleTechnician] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (editingMaintenance) {
      setInterventionDate(editingMaintenance.interventionDate);
      setLocation(editingMaintenance.location);
      setResponsibleTechnician(editingMaintenance.responsibleTechnician);
      setPriority(editingMaintenance.priority);
      setOpen(true);
    } else {
      clearForm();
    }
  }, [editingMaintenance]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMaintenance(null);
    clearForm();
  };

  const clearForm = () => {
    setInterventionDate('');
    setLocation('');
    setResponsibleTechnician('');
    setPriority('');
  };

  const handleSubmit = async () => {
    const authToken = localStorage.getItem('auth');
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = user.roles;

    const maintenanceData = {
      interventionDate: new Date(interventionDate).toISOString(),
      location,
      responsibleTechnician,
      priority
    };

    try {
      let response;
      if (editingMaintenance) {
        // Update existing maintenance
        response = await axios.put(`http://localhost:8080/api/maintenance/${editingMaintenance.id}`, maintenanceData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Roles': roles.join(',')
          }
        });
        if (onMaintenanceUpdated) {
          onMaintenanceUpdated(response.data);
        }
        toast.success('Maintenance updated successfully!');
      } else {
        // Add new maintenance
        response = await axios.post('http://localhost:8080/api/maintenance', maintenanceData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Roles': roles.join(',')
          }
        });
        if (onMaintenanceAdded) {
          onMaintenanceAdded(response.data);
        }
        toast.success('Maintenance request submitted successfully!');
      }

      handleClose();
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      toast.error('Error submitting maintenance request. Please try again later.');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {editingMaintenance ? 'Edit Maintenance' : 'Request Maintenance'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {editingMaintenance ? 'Edit Maintenance' : 'Maintenance Request'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {editingMaintenance ? 'update' : 'request'} maintenance.
          </DialogContentText>
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                placeholder="Select date"
                value={interventionDate}
                onChange={(e) => setInterventionDate(e.target.value)}
              />
            </div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="location"
              placeholder="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="responsibleTechnician"
              placeholder="Responsible Technician"
              type="text"
              value={responsibleTechnician}
              onChange={(e) => setResponsibleTechnician(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              id="priority"
              placeholder="Priority"
              type="text"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingMaintenance ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMaintenance;
