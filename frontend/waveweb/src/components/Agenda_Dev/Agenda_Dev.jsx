import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { createNewMeeting } from '../../services/agendaService';

export default function Agenda_Dev({ data }) {
    const [dateValue, setDateValue] = useState(dayjs('2023-12-21'));
    const [timeValue, setTimeValue] = useState(dayjs('00:00'));
    const [isPopupOpen, setPopupOpen] = useState(false);

    const chosenDate = `${dateValue.$y}-${(dateValue.$M + 1).toString().length < 2 ? (`0${dateValue.$M + 1}`) : (`${dateValue.$M + 1}`)}-${dateValue.$D.toString().length < 2 ? (`0${dateValue.$D}`) : (`${dateValue.$D}`)}`;
    const chosenTime = `${timeValue.$H}:${timeValue.$m}`;

    const handleAddMeeting = () => {
        setPopupOpen(true);
    };

    const handleConfirmMeeting = async () => {
        try {
            await createNewMeeting(data.id, data.clientId, chosenDate, chosenTime);
        } catch (error) {
            console.log(error);
        }
        setPopupOpen(false);
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    return (
        <div style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2px',
            width: '100%',
            maxWidth: '400px',
            alignSelf: 'center',
            height: 'fit-content', // Ajuste para la altura
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
            </LocalizationProvider>

            <Button
                variant="contained"
                onClick={handleAddMeeting}
                sx={{
                    mt: '10px',
                    mb: '5px',
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: '20px', // Más redondeado
                    width: 'fit-content',
                    alignSelf:'center',
                    padding: '6px 80px', // Más pequeño
                    fontSize: '0.875rem' // Tamaño de fuente más pequeño
                }}>
                Add new Meeting
            </Button>

            <Dialog open={isPopupOpen} onClose={handlePopupClose}>
                <DialogTitle>
                    <p>Please choose meeting time:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimeField
                            value={timeValue}
                            onChange={(newValue) => setTimeValue(newValue)}
                            format="HH:mm"
                        />
                    </LocalizationProvider>
                </DialogTitle>
                <DialogTitle>
                    {`Confirm new meeting at ${chosenDate}?`}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handlePopupClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmMeeting} color="primary" variant="contained" sx={{ bgcolor: 'black', color: 'white' }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
