import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ChatWindowProps {
  messages: { user: string; text: string; time: string }[];
  helpText: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, helpText }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        overflowY: 'auto',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundImage: `url('https://www.fakewhats.com/images/iphone/app-bg.jpg')`,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0))',
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(to top, #fff, rgba(255, 255, 255, 0))',
        },
      }}
    >
      {messages.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          {helpText}
        </Typography>
      ) : (
        messages.map((msg, index) => (
          <Box
            key={index}
            mb={2}
            sx={{
              display: 'flex',
              justifyContent: msg.user === 'Agent' ? 'flex-start' : 'flex-end',
            }}
          >
            <Box
              sx={{
                maxWidth: '60%',
                bgcolor: msg.user === 'Agent' ? 'grey.200' : 'primary.main',
                color: msg.user === 'Agent' ? 'text.primary' : 'primary.contrastText',
                borderRadius: '8px',
                padding: '8px',
                textAlign: msg.user === 'Agent' ? 'left' : 'right',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {msg.user} - {msg.time}
              </Typography>
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
          </Box>
        ))
      )}
    </Paper>
  );
};

export default ChatWindow;
