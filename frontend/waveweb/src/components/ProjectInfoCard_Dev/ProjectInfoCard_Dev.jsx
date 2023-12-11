import "./ProjectInfoCard_Dev.css"

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { updateOwnProject } from "../../services/projectService";

const steps = ['Not Started', 'In Progress Step 1', 'In Progress Step 2', 'Completed'];

const ProjectInfoCard_Dev = ({ data }) => {
  const [progressStatus, setProgressStatus] = useState(data.progress_status);

  useEffect(() => {
    setProgressStatus(data.progress_status);
  }, [data.progress_status]);

  //Esta función actualizará el estado del proyecto, tanto en el backend (mediante la llamada a la API a través del service) como en el frontend (a través de la variable de estado "progressStatus")
  const handleUpdateProgress = async (newProgressStatus) => {
      // Llamamos al servicio para actualizar el estado del proyecto, pasándole además el "newProgressStatus" como nuevo valor para actualizarlo.
      await updateOwnProject(data.id, newProgressStatus);

      // Actualizamos la variable de estado "progressStatus", pasándole el valor que recoge por parámetro la función "handleUpdateProgress"
      setProgressStatus(newProgressStatus);
  };

  const handleNext = () => {
    const nextStep = progressStatus + 1;
    handleUpdateProgress(nextStep);
  };

  const handlePrev = () => {
    const prevStep = progressStatus - 1;
    handleUpdateProgress(prevStep);
  };

  return (
    <Box sx={{ height: "fit-content", width: '50%', mt: 2, border: '1px solid black' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
          {`Project "${data.project_name}"`}
        </Typography>
      </div>

      <Typography variant="subtitle2" sx={{ mt: 2, ml: 2 }}>
        {`${data.project_type}`}
      </Typography>

      <Divider variant="middle" sx={{ mt: 2, mb: 3 }} />

      <Box sx={{ mb: 2 }}>
        <Stepper activeStep={progressStatus} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 16px' }}>
        <Button variant="contained" onClick={handlePrev} disabled={progressStatus === 0}>
          Prev
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={progressStatus === steps.length - 1}>
          Next
        </Button>
      </div>
    </Box>
  );
};

export default ProjectInfoCard_Dev;
