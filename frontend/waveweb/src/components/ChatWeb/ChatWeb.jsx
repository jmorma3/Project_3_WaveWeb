import "./ChatWeb.css"

import * as React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ChatWeb = ({ isOpen, onClose, chatHistory, onSendMessage, isMobile }) => {
  const [messageInput, setMessageInput] = React.useState('');

  const handleMessageSend = () => {
    if (messageInput.trim() !== '') {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <List sx={{ width: isMobile ? '100%' : 400 }}>
        <ListItem>
          {isMobile && (
            <IconButton edge="end" onClick={onClose} sx={{ marginLeft: 'auto' }}>
              <CloseIcon />
            </IconButton>
          )}
          <ListItemText primary="Chat" />
        </ListItem>
        <div sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {/* Aquí renderiza tu historial de chat */}
          {chatHistory.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </div>
        <ListItem>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleMessageSend}>
            Send
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

const OpenChatButton = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleOpenChat} sx={{display: { xs: 'none', md: "flex"}}}>
        Open Chat
      </Button>
      <ChatWeb
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        chatHistory={['Hello!', 'How can I help you?']}
        onSendMessage={(message) => console.log(`Sending message: ${message}`)}
        
      />
    </div>
  );
};

export default OpenChatButton;
