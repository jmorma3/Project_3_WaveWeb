import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function Agenda() {
    return (
        <div style={{ border: "1px solid", display: "flex", justifyContent:"center", width: "fit-content", margin: "15px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    defaultValue={dayjs('2023-12-11')}
                    slotProps={{
                        toolbar: { toolbarFormat: 'YYYY-MM-DD', hidden: false },
                    }}
                />
            </LocalizationProvider>

        </div>
    );
}