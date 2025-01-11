import { useEffect, useRef } from 'react';
import format from 'date-fns/format';

import { scrollToBottom } from '@utils/messages';
import { Message } from '@types';
import { markAllMessagesRead, setBadgeCount } from '@actions';
import { MESSAGE_SENDER } from '@constants';

import Loader from './components/Loader';
import Suggestions, { CProps as SuggestionsProps } from './components/Suggestions';
import ContextMenu from './components/Toolbar/context-menu';
import './styles.scss';
import { useSelector } from '@selectors';
import { Snapshot } from '@utils/types';

export type CProps = {
  showTimeStamp?: boolean,
  reply?: boolean;
  reaction?: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  suggestionsProps?: SuggestionsProps;
}

export type RenderOptions = {
  showTimeStamp?: boolean;
  reply?: boolean;
  reaction?: boolean;
  isReplyContext?: boolean;
}

export const getComponentToRender = (message: Snapshot<Message>, opts?: RenderOptions) => {
  const ComponentToRender = message.component;
  if (message.type === 'component') {
    return <ComponentToRender {...message.props} />;
  }
  return <ComponentToRender message={message} {...opts} />;
};

function Messages({ profileAvatar, profileClientAvatar, showTimeStamp = true, reply, reaction, suggestionsProps }: CProps) {
  const { messages, typing, showChat, badgeCount, showSuggestion } = useSelector(({ behavior, messages, suggestions }) => ({
    messages: messages.messages,
    badgeCount: messages.badgeCount,
    typing: behavior.messageLoader,
    showChat: behavior.showChat,
    showSuggestion: suggestions.showSuggestion
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount) markAllMessagesRead();
    else setBadgeCount(messages.filter((message) => message.unread).length);
  }, [messages, badgeCount, showChat]);

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  const isClient = (sender) => sender === MESSAGE_SENDER.CLIENT;

  return (
    <div id="rcw-messages" className="rcw-messages-container" ref={messageRef}>
      <ContextMenu reply={reply} reaction={reaction} />
      {messages?.map((message, index) =>
        <div className={`rcw-message ${isClient(message.sender) ? 'rcw-message-client' : ''}`}
             key={`${index}-${format(message.timestamp, 'hh:mm')}`}>
          {((profileAvatar && !isClient(message.sender)) || (profileClientAvatar && isClient(message.sender))) &&
            message.showAvatar &&
            <img
              src={message.profileAvatar ?? (isClient(message.sender) ? profileClientAvatar : profileAvatar)}
              className={`rcw-avatar ${isClient(message.sender) ? 'rcw-avatar-client' : ''}`}
              alt="profile"
            />
          }
          {getComponentToRender(message, { reply, reaction, showTimeStamp })}
        </div>
      )}
      <Loader typing={typing} />
      <div style={{ flexGrow: 1 }} />
      {showSuggestion && <Suggestions {...suggestionsProps} />}
    </div>
  );
}

export default Messages;
