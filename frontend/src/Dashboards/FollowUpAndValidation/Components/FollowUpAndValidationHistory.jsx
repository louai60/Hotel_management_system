import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddFollowUpAndValidation from './AddFollowUpAndValidation';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const FollowUpAndValidationHistory = () => {
    const [validations, setValidations] = useState([]);
    const [editingValidation, setEditingValidation] = useState(null);

    useEffect(() => {
        fetchValidations();
    }, []);

    const fetchValidations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/follow-up-and-validations');
            setValidations(response.data);
        } catch (error) {
            console.error('Error fetching validations:', error);
        }
    };

    const handleValidationAdded = (newValidation) => {
        setValidations([...validations, newValidation]);
    };

    const handleEditClick = (validation) => {
        setEditingValidation(validation);
    };

    const handleUpdateValidation = async (updatedValidation) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/follow-up-and-validations/${updatedValidation.id}`, updatedValidation);
            setValidations(validations.map(val => val.id === updatedValidation.id ? response.data : val));
            setEditingValidation(null);
            toast.success('Validation updated successfully!');
        } catch (error) {
            console.error('Error updating validation:', error);
            toast.error('Error updating validation. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/follow-up-and-validations/${id}`);
            setValidations(validations.filter(val => val.id !== id));
            toast.success('Validation deleted successfully!');
        } catch (error) {
            console.error('Error deleting validation:', error);
            toast.error('Error deleting validation. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddFollowUpAndValidation
                onValidationAdded={handleValidationAdded}
                editingValidation={editingValidation}
                onValidationUpdated={handleUpdateValidation}
                setEditingValidation={setEditingValidation}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Cleaning Condition</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Signature</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {validations.map((validation) => (
                                <tr key={validation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{validation.postCleaningCondition}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{validation.remarks}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{validation.agentSignature}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(validation.validationDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(validation)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(validation.id)} color="secondary">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
};

export default FollowUpAndValidationHistory;
