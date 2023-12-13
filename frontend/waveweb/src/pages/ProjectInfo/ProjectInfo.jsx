import "./ProjectInfo.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Grid, Typography } from "@mui/material";

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserOneProject(projectId);
            setUserOneProject(result);
        };
        fetchData();
    }, [projectId]);

    return (
        <>
            <NavBarMyProjects />
            <Grid container spacing={2} style={{ padding: '20px' }}>
                <Grid item xs={12} md={6}>
                    {localStorage.getItem("userRole") === "client" ?
                        <ProjectInfoCard_Client data={userOneProject} /> :
                        <ProjectInfoCard_Dev data={userOneProject} />
                    }
                </Grid>
                {localStorage.getItem("userRole") === "dev" &&
                    <Grid item xs={12} md={6}>
                        <Agenda_Dev data={userOneProject} />
                    </Grid>
                }
            </Grid>

            <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '20px' }}>Project Chat</Typography>
                <ChatWeb />
            </Paper>
        </>
    );
};

export default ProjectInfo;
