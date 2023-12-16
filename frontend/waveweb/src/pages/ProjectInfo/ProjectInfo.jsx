import "./ProjectInfo.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Accordion, AccordionSummary, AccordionDetails, IconButton, Typography } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// Importaciones de tus servicios y componentes
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



    return (
        <>
          <div className="water-background" >
            <NavBarMyProjects />

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
                        {localStorage.getItem("userRole") === "dev" && <Agenda_Dev data={userOneProject} />}
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
