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
                <div style={{ width: '45%', margin: '10px', overflowY: 'auto', maxHeight: '600px' }}>

                    <List sx={{ border: '1px solid', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '15px 0px' }}>
                        <Typography margin="0px 10px" variant="h5" >
                            Next meetings:
                        </Typography>
                        {userMeetings.length > 0 ? displayUserAgenda() : <Typography padding={2} variant="h6" > Sorry, you don´t have any meetings yet </Typography>}
                    </List>
                </div>

            </div>
        </>
    );
};

export default MyProjects;
