import "./Agenda_Client.css"

import * as React from 'react';
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import { Typography } from "@mui/material";
import { getOwnMeetings } from "../../services/agendaService";

export default function Agenda_Client({ data }) {

    const [meetingsList, setMeetingsList] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const result = await getOwnMeetings()
            setMeetingsList(result)
            return result
        }
        fetchData()
    }, [])

    const displayProjectMeetings = () => {
        const result = meetingsList.map((meeting) => {
            if (meeting.projectId === data.id) {
                return (
                    <ListItem key={meeting.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <GroupsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={meeting.meeting_date} secondary={meeting.meeting_time} />
                    </ListItem>
                )

            }
        })

        return result
    }


    return (
        <List sx={{ border: '1px solid', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '15px 0px' }}>
            <Typography margin= "0px 10px" variant="h5" >
                Next meetings:
            </Typography>
            {meetingsList.length > 0 ? displayProjectMeetings() : <Typography padding={2} variant="h6" > Sorry, you don´t have any meetings yet </Typography>}
        </List>
    );
}

