//Importaciones de librerías externas
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Paper } from '@mui/material';
import { Modal } from "@mui/material";

//Importamos componentes y estilos
import "./Admin.css"
import NavBarMyProjects from '../../components/NavBarMyProjects/NavBarMyProjects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import HiAdminCard from "../../components/HiAdminCard/HiAdminCard";

//Importamos imágenes
import statisticsImage from "../../assets/Statitstics_Admin.jpeg"


//Importamos los servicios
import { getAllUsers } from '../../services/userService';
import { getAllProjects } from '../../services/projectService';
import ProjectInfo_UserCard from '../../components/ProjectInfo_UserCard/ProjectInfo_UserCard';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    //Esta variable de estado para mostrar el "Modal" que contiene la "HiAdminCard"
    const [openModal, setOpenModal] = useState(true);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    //Con esto contabilizamos los usuarios según su "role":
    let devCounter = 0
    let clientCounter = 0

    users.forEach(user => {
        if (user.role === "dev") {
            devCounter++
        } else if (user.role === "client") {
            clientCounter++
        }
    })


    useEffect(() => {
        const fetchData = async () => {
            const usersResult = await getAllUsers();
            setUsers(usersResult);
            const projectsResult = await getAllProjects();
            setProjects(projectsResult);
        };
        fetchData();
    }, []);

    const displayAllUsers = () => users.map(user => <ProjectInfo_UserCard key={user.id} data={user} />);
    const displayAllProjects = () => projects.map(project => <ProjectCard key={project.id} data={project} />);

    const accordionStyle = {
        marginBottom: '10px',
        borderRadius: '10px',
        overflow: 'hidden', // Evita que los bordes redondeados muestren contenido sobresaliente
    };

    return (
        <>
            <div className="water-background">
                <NavBarMyProjects />

                <Modal open={openModal} onClose={handleCloseModal}>
                    <div>
                        <HiAdminCard />
                    </div>
                </Modal>

                <Typography
                    variant="h4"
                    align="left"
                    sx={{
                        fontSize: '1.2rem',
                        margin: '20px'
                    }}>
                    ADMIN Control Panel
                </Typography>

                <Grid container style={{ padding: '20px' }}>

                    {/* Contenedor de Acordiones */}
                    <Grid item xs={12} md={6} sx={{ border: "1px solid red" }}>

                        {/* Contenedor izquierdo */}
                        <div style={{ width: '100%', overflowY: 'auto', maxHeight: '80vh' }}>
                            {/* Accordion de Users */}
                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Users
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New User
                                    </Button>
                                    {users.length > 0 ? displayAllUsers() : <Typography>No users to show.</Typography>}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Projects
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px', marginBottom: '25px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >Create New Project
                                    </Button>
                                    {projects.length > 0 ? displayAllProjects() : <Typography>No projects to show.</Typography>}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Meetings
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New Meeting
                                    </Button>
                                    <Typography sx={{ marginTop: '10px' }}>No meetings to show.</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Invoices
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New Invoice
                                    </Button>
                                    <Typography sx={{ marginTop: '10px' }}>No invoices to show.</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Agenda
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New Agenda
                                    </Button>
                                    <Typography sx={{ marginTop: '10px' }}>No agendas to show.</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Employees
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New Employee
                                    </Button>
                                    <Typography sx={{ marginTop: '10px' }}>No emloyees to show.</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Stuff
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create New Stuff

                                    </Button>
                                    <Typography sx={{ marginTop: '10px' }}>No stuff to show.</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>


                    {/* Contenedor de Estadísticas y Resumen */}
                    <Grid item xs={12} md={6} border={"1px solid red"} sx={{display: "flex", justifyContent: "center"}}>
                        <div style={{
                       width: "75%",
                       overflowY: 'auto',
                       height: 'fit-content',
                       borderRadius: '10px', // Borde redondeado
                      
                   }}>
                        <Paper style={{
                            backgroundColor: 'black', 
                            color: 'white',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombreado
                        }}>
                            <Typography variant="h6" marginLeft={"15px"}>Statistics...</Typography>
                            <img src={statisticsImage} alt="Statistics" style={{ width: '100%', height: '350px',  borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}} />
                        </Paper>

                        <Paper style={{ 
                            marginTop: '15px', 
                            padding: "15px", 
                            borderRadius: '10px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                            <Typography variant="h6" >Users</Typography>
                            <Typography variant="body1">Total Clients: {clientCounter}</Typography>
                            <Typography variant="body1">Total Devs: {devCounter}</Typography>
                            <Typography variant="h6" >Projects:</Typography>
                            <Typography variant="body1">Total Projects: {projects.length}</Typography>
                        </Paper>

                        </div>
                    </Grid>
                </Grid>




            </div>
        </>
    );
};

export default Admin;