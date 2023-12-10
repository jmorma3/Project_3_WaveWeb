import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { getProjectMessages, sendNewChatMessage } from '../../services/chatMessageService';

import { useParams } from 'react-router-dom';

const ChatWeb = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProjectMessages(projectId);
      setChatHistory(result);
    };
    fetchData();
  }, [projectId]);

  const handleMessageSend = async () => {
    try {
      if (messageInput.trim() !== '') {
        const newMessage = await sendNewChatMessage(projectId, messageInput);
        
        if (newMessage) {
          // Actualizar el estado de chatHistory con el nuevo mensaje
          setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
          setMessageInput('');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', borderTop: '1px solid #ccc', backgroundColor: '#fff' }}>
      <List sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
        {/* Mostrar historial de mensajes */}
        {chatHistory.map((message) => (
          <ListItem key={message.id}>
            {message.message_text}
            {/* (sent at {message.message_time} {message.message_date} by user: {message.userId}) */}
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', marginTop: '8px' }}>
        <TextField
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          sx={{ flex: 1, marginRight: '8px' }}
        />
        <Button variant="contained" onClick={handleMessageSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWeb;
