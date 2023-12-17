import "./ProjectInfoCard_Client.css"
import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { Chip, Box, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { updateOwnProject } from "../../services/projectService";
const steps = ['Not Started', 'In Progress Step 1', 'In Progress Step 2', 'Completed'];

//Importamos las imágenes de los proyectos:
import project1 from "../../assets/project_gym.jpg"
import project2 from "../../assets/project_starwars.jpeg"
import project3 from "../../assets/project_barber.jpg"
import project4 from "../../assets/project_wine.jpg"
import project5 from "../../assets/project_apu.jpeg"

const ProjectInfoCard_Client = ({ data }) => {
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

  let projectImage
  let projectDescription
  switch (data.id) {
    case 1:
      projectImage = project1
      projectDescription = ""
      break;
    case 2:
      projectImage = project2
      projectDescription = ""
      break;
    case 3:
      projectImage = project3
      projectDescription = ""
      break;
    case 4:
      projectImage = project4
      projectDescription = ""
      break;
    case 5:
      projectImage = project5
      projectDescription = ""
      break;

  }

  return (
    <Card sx={{ width: "100%", maxWidth: 800, mb: 5, borderRadius: '10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={projectImage} // Cambia esto por la imagen del proyecto
          alt={data.project_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" fontWeight="bold" component="div" style={{ textTransform: 'uppercase' }}>
            {`${data.project_name}`}
          </Typography>
          <Chip
            label={data.project_type}
            style={{
              border: "1px solid",
              backgroundColor: 'white'
            }}
          />

          <Box sx={{ mb: 2 }}>
            <Stepper
              activeStep={progressStatus}
              alternativeLabel
              sx={{ margin: '15px 30px' }}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </CardContent>
      </CardActionArea>

     
    </Card>


  );
};

export default ProjectInfoCard_Client;
