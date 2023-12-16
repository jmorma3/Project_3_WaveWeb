import "./ProjectInfo_UserCard.css";
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import "./ProjectInfo_UserCard.css";

//Importaciones de las imágenes de user:
import user1 from "../../assets/user_admin.jpeg"
import user2 from "../../assets/user_neo.jpg"
import user3 from "../../assets/user_trinity.jpg"
import user4 from "../../assets/user_tyler.jpg"
import user5 from "../../assets/user_darth.png"
import user6 from "../../assets/user_edward.jpg"
import user7 from "../../assets/user_tyrion.jpg"
import userNew from "../../assets/user_apu.png"

export default function ProjectInfo_UserCard({ data }) {

    let userImage
    let userDescription
    switch (data.id) {
        case 1:
            userImage = user1
            userDescription = "I am not in danger, I am the danger."
            break;
        case 2:
            userImage = user2
            userDescription = "I´m the chosen One!"
            break;
        case 3:
            userImage = user3
            userDescription = "I hacked the Internal Revenue Service's DB. Thought I was a guy? Most guys do..."
            break;
        case 4:
            userImage = user4
            userDescription = "Excuse me, I forgot the first rule of the Fight Club..."
            break;
        case 5:
            userImage = user5
            userDescription = "I like my coffee on the dark side..."
            break;
        case 6:
            userImage = user6
            userDescription = "You need a haircut, I can give you a hand..."
            break;
        case 7:
            userImage = user7
            userDescription = "That´s what I do. I drink, and I know things..."
            break;
        case 8:
            userImage = userNew
            userDescription = "Thank you. Come again!"
            break;

    }

    return (
        <Box sx={{
            width: "100%", 
            maxWidth: 800,
            mt: 5,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
        }}>
            <Avatar
                alt={`${data.first_name} ${data.last_name}`}
                src={userImage}
                sx={{
                    width: 150, 
                    height: 150,
                    border: '2px solid black',
                    mr: 2
                }}
            />

            <div style={{ flex: 1, position: 'relative' }}>
                <Chip
                    label={data.role}
                    sx={{
                        border: "1px solid",
                        backgroundColor: 'black',
                        color: 'white',
                        position: 'absolute',
                        top: -15, 
                        right: 8
                    }}
                />

                <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                    {`${data.first_name} ${data.last_name}`}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'left', mb: 2, fontStyle: 'italic' }}>
                    {`"${userDescription}"`}
                </Typography>

                {data.role === 'dev' && (
                    <Rating name="user-rating" value={4} readOnly sx={{ mb: 1 }} />
                )}
            </div>
        </Box>
    );
}