import React, { useState } from 'react';
import { Message } from '@types';

export type CProps = {
  message: Message;
  children: React.ReactElement;
}

export type MessageAPI = Message & {
  isShow: boolean;
  hide(): void;
}

export const MessageContext = React.createContext<MessageAPI>({} as MessageAPI);

function createAPI(message: Message): MessageAPI {
  const [isShow, setShow] = useState(!!message);

  return {
    ...message,
    isShow,
    hide() {
      setShow(false);
    }
  };
}

function MessageWithContext({ message, children }: CProps) {
  const state = createAPI(message);
  return state.isShow && <MessageContext.Provider value={state}>{children}</MessageContext.Provider>;
}

export default MessageWithContext;
