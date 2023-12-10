// Home.jsx
import "./Home.css";
import { Card, Grid, useMediaQuery, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper/core";
import { Pagination } from "swiper/modules";
import NavBar from "../../components/NavBar/NavBar";

// Importa tus imágenes para las secciones aquí
import sectionImage1 from "../../assets/home-1.jpg";
import sectionImage2 from "../../assets/home-2.jpg";
import sectionImage3 from "../../assets/home-3.jpg";
import sectionImage4 from "../../assets/home-4.jpg";
import sectionImage5 from "../../assets/home-5.jpg";

SwiperCore.use([Pagination]);

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
        title: "Step 3. We select your develope",
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
    const isDesktop = useMediaQuery('(min-width:769px)');
    return (
        <>
            <NavBar/>
            <div className="content-container">
                {isDesktop ? (
                    // Versión de escritorio: secciones en una lista
                    <Grid container justifyContent="center" className="section-container">
                        {sections.map((section, index) => (
                            <Grid item xs={12} key={index} className="section">
                                <Card className="card">
                                    <img src={section.imageUrl} alt={section.title} className="card-image" />
                                    <div className="text-content">
                                        <Typography variant="h5" component="h2">{section.title}</Typography>
                                        <Typography>{section.description}</Typography>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    // Versión móvil: carrusel con las secciones
                    <>
                        <Swiper
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            className="carousel"
                        >
                            {sections.map((section, index) => (
                                <SwiperSlide key={index}>
                                    <Card className="card">
                                        <img src={section.imageUrl} alt={section.title} className="card-image" />
                                        <div className="text-content">
                                            <Typography variant="h5" component="h2">{section.title}</Typography>
                                            <Typography>{section.description}</Typography>
                                        </div>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="auth-buttons-container">
                            <Button variant="contained" href="/signup" className="auth-button">
                                <Typography variant="button">Sign Up</Typography>
                            </Button>
                            <Typography className="auth-text">
                                ¿Ya tienes cuenta? <a href="/login" className="auth-link">Log IN</a>
                            </Typography>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Home;