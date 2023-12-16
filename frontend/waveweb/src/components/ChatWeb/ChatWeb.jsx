import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Divider, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { getProjectMessages, sendNewChatMessage } from '../../services/chatMessageService';

import { useParams } from 'react-router-dom';

const ChatWeb = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [refreshChat, setRefreshChat] = useState(false);

  const { projectId } = useParams();

  //Usamos el hook "useRef" para poder manejar el autoscroll. 
  //Según documentación de React, este hook permite referencia a un valor que no es necesario para renderizar el componente. 
  const chatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProjectMessages(projectId);
      setChatHistory(result);
      scrollToBottom();
    };
    fetchData();
  }, [projectId, refreshChat]);


  //función creada para automatizar el scroll hacia abajo acada vez que se actualice el "chatHistory":
  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const handleMessageSend = async () => {
    try {
      if (messageInput.trim() !== '') {
        const newMessage = await sendNewChatMessage(projectId, messageInput);

        if (newMessage) {
          setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
          setMessageInput('');
          setRefreshChat(!refreshChat);
          scrollToBottom();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayChatHistory = () => {
    return chatHistory.map((message, index) => {
        const isCurrentUser = parseInt(localStorage.getItem("userId")) === message.userId;
        return (
            <ListItem
                key={index}
                sx={{
                    margin: "5px",
                    maxWidth: '70%',
                    borderRadius: '10px',
                    backgroundColor: isCurrentUser ? 'black' : 'white',
                    color: isCurrentUser ? 'white' : 'black',
                    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        width: 0,
                        height: 0,
                        border: '10px solid transparent',
                        borderBottomColor: isCurrentUser ? 'black' : 'white',
                        right: isCurrentUser ? '0' : 'auto',
                        left: isCurrentUser ? 'auto' : '0',
                        transform: isCurrentUser ? 'translateX(100%)' : 'translateX(-100%)'
                    }
                }}
            >
                {message.message_text}
            </ListItem>
        );
    });
};


  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '50vh',
        overflow: 'auto',
        backgroundColor: '#e0e0e0', // Fondo claro o podrías usar una imagen
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
    }}>
        <List ref={chatListRef} sx={{
            height: '100%',
            overflowY: 'auto',
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: '10px',
            backgroundColor: 'inherit',
            borderRadius: '10px',
        }}>
            {displayChatHistory()}
        </List>

        <div style={{ display: 'flex', marginTop: '8px', alignItems: 'center' }}>
            <TextField
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                sx={{ flex: 1, marginRight: '8px', backgroundColor:'white' }}
            />

            <Button variant="contained" onClick={handleMessageSend} sx={{
                borderRadius: '20px',
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'darkgray'
                }
            }}>
                Send
            </Button>
        </div>
    </div>
);
};

export default ChatWeb;