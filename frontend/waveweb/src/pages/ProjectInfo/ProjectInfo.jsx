import "./ProjectInfo.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from "@mui/material";


// Importaciones de tus servicios y componentes
import { getUserOneProject } from "../../services/projectService";
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects";
import ChatWeb from "../../components/ChatWeb/ChatWeb";
import ProjectInfoCard_Client from "../../components/ProjectInfoCard_Client/ProjectInfoCard_Client";
import ProjectInfoCard_Dev from "../../components/ProjectInfoCard_Dev/ProjectInfoCard_Dev";
import Agenda_Dev from "../../components/Agenda_Dev/Agenda_Dev";

const ProjectInfo = () => {
    const { projectId } = useParams();
    const [userOneProject, setUserOneProject] = useState({});
    const [isChatVisible, setIsChatVisible] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserOneProject(projectId);
            setUserOneProject(result);
        };
        fetchData();
    }, [projectId]);

    const handleChatIconClick = () => {
        setIsChatVisible(!isChatVisible)
    }

    return (
        <>
            <NavBarMyProjects />

            <Grid container >
                <Grid item xs={12} md={7}
                    style={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: '10px'
                    }}>

                    {/* ProjectInfoCard */}
                    {localStorage.getItem("userRole") === "client" ? <ProjectInfoCard_Client data={userOneProject} /> : <ProjectInfoCard_Dev data={userOneProject} />}

                    {/* Agenda_Dev */}
                    {localStorage.getItem("userRole") === "dev" && <Agenda_Dev data={userOneProject} />}

                </Grid>

                <Grid item md= {5}
                    style={{
                        // border: "1px solid red",
                        display: "flex",
                        justifyContent: "center",
                        padding: '10px'
                    }}
                    >

                    {/* ChatWeb para web */}
                    <ChatWeb />

                </Grid>

            </Grid>

            
            {/* Botón de Chat para móviles */}
            {/* <IconButton sx={{
                position: 'fixed',
                right: 20,
                bottom: 20,
                display: { md: 'none' }
            }}
                color="primary"
                onClick={handleChatIconClick}>

                <ChatIcon />

            </IconButton> */}

            {/* Condición para mostrar ChatWeb en móvil cuando se hace clic en el icono */}
            {/* {isChatVisible && <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 1000
            }}>
                <ChatWeb />
            </div>} */}
        </>
    );
};

export default ProjectInfo;
