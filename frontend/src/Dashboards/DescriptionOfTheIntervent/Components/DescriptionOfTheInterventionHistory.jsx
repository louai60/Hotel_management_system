import React, { useState, useEffect } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';
import AddDescriptionOfTheIntervention from './AddDescriptionOfTheIntervention';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DescriptionOfTheInterventionHistory = () => {
    const [interventions, setInterventions] = useState([]);
    const [editingIntervention, setEditingIntervention] = useState(null);

    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/descriptions');
            setInterventions(response.data);
        } catch (error) {
            console.error('Error fetching interventions:', error);
            toast.error('Error fetching interventions. Please try again later.');
        }
    };

    const handleInterventionAdded = (newIntervention) => {
        setInterventions([...interventions, newIntervention]);
    };

    const handleEditClick = (intervention) => {
        setEditingIntervention(intervention);
    };

    const handleUpdateIntervention = async (updatedIntervention) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/descriptions/${updatedIntervention.id}`, updatedIntervention);
            setInterventions(interventions.map(interv => interv.id === updatedIntervention.id ? response.data : interv));
            setEditingIntervention(null);
            toast.success('Intervention updated successfully!');
        } catch (error) {
            console.error('Error updating intervention:', error);
            toast.error('Error updating intervention. Please try again later.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/descriptions/${id}`);
            setInterventions(interventions.filter(interv => interv.id !== id));
            toast.success('Intervention deleted successfully!');
        } catch (error) {
            console.error('Error deleting intervention:', error);
            toast.error('Error deleting intervention. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-end px-4 pt-4">
            <AddDescriptionOfTheIntervention
                onInterventionAdded={handleInterventionAdded}
                editingIntervention={editingIntervention}
                onInterventionUpdated={handleUpdateIntervention}
                setEditingIntervention={setEditingIntervention}
            />
            <TitleCard>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected Issue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description of Work Performed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials Used</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {interventions.map((intervention) => (
                                <tr key={intervention.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{intervention.detectedIssue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{intervention.descriptionOfWorkPerformed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{intervention.materialsUsed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{intervention.estimatedCostOfMaterials}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{intervention.durationOfIntervention}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button onClick={() => handleEditClick(intervention)} color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(intervention.id)} color="secondary">
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

export default DescriptionOfTheInterventionHistory;
