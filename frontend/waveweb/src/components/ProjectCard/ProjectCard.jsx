import React from 'react';
import { Chip, Box, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "./ProjectCard.css";

const steps = ['Not Started', 'In Progress Step 1', 'In Progress Step 2', 'Completed'];

//Importamos las imágenes de los proyectos:
import project1 from "../../assets/project_gym.jpg"
import project2 from "../../assets/project_starwars.jpeg"
import project3 from "../../assets/project_barber.jpg"
import project4 from "../../assets/project_wine.jpg"
import project5 from "../../assets/project_apu.jpeg"

export default function ProjectCard({ data }) {
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
        <Card sx={{ width: "100%", maxWidth: 800, mb: 5,borderRadius: '10px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={projectImage} // Cambia esto por la imagen del proyecto
                    alt={data.project_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" fontWeight="bold" component="div">
                        {`Project: ${data.project_name.toUpperCase()}`}
                    </Typography>
                    <Chip
                        label={data.project_type}
                        style={{
                            border: "1px solid",
                            backgroundColor: 'white'
                        }}
                    />

                    <Stepper
                        activeStep={data.progress_status}
                        alternativeLabel
                        sx={{ margin: '15px 30px' }}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
            </CardActionArea>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    component={Link}
                    to={localStorage.getItem("userRole") === "admin" ? `/admin/project/${data.id}` : `/myProjects/${data.id}`}
                    size="small"
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{
                        borderRadius: '25px',
                        padding: '1px 20px',
                        margin: '10px'

                    }}
                >
                    info
                </Button>
            </Box>
        </Card>
    );
}