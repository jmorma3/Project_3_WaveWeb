import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
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
    return chatHistory.map((message, index) => (
      <ListItem
        key={message.id || index} //Con esto resolvimos el "warning" que aparecía con la key única para cada child al renderizar el chatHistory ("message.id") estaba dando problemas. 
        sx={{
          margin: "2px",
          border: "1px solid",
          borderRadius: "15px",
          width: "fit-content",
          backgroundColor: `${parseInt(localStorage.getItem("userId")) === message.userId ? 'lightblue' : 'white'}`,
          alignSelf: `${parseInt(localStorage.getItem("userId")) === message.userId ? 'flex-end' : 'flex-start'}`
        }}
      >
        {message.message_text}
        {parseInt(localStorage.getItem("userId")) === message.userId ? " (sent by me)" : ""}

      </ListItem>
    ));
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', borderTop: '1px solid #ccc', backgroundColor: '#fff' }}>
      <List ref={chatListRef} sx={{ maxHeight: '25vh', overflowY: 'auto', display: "flex", flexDirection: "column" }}>
        {displayChatHistory()}
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
