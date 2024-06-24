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

const AddFollowUpAndValidation = ({ onValidationAdded, editingValidation, onValidationUpdated, setEditingValidation }) => {
    const [open, setOpen] = useState(false);
    const [postCleaningCondition, setPostCleaningCondition] = useState('');
    const [remarks, setRemarks] = useState('');
    const [agentSignature, setAgentSignature] = useState('');
    const [validationDate, setValidationDate] = useState('');

    useEffect(() => {
        if (editingValidation) {
            setPostCleaningCondition(editingValidation.postCleaningCondition);
            setRemarks(editingValidation.remarks);
            setAgentSignature(editingValidation.agentSignature);
            setValidationDate(editingValidation.validationDate);
            setOpen(true);
        }
    }, [editingValidation]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingValidation(null);
        clearForm();
    };

    const clearForm = () => {
        setPostCleaningCondition('');
        setRemarks('');
        setAgentSignature('');
        setValidationDate('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const validationData = {
            postCleaningCondition,
            remarks,
            agentSignature,
            validationDate: new Date(validationDate)
        };

        try {
            if (editingValidation) {
                validationData.id = editingValidation.id;
                const response = await axios.put(`http://localhost:8080/api/follow-up-and-validations/${editingValidation.id}`, validationData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                onValidationUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/follow-up-and-validations', validationData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                onValidationAdded(response.data);
            }
            handleClose();
            toast.success(editingValidation ? 'Validation updated successfully!' : 'Validation added successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting validation:', error);
            toast.error(editingValidation ? 'Error updating validation. Please try again later.' : 'Error adding validation. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingValidation ? 'Edit Validation' : 'Add Validation'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingValidation ? 'Edit Validation' : 'Add Validation'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingValidation ? 'update' : 'add'} a validation.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="postCleaningCondition"
                            placeholder="Post Cleaning Condition"
                            type="text"
                            value={postCleaningCondition}
                            onChange={(e) => setPostCleaningCondition(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="remarks"
                            placeholder="Remarks"
                            type="text"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="agentSignature"
                            placeholder="Agent Signature"
                            type="text"
                            value={agentSignature}
                            onChange={(e) => setAgentSignature(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="validationDate"
                            placeholder="Validation Date"
                            type="date"
                            value={validationDate}
                            onChange={(e) => setValidationDate(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingValidation ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddFollowUpAndValidation;
