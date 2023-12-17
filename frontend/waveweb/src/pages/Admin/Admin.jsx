//Importaciones de librerías externas
import React, { useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
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
import { Link } from 'react-router-dom';

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

    const displayAllUsers = () => users.map(user => <Link key={user.id} to={`/admin/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} ><ProjectInfo_UserCard data={user} /></Link>);
    const displayAllProjects = () => projects.map(project => <ProjectCard key={project.id} data={project} />);

    const accordionStyle = {
        marginBottom: '10px',
        borderRadius: '10px',
        overflow: 'hidden',

    };

    return (
        <>
            <div className="water-background">
                <NavBarMyProjects />

                <Modal open={openModal} onClose={handleCloseModal}>
                    <>
                        <HiAdminCard />
                    </>
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
                    <Grid item xs={12} md={6} >

                        {/* Contenedor izquierdo */}
                        <div style={{ width: '100%', overflowY: 'auto', maxHeight: '80vh' }}>
                            {/* Accordion de Users */}
                            <Accordion style={accordionStyle}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                                    <Typography sx={{ fontSize: "1.2rem" }}>
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
                    <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
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
                                <div style={{ width: '100%', height: '350px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                    <img src={statisticsImage} alt="Statistics" style={{ width: '100%', height: '350px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} />
                                </div>
                            </Paper>

                            <Paper style={{
                                marginTop: '15px',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                                backgroundColor: '#f5f5f5', // Un fondo ligeramente gris para un contraste suave
                            }}>
                                <Typography variant="h6" style={{ marginBottom: '15px', color: '#333', fontWeight: 'bold' }}>
                                    Users
                                </Typography>

                                <Typography variant="body1" style={{ marginBottom: '10px', color: '#555' }}>
                                    Total Clients: {clientCounter}
                                </Typography>

                                <Typography variant="body1" style={{ marginBottom: '10px', color: '#555' }}>
                                    Total Devs: {devCounter}
                                </Typography>

                                <Divider style={{ margin: '20px 0' }} />

                                <Typography variant="h6" style={{ marginBottom: '15px', color: '#333', fontWeight: 'bold' }}>
                                    Projects
                                </Typography>

                                <Typography variant="body1" style={{ color: '#555' }}>
                                    Total Projects: {projects.length}
                                </Typography>
                            </Paper>


                        </div>
                    </Grid>
                </Grid>




            </div>
        </>
    );
};

export default Admin;