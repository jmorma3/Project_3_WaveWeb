import "./MyProjects.css"

import { useState, useEffect } from "react"

//Importamos los componentes:
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects"
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import { Typography } from "@mui/material";

import { getUserProjects } from '../../services/projectService'
import { getOwnMeetings } from "../../services/agendaService"

import ToggleNewProjects from "../../components/ToggleNewProjects/ToggleNewProjects";

const MyProjects = () => {

    const [userProjects, setUserProjects] = useState([])
    const [devMeetings, setDevMeetings] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserProjects()
            setUserProjects(result)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOwnMeetings()
            setDevMeetings(result)
        }
        fetchData()
    }, [])


    const displayUserProjects = () => {
        const result = userProjects.map(project => {
            return (
                <ProjectCard key={project.id} data={project} />
            )
        })
        return result
    }

    const displayDevAgenda = () => {
        const result = devMeetings.map((meeting) => {

            if (meeting.devId.toString() === localStorage.getItem("userId")) {
                return (
                    <ListItem key={meeting.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <GroupsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Project: ${meeting.projectId}`} secondary={`${meeting.meeting_date} (${meeting.meeting_time})`} />
                    </ListItem>
                )

            }
        })

        return result
    }

    return (
        <>
            <NavBarMyProjects />

            <div style={{ display: "flex", justifyContent: "flex-end", border: "1px solid" }}>
                {localStorage.getItem("userRole") === "dev" ? <ToggleNewProjects /> : null}
            </div>

            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>

                <div style={{ minWidth: "65%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                    {/* Aquí mostramos los proyectos del usuario logeado (sea "dev" o "client") */}
                    {userProjects.length > 0 ? displayUserProjects() : console.log("loading")}
                </div>

                <List sx={{ border: '1px solid', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '15px 0px' }}>
                    <Typography margin="0px 10px" variant="h5" >
                        Next meetings:
                    </Typography>
                    {/* Aquí mostramos la agenda del Dev: */}
                    {devMeetings.length > 0 ? displayDevAgenda() : <Typography padding={2} variant="h6" > Sorry, you don´t have any meetings yet </Typography>}
                </List>

            </div>
        </>


    )
}

export default MyProjects