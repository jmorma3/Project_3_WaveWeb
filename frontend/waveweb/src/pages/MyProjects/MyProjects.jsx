import React, { useState, useEffect } from "react";
import "./MyProjects.css";

// Importaciones de Material-UI
import { Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

// Importaciones de tus componentes personalizados
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

    const displayUserAgenda = () => userMeetings.map(meeting => (
        <ListItem key={meeting.id}>
            <ListItemAvatar>
                <Avatar>
                    <GroupsIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Project: ${meeting.projectId}`} secondary={`${meeting.meeting_date} (${meeting.meeting_time})`} />
        </ListItem>
    ));

    return (
        <>
            <NavBarMyProjects />
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px", borderBottom: "1px solid #ccc" }}>
                {localStorage.getItem("userRole") === "dev" && <ToggleNewProjects />}
            </div>
            <Typography variant="h4" align="center" style={{ margin: '20px' }}>
                {localStorage.getItem("userRole").toUpperCase() + " Dashboard"}
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
                <div style={{ width: '45%', margin: '10px', overflowY: 'auto', maxHeight: '600px' }}>
                    <Typography variant="h5" style={{ marginBottom: '10px' }}>Your Projects</Typography>
                    {userProjects.length > 0 ? displayUserProjects() : <Typography>You still don´t have any project</Typography>}
                </div>

                <Divider orientation="vertical" flexItem />

                <Paper style={{ width: '45%', padding: '10px', margin: '10px' }}>
                    <Typography variant="h5" style={{ marginBottom: '10px' }}>Next meetings:</Typography>
                    <List>
                        {userMeetings.length > 0 ? displayUserAgenda() : <Typography>No meetings yet</Typography>}
                    </List>
                </Paper>

            </div>
        </>
    );
};

export default MyProjects;
