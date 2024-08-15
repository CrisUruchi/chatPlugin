import React, { useState, RefObject, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, inputRef }) => {
  const [text, setText] = useState('');

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus(); // Forzar el enfoque cuando no está deshabilitado
    }
  }, [disabled, inputRef]);

  return (
    <Box display="flex">
      <TextField
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            handleSendClick();
            e.preventDefault();
          }
        }}
        disabled={disabled}
        inputRef={inputRef} // Aplica la referencia al input
      />
      <Button variant="contained" color="primary" onClick={handleSendClick} disabled={disabled}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
