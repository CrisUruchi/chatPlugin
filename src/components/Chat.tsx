import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { sendMessage } from '../api';
import { v4 as uuidv4 } from 'uuid';
import { useChatContext } from '../context/ChatContext';
import { joinThread, subscribeToMessages, connectSocket } from '../api/websocket';

interface ChatProps {
  userName: string;
  helpText: string;
}

const Chat: React.FC<ChatProps> = ({ userName, helpText }) => {
  const [messages, setMessages] = useState<{ id: String; user: string; text: string; time: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Ref para el input
  const { toFrom } = useChatContext();

  useEffect(() => {
    connectSocket().then(() => {
      setIsConnected(true);
      joinThread(toFrom);
      subscribeToMessages((message) => {
        const newMessage = {
          id: message.refId || message.id,
          user: message.type === 'outgoing' ? 'Agent' : userName,
          text: message.message,
          time: new Date(message.dateCreated).toLocaleTimeString(),
        };
      
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some((msg) => msg.id === newMessage.id);
          if (!messageExists) {
            return [newMessage, ...prevMessages];
          }
          return prevMessages;
        });
        if (message.type === 'outgoing') {
          setIsSending(false);
          inputRef.current?.focus(); // Enfocar el input cuando se deshabilita el envío
        }
      });
      inputRef.current?.focus(); // Enfocar el input cuando se conecta
    });
    
    return () => {
      //socket.disconnect();
    };
  }, [toFrom, userName]);

  const handleSend = async (text: string) => {
    setIsSending(true); // Bloquea el botón e input
    const newMessage = {
      id: uuidv4(),
      user: userName,
      text,
      time: new Date().toLocaleTimeString(),
    };
    await sendMessage(toFrom, newMessage.id, newMessage.text);
    setMessages([newMessage, ...messages]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '95%',
        padding: '0',
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', margin: '16px 0' }}>
        <ChatWindow messages={messages} helpText={helpText} />
      </Box>
      <Box mt={2} sx={{ paddingBottom: '16px' }}>
        <ChatInput onSend={handleSend} disabled={!isConnected || isSending} inputRef={inputRef} />
      </Box>
    </Box>
  );
};

export default Chat;
