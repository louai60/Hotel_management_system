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

const AddRoomType = ({ onRoomTypeAdded, editingRoomType, onRoomTypeUpdated, setEditingRoomType }) => {
    const [open, setOpen] = useState(false);
    const [typeName, setTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (editingRoomType) {
            setTypeName(editingRoomType.typeName);
            setDescription(editingRoomType.description);
            setPrice(editingRoomType.price.toString());
            setOpen(true);
        }
    }, [editingRoomType]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearForm();
        setEditingRoomType(null);
    };

    const clearForm = () => {
        setTypeName('');
        setDescription('');
        setPrice('');
    };

    const handleSubmit = async () => {
        const roomTypeData = {
            typeName,
            description,
            price: parseFloat(price),
        };

        try {
            if (editingRoomType) {
                const response = await axios.put(`http://localhost:8080/api/roomTypes/${editingRoomType.id}`, roomTypeData);
                onRoomTypeUpdated(response.data);
                toast.success('Room type updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8080/api/roomTypes', roomTypeData);
                onRoomTypeAdded(response.data);
                toast.success('Room type added successfully!');
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting room type:', error);
            toast.error('Error submitting room type. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingRoomType ? 'Edit Room Type' : 'Add Room Type'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingRoomType ? 'Edit Room Type' : 'Add Room Type'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingRoomType ? 'update' : 'add'} room type information.
                    </DialogContentText>
                    <div className="space-y-4">
                        <TextField
                            label="Type Name"
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                        {editingRoomType ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRoomType;
