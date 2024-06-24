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

const AddPool = ({ onPoolAdded, editingPool, onPoolUpdated, setEditingPool }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (editingPool) {
            setName(editingPool.name);
            setOpen(true);
        }
    }, [editingPool]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearForm();
        setEditingPool(null);
    };

    const clearForm = () => {
        setName('');
    };

    const handleSubmit = async () => {
        const poolData = {
            name,
        };

        try {
            if (editingPool) {
                const response = await axios.put(`http://localhost:8080/api/pools/${editingPool.id}`, poolData);
                onPoolUpdated(response.data);
                toast.success('Pool updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8080/api/pools', poolData);
                onPoolAdded(response.data);
                toast.success('Pool added successfully!');
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting pool:', error);
            toast.error('Error submitting pool. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingPool ? 'Edit Pool' : 'Add Pool'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingPool ? 'Edit Pool' : 'Add Pool'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingPool ? 'update' : 'add'} a pool.
                    </DialogContentText>
                    <div className="space-y-4">
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        {editingPool ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPool;
