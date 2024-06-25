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
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// Custom styled Switch
const Android12Switch = styled((props) => (
    <Switch {...props} />
))(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.main + theme.palette.action.hoverOpacity,
            },
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundColor: theme.palette.primary.main,
            left: 12,
        },
        '&:after': {
            backgroundColor: theme.palette.primary.main,
            right: 12,
        },
    },
}));

const AddCleaningDetail = ({ onCleaningDetailAdded, editingCleaningDetail, onCleaningDetailUpdated, setEditingCleaningDetail }) => {
    const [open, setOpen] = useState(false);
    const [bedsMade, setBedsMade] = useState(false);
    const [bathroomsCleaned, setBathroomsCleaned] = useState(false);
    const [trashEmptied, setTrashEmptied] = useState(false);
    const [towelsReplaced, setTowelsReplaced] = useState(false);
    const [amenitiesReplaced, setAmenitiesReplaced] = useState(false);
    const [productsUsed, setProductsUsed] = useState('');
    const [houseKeepingServiceId, setHouseKeepingServiceId] = useState('');
    const [houseKeepingServices, setHouseKeepingServices] = useState([]);

    useEffect(() => {
        if (editingCleaningDetail) {
            setBedsMade(editingCleaningDetail.bedsMade);
            setBathroomsCleaned(editingCleaningDetail.bathroomsCleaned);
            setTrashEmptied(editingCleaningDetail.trashEmptied);
            setTowelsReplaced(editingCleaningDetail.towelsReplaced);
            setAmenitiesReplaced(editingCleaningDetail.amenitiesReplaced);
            setProductsUsed(editingCleaningDetail.productsUsed);
            setHouseKeepingServiceId(editingCleaningDetail.houseKeepingService.id);
            setOpen(true);
        }
    }, [editingCleaningDetail]);

    useEffect(() => {
        const fetchHouseKeepingServices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/house-keeping-services');
                setHouseKeepingServices(response.data);
            } catch (error) {
                console.error('Error fetching house keeping services:', error);
            }
        };

        fetchHouseKeepingServices();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCleaningDetail(null);
        clearForm();
    };

    const clearForm = () => {
        setBedsMade(false);
        setBathroomsCleaned(false);
        setTrashEmptied(false);
        setTowelsReplaced(false);
        setAmenitiesReplaced(false);
        setProductsUsed('');
        setHouseKeepingServiceId('');
    };

    const handleSubmit = async () => {
        const cleaningDetailData = {
            bedsMade,
            bathroomsCleaned,
            trashEmptied,
            towelsReplaced,
            amenitiesReplaced,
            productsUsed,
            houseKeepingService: { id: houseKeepingServiceId }
        };

        console.log('Submitting cleaning detail data:', cleaningDetailData); 
        try {
            if (editingCleaningDetail) {
                const response = await axios.put(`http://localhost:8080/api/cleaning-details/${editingCleaningDetail.id}`, cleaningDetailData);
                onCleaningDetailUpdated(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/api/cleaning-details', cleaningDetailData);
                onCleaningDetailAdded(response.data);
            }
            handleClose();
            toast.success(editingCleaningDetail ? 'Cleaning Detail updated successfully!' : 'Cleaning Detail added successfully!');
            clearForm();
        } catch (error) {
            console.error('Error submitting cleaning detail:', error);
            toast.error(editingCleaningDetail ? 'Error updating cleaning detail. Please try again later.' : 'Error adding cleaning detail. Please try again later.');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {editingCleaningDetail ? 'Edit Cleaning Detail' : 'Add Cleaning Detail'}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editingCleaningDetail ? 'Edit Cleaning Detail' : 'Add Cleaning Detail'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to {editingCleaningDetail ? 'update' : 'add'} the cleaning detail.
                    </DialogContentText>
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <FormControlLabel
                            control={<Android12Switch checked={bedsMade} onChange={(e) => setBedsMade(e.target.checked)} />}
                            label="Beds Made"
                        />
                        <FormControlLabel
                            control={<Android12Switch checked={bathroomsCleaned} onChange={(e) => setBathroomsCleaned(e.target.checked)} />}
                            label="Bathrooms Cleaned"
                        />
                        <FormControlLabel
                            control={<Android12Switch checked={trashEmptied} onChange={(e) => setTrashEmptied(e.target.checked)} />}
                            label="Trash Emptied"
                        />
                        <FormControlLabel
                            control={<Android12Switch checked={towelsReplaced} onChange={(e) => setTowelsReplaced(e.target.checked)} />}
                            label="Towels Replaced"
                        />
                        <FormControlLabel
                            control={<Android12Switch checked={amenitiesReplaced} onChange={(e) => setAmenitiesReplaced(e.target.checked)} />}
                            label="Amenities Replaced"
                        />
                        <TextField
                            fullWidth
                            label="Products Used"
                            variant="outlined"
                            value={productsUsed}
                            onChange={(e) => setProductsUsed(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>House Keeping Service</InputLabel>
                            <Select
                                value={houseKeepingServiceId}
                                onChange={(e) => setHouseKeepingServiceId(e.target.value)}
                            >
                                {houseKeepingServices.map((service) => (
                                    <MenuItem key={service.id} value={service.id}>
                                        {service.houseKeepingAgent}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingCleaningDetail ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCleaningDetail;
