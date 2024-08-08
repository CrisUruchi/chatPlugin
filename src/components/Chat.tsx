import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { sendMessage } from '../api';
import { v4 as uuidv4 } from 'uuid';
import { useChatContext } from '../context/ChatContext';
import { connectSocket, sendMessage as sendWebSocketMessage } from '../api/websocket';

interface ChatProps {
  userName: string;
  helpText: string;
}

const Chat: React.FC<ChatProps> = ({ userName, helpText }) => {
  const [messages, setMessages] = useState<{ user: string; text: string; time: string }[]>([]);
  const { toFrom } = useChatContext();

  useEffect(() => {
    connectSocket();

    return () => {
      //socket.disconnect(); // Desconectar el socket cuando el componente se desmonte si es necesario
    };
  }, []);

  const handleSend = async (text: string) => {
    const newMessage = {
      id: uuidv4(),
      user: userName,
      text,
      time: new Date().toLocaleTimeString(),
    };
    await sendMessage(toFrom, newMessage.id, newMessage.text);
    setMessages([...messages, newMessage]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        padding: '0',
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', margin: '16px 0' }}>
        <ChatWindow messages={messages} helpText={helpText} />
      </Box>
      <Box mt={2} sx={{ paddingBottom: '16px' }}>
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  );
};

export default Chat;

