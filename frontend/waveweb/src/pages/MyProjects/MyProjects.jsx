// Importaciones de librerías externas
import React, { useState, useEffect } from "react";
import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

// Importaciones de componentes y estilos
import "./MyProjects.css";
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects";
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ToggleNewProjects from "../../components/ToggleNewProjects/ToggleNewProjects";

// Importaciones de tus servicios
import { getUserProjects } from '../../services/projectService';
import { getOwnMeetings } from "../../services/agendaService";

const MyProjects = () => {
    const [userProjects, setUserProjects] = useState([]);
    const [userMeetings, setUserMeetings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserProjects();
            setUserProjects(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOwnMeetings();
            setUserMeetings(result);
        };
        fetchData();
    }, []);

    const displayUserProjects = () => userProjects.map(project => (
        <ProjectCard key={project.id} data={project} />
    ));

    const displayUserAgenda = () => userMeetings.map(meeting => {
        let projectName
        switch (meeting.projectId) {
            case 1:
                projectName = "Figth Club Gym Web"
                break;
            case 2:
                projectName = "Death Star Empire´s Web"
                break;
            case 3:
                projectName = "Scissorhands Beauty Salon Web"
                break;
            case 4:
                projectName = "Tyrion´s Winestore Web"
                break;
        }

        return (
            <ListItem key={meeting.id}>
                <ListItemAvatar>
                    <Avatar>
                        <GroupsIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`Project: ${projectName}`}
                    secondary={`${meeting.meeting_date} (${meeting.meeting_time})`} />
            </ListItem>
        )
    })

    return (
        <>
            <div className="water-background" >
                <NavBarMyProjects />

                <div className="dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px',
                    padding: "5px"
                }}>
                    {/* Mensaje de bienvenida y toggle */}
                    <Typography
                        align="left"
                        sx={{
                            fontSize: '1.2rem', // Ajusta este valor según tus necesidades
                            margin: '0px' // Ajustado para alinear con el toggle
                        }}
                    >
                        {`Hi ${localStorage.getItem("userFirstName")} ${localStorage.getItem("userLastName")}! Welcome to your dashboard`}
                    </Typography>
                    {localStorage.getItem("userRole") === "dev" && <ToggleNewProjects />}
                </div>


                {/* Contenido principal */}
                <Grid container>
                    <Grid item xs={12} md={7} style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <div className="dashboard-content" style={{
                            padding: "10px",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'space-around',
                            maxHeight: '580px' // Altura máxima ajustada al viewport menos la altura del NavBar y margenes
                        }}>
                            {/* Sección de proyectos */}
                            <div className="projects-section" style={{
                                width: '100%',
                                overflowY: 'auto',
                                maxHeight: '100%', // Asegura que no se exceda del contenedor padre
                                padding: '10px 0', // Espacio vertical para el centrado
                            }}>
                                {userProjects.length > 0 ? (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center', // Centra los elementos horizontalmente
                                    }}>
                                        {displayUserProjects()}
                                    </div>
                                ) : (
                                    <Typography style={{ textAlign: 'center' }}>You still don´t have any project</Typography>
                                )}
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={5} style={{ overflowY: 'auto', maxHeight: '580px', display:"flex", justifyContent: "center" }}>

                        {/* Sección de reuniones */}
                        <div className="meetings-section" style={{
                           
                            width: '85%', // Más estrecho para reuniones
                            margin: '10px',
                            overflowY: 'auto',
                            height: '500px',
                            backgroundColor: 'white', // Fondo blanco
                            borderRadius: '10px', // Borde redondeado
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombreado
                        }}>
                            <div style={{
                                // margin: "0px 10px",
                                backgroundColor: 'black', // Fondo negro para el título
                                color: 'white', // Texto blanco
                                padding: '5px' // Espaciado interno
                            }}>
                                <Typography
                                    variant="h6"
                                    marginLeft={"15px"}
                                >
                                    Next meetings:
                                </Typography>
                            </div>

                            <List sx={{ margin: '0px 0px' }}>
                                {userMeetings.length > 0 ? displayUserAgenda() : <Typography padding={2} variant="h6">Sorry, you don´t have any meetings yet</Typography>}
                            </List>
                        </div>
                    </Grid>
                </Grid>





            </div >
        </>
    );
};

export default MyProjects;
