import "./Agenda"

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CalendarIcon from '@mui/icons-material/Today';  // Asegúrate de importar el ícono adecuado
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Agenda = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleCreateMeeting = () => {
        // Implementa la lógica para crear una nueva reunión aquí
        handleCloseDialog();
    };

    return (
        <Card sx={{ display: { xs: 'none', md: 'block' } }}>
            {/* Aquí deberías cambiar 'CalendarIcon' por el ícono de calendario que estás utilizando */}
            <CalendarIcon sx={{ width: 100, height: 100, margin: 'auto', paddingTop: 2 }} />

            <CardActions>
                <Button variant="contained" size="small" onClick={handleOpenDialog}>
                    New Meeting
                </Button>
            </CardActions>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Create New Meeting</DialogTitle>
                <DialogContent>
                    {/* Agrega los campos necesarios para crear la reunión, como fecha, hora, etc. */}
                    {/* Ejemplo: <TextField label="Meeting Name" fullWidth /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleCreateMeeting} variant="contained" color="primary">
                        Create Meeting
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Agenda;