import React, { useState } from 'react';
import FloatingChatButton from './components/FloatingChatButton';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ChatProvider } from './context/ChatContext';

interface AppProps {
  primaryColor: string;
  secondaryColor: string;
  buttonText?: string;
  buttonIcon?: React.ReactElement;
  language?: 'en' | 'es';
  userName: string;
  helpText: string;
}

const App: React.FC<AppProps> = ({ primaryColor, secondaryColor, buttonText, buttonIcon, language, userName, helpText }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatProvider>
        <FloatingChatButton
          buttonText={buttonText}
          buttonIcon={buttonIcon}
          language={language}
          userName={userName}
          helpText={helpText}
        />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
