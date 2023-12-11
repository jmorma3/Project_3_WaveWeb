import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { createNewMeeting } from '../../services/agendaService';


export default function Agenda_Dev({ data }) {
    const [dateValue, setDateValue] = useState(dayjs('2023-12-11'));
    const [timeValue, setTimeValue] = useState(dayjs('00:00'));
    const [isPopupOpen, setPopupOpen] = useState(false);

    const chosenDate = `${dateValue.$y}-${(dateValue.$M + 1).toString().length < 2 ? (`0${dateValue.$M + 1}`) : (`${dateValue.$M + 1}`)}-${dateValue.$D.toString().length < 2 ? (`0${dateValue.$D}`) : (`${dateValue.$D}`)}`;
    const chosenTime = `${timeValue.$H}:${timeValue.$m}`

    const { projectId } = useParams()

    const handleAddMeeting = () => {
        setPopupOpen(true);
    };

    const handleConfirmMeeting = async () => {
        // Aquí se realiza la llamada a la API para enviar la información al backend
        try {
            await createNewMeeting(projectId, data.clientId, chosenDate, chosenTime)
        } catch (error) {
            console.log(error)
        }
        // Cerrar el popup después de confirmar
        setPopupOpen(false);
    };

    const handlePopupClose = () => {
        // Cerrar el popup si se cancela
        setPopupOpen(false);
    };

    return (
        <div style={{ border: '1px solid', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '5px 16px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
            </LocalizationProvider>

            <Button variant="contained" onClick={handleAddMeeting}>
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
                    <Button onClick={handleConfirmMeeting} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
