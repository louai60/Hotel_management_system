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

const AddRevenue = ({ onRevenueAdded, editingRevenue, onRevenueUpdated, setEditingRevenue }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [directRevenue, setDirectRevenue] = useState('');
    const [indirectRevenue, setIndirectRevenue] = useState('');

    useEffect(() => {
        if (editingRevenue) {
            setDate(editingRevenue.date);
            setDirectRevenue(editingRevenue.directRevenue.toString());
            setIndirectRevenue(editingRevenue.indirectRevenue.toString());
            setOpen(true);
        }
    }, [editingRevenue]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearForm();
        setEditingRevenue(null);
    };

    const clearForm = () => {
        setDate('');
        setDirectRevenue('');
        setIndirectRevenue('');
    };

    const handleSubmit = async () => {
        const revenueData = {
            date,
            directRevenue: parseFloat(directRevenue),
            indirectRevenue: parseFloat(indirectRevenue),
        };

        try {
            let response;
            if (editingRevenue) {
                response = await axios.put(`http://localhost:8080/api/revenues/${editingRevenue.id}`, revenueData);
                onRevenueUpdated(response.data);
                toast.success('Revenue updated successfully!');
            } else {
                response = await axios.post('http://localhost:8080/api/revenues', revenueData);
                onRevenueAdded(response.data);
                toast.success('Revenue added successfully!');
            }
            handleClose();
        } catch (error) {
            console.error('Error adding/updating revenue:', error);
            toast.error('Error adding/updating revenue. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingRevenue ? 'Edit Revenue' : 'Add Revenue'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingRevenue ? 'Edit Revenue' : 'Add Revenue'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingRevenue ? 'update' : 'add'} revenue information.
                    </DialogContentText>
                    <div className="space-y-4">
                        <TextField
                            label="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Direct Revenue"
                            value={directRevenue}
                            onChange={(e) => setDirectRevenue(e.target.value)}
                            fullWidth
                            type="number"
                            required
                        />
                        <TextField
                            label="Indirect Revenue"
                            value={indirectRevenue}
                            onChange={(e) => setIndirectRevenue(e.target.value)}
                            fullWidth
                            type="number"
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingRevenue ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRevenue;
