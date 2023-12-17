import "./ProjectInfo.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Accordion, AccordionSummary, AccordionDetails, IconButton, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';


// Importaciones de tus servicios y componentes
import { getOwnMeetings } from "../../services/agendaService";
import { getUserOneProject } from "../../services/projectService";
import { getUserById } from "../../services/userService";
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects";
import ChatWeb from "../../components/ChatWeb/ChatWeb";
import ProjectInfoCard_Client from "../../components/ProjectInfoCard_Client/ProjectInfoCard_Client";
import ProjectInfoCard_Dev from "../../components/ProjectInfoCard_Dev/ProjectInfoCard_Dev";
import Agenda_Dev from "../../components/Agenda_Dev/Agenda_Dev";
import ProjectInfo_UserCard from "../../components/ProjectInfo_UserCard/ProjectInfo_UserCard";

const ProjectInfo = () => {
    const { projectId } = useParams();
    const [userOneProject, setUserOneProject] = useState({});
    const [myDevOrClient, setMyDevOrClient] = useState({})
    const [isChatVisible, setIsChatVisible] = useState(false)

    const [userMeetings, setUserMeetings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const project = await getUserOneProject(projectId);
            if (localStorage.getItem("userRole") === "dev") {
                const myClient = await getUserById(project.clientId)
                setMyDevOrClient(myClient)
            } else {
                const myDev = await getUserById(project.devId)
                setMyDevOrClient(myDev)
            }
            setUserOneProject(project);
        };
        fetchData();
    }, [projectId]);

    const handleChatIconClick = () => {
        setIsChatVisible(!isChatVisible)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOwnMeetings();
            setUserMeetings(result);
        };
        fetchData();
    }, []);

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
            case 5:
                projectName = "Kwik-E-Mart"
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
                <div>
                    <Button
                        variant="contained"
                        href="/myProjects"
                        sx={{
                            borderRadius: '25px',
                            padding: '1px 20px',
                            width: 'fit-content',
                            marginLeft: "30px",
                            marginTop: "15px"
                        }} >
                        <Typography variant="button">
                            Back to Dashboard
                        </Typography>
                    </Button>
                </div>
                <Grid container spacing={2} style={{ padding: '30px' }}>
                    {/* Columna de Información del Proyecto y Usuario */}
                    <Grid item xs={12} md={7}>
                        {localStorage.getItem("userRole") === "client" ? <ProjectInfoCard_Client data={userOneProject} /> : <ProjectInfoCard_Dev data={userOneProject} />}
                        <ProjectInfo_UserCard data={myDevOrClient} />
                    </Grid>

                    {/* Columna de Agenda para Escritorio y Móvil */}
                    <Grid item xs={12} md={5} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Centra en móviles
                        justifyContent: 'flex-start', // Alineación superior en escritorio
                    }}>
                        {localStorage.getItem("userRole") === "dev" ? <Agenda_Dev data={userOneProject} />
                            :
                            <>
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
                            </>
                        }
                    </Grid>
                </Grid>

                {/* Accordion de Chat en la esquina inferior derecha */}
                <Accordion
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        width: '500px',
                        zIndex: 1000,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: '10px'
                    }}
                    expanded={isChatVisible}
                    onChange={handleChatIconClick}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ transform: isChatVisible ? 'rotate(180deg)' : 'rotate(180deg)' }} />}
                        aria-controls="chat-content"
                        id="chat-header"
                    >
                        <IconButton color="primary">
                            <ChatIcon />
                        </IconButton>
                        <Typography margin={"6px 6px"} alignContent={"center"}>Chat</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChatWeb />
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};

export default ProjectInfo;
