//Importaciones de librerías externas
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { Paper } from '@mui/material';
import { Modal } from "@mui/material";

//Importamos componentes y estilos
import "./Admin.css"
import NavBarMyProjects from '../../components/NavBarMyProjects/NavBarMyProjects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ClientContactCard from '../../components/ClientContactCard/ClientContactCard';
import HiAdminCard from "../../components/HiAdminCard/HiAdminCard";

//Importamos imágenes
import statisticsImage from "../../assets/Statitstics_Admin.jpeg"


//Importamos los servicios
import { getAllUsers } from '../../services/userService';
import { getAllProjects } from '../../services/projectService';

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

    const displayAllUsers = () => users.map(user => <ClientContactCard key={user.id} data={user} />);
    const displayAllProjects = () => projects.map(project => <ProjectCard key={project.id} data={project} />);

    return (
        <>
            <div className="water-background">
                {/* Este modal es el que muestra la "HiAdminCard" */}
                <div className='adminpage-container'>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div>
                            <HiAdminCard />
                        </div>
                    </Modal>

                    <NavBarMyProjects />

                    <Typography
                        variant="h4"
                        align="center"
                        style={{ margin: '20px' }}>
                        ADMIN Control Panel
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                        <div style={{ width: '45%' }}>

                            <Accordion style={{ marginBottom: '10px' }}>
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

                            <Accordion style={{ marginBottom: '10px' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Projects
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
                                    >Create New Project
                                    </Button>
                                    {projects.length > 0 ? displayAllProjects() : <Typography>No projects to show.</Typography>}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={{ marginBottom: '10px' }}>
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

                            <Accordion style={{ marginBottom: '10px' }}>
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

                            <Accordion style={{ marginBottom: '10px' }}>
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

                            <Accordion style={{ marginBottom: '10px' }}>
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

                            <Accordion style={{ marginBottom: '10px' }}>
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

                        <Divider orientation="vertical" flexItem />

                        <div style={{ width: '45%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        style={{ backgroundColor: 'white' }}
                                    />
                                </LocalizationProvider>
                            </LocalizationProvider>

                            <Paper style={{ margin: '10px', padding: '10px' }}>
                                <Typography variant="h6">Statistics...</Typography>
                                {/* Incluir imagen aquí */}
                                {/* <img src={statisticsImage} height="250px" width= "350px" alt="" /> */}

                            </Paper>

                            <Paper style={{ margin: '10px', padding: '10px' }}>
                                <Typography variant="h6">Users </Typography>
                                <Typography variant="body1">Total Clients: {clientCounter}</Typography>
                                <Typography variant="body1">Total Devs: {devCounter}</Typography>
                                <Typography variant="h6">Projects:</Typography>
                                <Typography variant="body1">Total Projects: {projects.length}</Typography>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
