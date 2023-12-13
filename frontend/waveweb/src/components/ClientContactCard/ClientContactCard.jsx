import "./ClientContactCard.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

export default function ClientContactCard({data}) {
    return (
        <Box sx={{ minWidth: '60%', mt: 5, border: "1px solid black" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                    {`User: "${data.first_name}"`}
                </Typography>
                <Button
                    component={Link} to={localStorage.getItem("userRole") === "admin" ? `/admin/user/${data.id}` : null}  //OJO, pendiente cambiar para navegar a info del cliente si la usamos finalmente...
                    size="small"
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ mt: 2, mr: 2 }}
                    
                >
                    info
                </Button>
            </div>

            <Divider variant="middle" sx={{ mt: 2, mb: 3 }} />

            <Typography variant="subtitle2" sx={{ mb: 2, ml: 2 }}>
                {`role: ${data.role}`}
            </Typography>


            
        </Box>
    );
}
