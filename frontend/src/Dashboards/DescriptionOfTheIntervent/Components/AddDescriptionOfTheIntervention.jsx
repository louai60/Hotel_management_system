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

const AddDescriptionOfTheIntervention = ({ onInterventionAdded, editingIntervention, onInterventionUpdated, setEditingIntervention }) => {
    const [open, setOpen] = useState(false);
    const [detectedIssue, setDetectedIssue] = useState('');
    const [descriptionOfWorkPerformed, setDescriptionOfWorkPerformed] = useState('');
    const [materialsUsed, setMaterialsUsed] = useState('');
    const [estimatedCostOfMaterials, setEstimatedCostOfMaterials] = useState('');
    const [durationOfIntervention, setDurationOfIntervention] = useState('');

    useEffect(() => {
        if (editingIntervention) {
            setDetectedIssue(editingIntervention.detectedIssue);
            setDescriptionOfWorkPerformed(editingIntervention.descriptionOfWorkPerformed);
            setMaterialsUsed(editingIntervention.materialsUsed);
            setEstimatedCostOfMaterials(editingIntervention.estimatedCostOfMaterials);
            setDurationOfIntervention(editingIntervention.durationOfIntervention);
            setOpen(true);
        }
    }, [editingIntervention]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingIntervention(null);
        clearForm();
    };

    const clearForm = () => {
        setDetectedIssue('');
        setDescriptionOfWorkPerformed('');
        setMaterialsUsed('');
        setEstimatedCostOfMaterials('');
        setDurationOfIntervention('');
    };

    const handleSubmit = async () => {
        const authToken = localStorage.getItem('auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = user.roles;

        const interventionData = {
            detectedIssue,
            descriptionOfWorkPerformed,
            materialsUsed,
            estimatedCostOfMaterials: parseFloat(estimatedCostOfMaterials),
            durationOfIntervention,
        };

        try {
            if (editingIntervention) {
                interventionData.id = editingIntervention.id;
                const response = await axios.put(`http://localhost:8080/api/descriptions/${editingIntervention.id}`, interventionData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Intervention updated:', response.data);
                onInterventionUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/descriptions', interventionData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-User-Roles': roles.join(',')
                    }
                });
                console.log('Intervention request submitted:', response.data);
                onInterventionAdded(response.data);
            }
            handleClose();
            toast.success(editingIntervention ? 'Intervention updated successfully!' : 'Intervention request submitted successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting intervention request:', error);
            toast.error(editingIntervention ? 'Error updating intervention. Please try again later.' : 'Error submitting intervention request. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingIntervention ? 'Edit Intervention' : 'Request Intervention'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingIntervention ? 'Edit Intervention' : 'Intervention Request'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingIntervention ? 'update' : 'request'} an intervention.
                    </DialogContentText>
                    <div className="space-y-4">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="detectedIssue"
                            placeholder="Detected Issue"
                            type="text"
                            value={detectedIssue}
                            onChange={(e) => setDetectedIssue(e.target.value)}
                        />
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-32 resize-none"
                            id="descriptionOfWorkPerformed"
                            placeholder="Description of Work Performed"
                            value={descriptionOfWorkPerformed}
                            onChange={(e) => setDescriptionOfWorkPerformed(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="materialsUsed"
                            placeholder="Materials Used"
                            type="text"
                            value={materialsUsed}
                            onChange={(e) => setMaterialsUsed(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="estimatedCostOfMaterials"
                            placeholder="Estimated Cost of Materials"
                            type="number"
                            value={estimatedCostOfMaterials}
                            onChange={(e) => setEstimatedCostOfMaterials(e.target.value)}
                        />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            id="durationOfIntervention"
                            placeholder="Duration of Intervention"
                            type="text"
                            value={durationOfIntervention}
                            onChange={(e) => setDurationOfIntervention(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingIntervention ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddDescriptionOfTheIntervention;
