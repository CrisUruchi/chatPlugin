import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box display="flex" mt={2} sx={{ padding: '0 8px' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        sx={{ marginRight: '8px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
