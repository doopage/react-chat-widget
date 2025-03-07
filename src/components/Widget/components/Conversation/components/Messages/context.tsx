import React from 'react';
import { Message } from '@types';

export type CProps = {
  message: Message;
  children: React.ReactElement;
}

export type MessageAPI = Message & {}

export const MessageContext = React.createContext<MessageAPI>({} as Message);

function createAPI(message: Message): MessageAPI {
  return message;
}

function MessageWithContext({ message, children }: CProps) {
  return message && <MessageContext.Provider value={createAPI(message)}>{children}</MessageContext.Provider>;
}

export default MessageWithContext;
