import "./ProjectInfo_UserCard.css";
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import "./ProjectInfo_UserCard.css";

//Importaciones de las imágenes de user:
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
        <Box sx={{ minWidth: '60%', mt: 5, border: "1px solid black", padding: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                    {`${data.first_name} ${data.last_name}`}
                </Typography>
                <Chip
                    label={data.role}
                    style={{
                        border: "1px solid",
                        backgroundColor: data.role === 'dev' ? 'black' : 'white',
                        color: data.role === 'dev' ? 'white' : 'black'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Avatar
                    alt={`${data.first_name} ${data.last_name}`}
                    src={userImage}
                    sx={{ width: 100, height: 100 }}
                />
                <div style={{ marginLeft: 2 }}>
                    <Typography variant="body2" border={"1px solid red"}>
                        {`${userDescription}`}
                    </Typography>
                    {data.role === 'dev' && (
                        <Rating name="user-rating" value={4} readOnly />
                        // Reemplaza el valor 4 por la puntuación real del usuario
                    )}
                </div>
            </div>
        </Box>
    );
}
