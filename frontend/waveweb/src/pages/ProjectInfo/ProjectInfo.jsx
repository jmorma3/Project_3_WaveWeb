import "./ProjectInfo.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {Divider} from "@mui/material";

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

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
            <div style={{ flex: 1, margin: '10px', overflowY: 'auto', maxHeight: '600px' }}>
                {localStorage.getItem("userRole") === "client" ? 
                    <ProjectInfoCard_Client data={userOneProject} /> : 
                    <ProjectInfoCard_Dev data={userOneProject} />}
            </div>

            <Divider orientation="vertical" flexItem />

            <div style={{  display: "flex", justifyContent: "center", flex: 1, margin: '10px', overflowY: 'auto', maxHeight: '600px' }}>
                {localStorage.getItem("userRole") === "dev" && <Agenda_Dev data={userOneProject} />}
            </div>
        </div>

        <ChatWeb />
    </>
    );
};

export default ProjectInfo;
