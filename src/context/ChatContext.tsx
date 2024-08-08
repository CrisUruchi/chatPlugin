import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextProps {
  toFrom: string;
  generateToFrom: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [toFrom, setToFrom] = useState<string>('');

  const generateToFrom = () => {
    if (!toFrom) {
      setToFrom(uuidv4());
    }
  };

  return (
    <ChatContext.Provider value={{ toFrom, generateToFrom }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
