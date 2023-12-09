import "./ClientContactCard.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ChatIcon from '@mui/icons-material/Chat';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import { Link } from 'react-router-dom';

export default function ClientContactCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }} />
                <Typography
                    gutterBottom variant="h6"
                    component="div">
                    Customer name
                </Typography>
            </Stack>
            <CardActions sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Button size="small" component={Link} to="/chat-mobile">
                    <ChatIcon sx={{ marginRight: 1 }} />
                    CHAT
                </Button>
                <Button size="small" component={Link} to="/meetings-calendar-mobile">
                    <EditCalendarIcon sx={{ marginRight: 1 }} /> NEW MEETING
                </Button>
            </CardActions>
        </Card>
    );
}
