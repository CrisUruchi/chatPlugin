import React, { useState } from 'react';
import { Box, Button, Drawer, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chat from './Chat';
import translations from '../translations';
import { useChatContext } from '../context/ChatContext';

interface FloatingChatButtonProps {
  buttonText?: string;
  buttonIcon?: React.ReactElement;
  language?: 'en' | 'es';
  userName: string;
  helpText: string;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ buttonText, buttonIcon, language = 'en', userName, helpText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const { generateToFrom } = useChatContext();

  const toggleDrawer = (open: boolean) => () => {
    generateToFrom();
    setIsOpen(open);
  };

  const t = translations[language];
  const icon = buttonIcon || <ChatIcon />;

  const drawerHeight = `calc(100vh - 100px)`;
  const drawerWidth = isLargeScreen ? '400px' : '300px';

  return (
    <>
      {!isOpen && (
        <Box position="fixed" bottom={16} right={16} zIndex={1300}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(true)}
            startIcon={icon}
          >
            {buttonText || t.chatButtonText}
          </Button>
        </Box>
      )}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            height: drawerHeight,
            width: drawerWidth,
            top: 'auto',
            bottom: 0,
          },
        }}
      >
        <Box
          p={2}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{t.chatTitle}</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Chat userName={userName} helpText={helpText} />
        </Box>
      </Drawer>
    </>
  );
};

export default FloatingChatButton;
