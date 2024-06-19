import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function MaintenanceFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [maintenanceLocation, setMaintenanceLocation] = React.useState('');
  const [maintenanceNumber, setMaintenanceNumber] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    // Send form data to backend or perform desired action
    console.log(formJson);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Report Maintenance Issue
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Report Maintenance Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the details of the maintenance issue:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="issue-description"
            name="issueDescription"
            label="Issue Description"
            multiline
            rows={4}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="intervention-date"
            name="interventionDate"
            label="Intervention Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="maintenance-location-label">Location</InputLabel>
            <Select
              labelId="maintenance-location-label"
              id="maintenance-location"
              value={maintenanceLocation}
              onChange={(event) => setMaintenanceLocation(event.target.value)}
              label="Location"
            >
              <MenuItem value="room">Room</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
              <MenuItem value="pool">Pool</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            id="maintenance-number"
            name="maintenanceNumber"
            label="Location Number"
            fullWidth
            variant="standard"
            value={maintenanceNumber}
            onChange={(event) => setMaintenanceNumber(event.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="priority"
            name="priority"
            label="Priority"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="responsible-technician"
            name="responsibleTechnician"
            label="Responsible Technician"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
