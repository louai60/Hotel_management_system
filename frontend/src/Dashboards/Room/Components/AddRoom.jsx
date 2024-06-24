import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';

const AddRoom = ({ onRoomAdded, editingRoom, onRoomUpdated, setEditingRoom }) => {
    const [open, setOpen] = useState(false);
    const [roomNumber, setRoomNumber] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        fetchRoomTypes();
        if (editingRoom) {
            setRoomNumber(editingRoom.roomNumber);
            setPrice(editingRoom.price.toString());
            setStatus(editingRoom.status);
            setType(editingRoom.type.id); // Assuming type is an object with an id
            setOpen(true);
        }
    }, [editingRoom]);

    const fetchRoomTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/roomTypes');
            setRoomTypes(response.data);
        } catch (error) {
            console.error('Error fetching room types:', error);
            toast.error('Error fetching room types. Please try again later.');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearForm();
        setEditingRoom(null);
    };

    const clearForm = () => {
        setRoomNumber('');
        setPrice('');
        setStatus('');
        setType('');
    };

    const handleSubmit = async () => {
        const roomData = {
            roomNumber,
            price: parseFloat(price),
            status,
            type: { id: type } // Assuming type is selected from a list or dropdown
        };

        try {
            let response;
            if (editingRoom) {
                response = await axios.put(`http://localhost:8080/api/rooms/${editingRoom.id}`, roomData);
                onRoomUpdated(response.data);
                toast.success('Room updated successfully!');
            } else {
                response = await axios.post('http://localhost:8080/api/rooms', roomData);
                onRoomAdded(response.data);
                toast.success('Room added successfully!');
            }
            handleClose();
        } catch (error) {
            console.error('Error adding/updating room:', error);
            toast.error('Error adding/updating room. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingRoom ? 'Edit Room' : 'Add Room'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingRoom ? 'Edit Room' : 'Add Room'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingRoom ? 'update' : 'add'} room information.
                    </DialogContentText>
                    <div className="space-y-4">
                        <TextField
                            label="Room Number"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
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
                        <TextField
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            select
                            label="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            fullWidth
                            required
                        >
                            {roomTypes.map((roomType) => (
                                <MenuItem key={roomType.id} value={roomType.id}>
                                    {roomType.typeName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingRoom ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRoom;
