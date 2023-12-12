import "./ProjectCard.css"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom";

const steps = ['Not Started', 'In Progress Step 1', 'In Progress Step 2', 'Completed'];

export default function ProjectCard({ data }) {

    return (
        <Box sx={{ minWidth: '60%', mt: 5, border: "1px solid black" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                    {`Project "${data.project_name}"`}
                </Typography>
                <Button
                    component={Link} to={`/myProjects/${data.id}`}
                    size="small"
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ mt: 2, mr: 2 }}
                    
                >
                    info
                </Button>
            </div>

            <Typography variant="subtitle2" sx={{ mt: 2, ml: 2 }}>
                {`${data.project_type}`}
            </Typography>

            <Divider variant="middle" sx={{ mt: 2, mb: 3 }} />

            <Box sx={{ width: '100%', mb: 2 }}>
                <Stepper activeStep={data.progress_status} alternativeLabel>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Box>
    );
}