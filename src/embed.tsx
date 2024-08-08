import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeTokens } from './api';

interface EmbedOptions {
  primaryColor: string;
  secondaryColor: string;
  buttonText?: string;
  buttonIcon?: React.ReactElement;
  language?: 'en' | 'es';
  userName: string;
  helpText: string;
  accessToken: string;
  refreshToken: string;
}

declare global {
  interface Window {
    createChatPlugin: (elementId: string, options: EmbedOptions) => void;
  }
}

window.createChatPlugin = (elementId: string, options: EmbedOptions) => {
  const container = document.getElementById(elementId);
  if (!container) return;

  initializeTokens(options.accessToken, options.refreshToken);

  const root = createRoot(container);
  const {
    primaryColor,
    secondaryColor,
    buttonText,
    buttonIcon,
    language,
    userName,
    helpText
  } = options;

  root.render(
    <App 
      primaryColor={primaryColor} 
      secondaryColor={secondaryColor} 
      buttonText={buttonText}
      buttonIcon={buttonIcon}
      language={language}
      userName={userName}
      helpText={helpText}
    />
  );
};
