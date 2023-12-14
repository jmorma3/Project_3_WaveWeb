//Importaciones de librerías externas
import { useState } from 'react';
import { Card, Button, Typography, Stepper, Step, StepLabel, Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//Importamos componentes y estilos
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";


// Importamos las imágenes de las secciones
import sectionImage1 from "../../assets/home-1.jpg";
import sectionImage2 from "../../assets/home-2.jpg";
import sectionImage3 from "../../assets/home-3.jpg";
import sectionImage4 from "../../assets/home-4.jpg";
import sectionImage5 from "../../assets/home-5.jpg";


const sections = [
    {
        title: "Welcome to Wave Web",
        description: "Tailored digital solutions to take your business to the next level",
        imageUrl: sectionImage1,
    },
    {
        title: "Step 1: Define your project",
        description: "Fill out our short form and define your goals",
        imageUrl: sectionImage2,
    },
    {
        title: "Step 2. Choose the plan that's right for you",
        description: "Select the plan that best fits your needs and budget with our expert help",
        imageUrl: sectionImage3,
    },
    {
        title: "Step 3. We select your developer",
        description: "Our team has successfully passed rigorous technical tests and interviews",
        imageUrl: sectionImage4,
    },
    {
        title: "Step 4. First Meeting and Match in 48 hours",
        description: "You will have a first meeting with your dev and from there the adventure begins",
        imageUrl: sectionImage5,
    }

];

const Home = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1 === sections.length ? 0 : prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1 < 0 ? sections.length - 1 : prevActiveStep - 1);
    };

    return (
        <>
            <NavBar />
            <div className="content-container">
                <Box className="carousel-container">

                    <IconButton
                        className="carousel-button"
                        onClick={handleBack}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <Card style={{ boxShadow: 'none', border: 'none' }} >
                        <div className="polaroid">
                            <img
                                src={sections[activeStep].imageUrl}
                                alt={sections[activeStep].title}
                                className="card-image" />

                            <div className="text-content">
                                <Typography
                                    variant="h5"
                                    component="h2">
                                    {sections[activeStep].title}
                                </Typography>
                                <Typography>
                                    {sections[activeStep].description}
                                </Typography>
                            </div>
                        </div>
                    </Card>

                    <IconButton
                        className="carousel-button"
                        onClick={handleNext}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ marginTop: '15px' }}
                    className="stepper">
                    {sections.map((section, index) => (
                        <Step key={index} >
                            <StepLabel>{section.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 4
                    }}
                >
                    <Button
                        variant="contained"
                        href="/signup"
                        sx={{
                            borderRadius: '25px',
                            padding: '1px 20px'
                        }}
                    >
                        Sign Up
                    </Button>
                    <Typography sx={{ mt: 1 }}>
                        Already have an account?
                        <a href="/login"
                            style={{
                                marginLeft: '5px',
                                textDecoration: 'underline'
                            }}
                        >Log In
                        </a>
                    </Typography>
                </Box>
            </div>
        </>
    );
};

export default Home;