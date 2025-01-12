import { MessageTypes } from '@types';
import React from 'react';
import Status from '../Status';
import Toolbar from '../Toolbar';
import { useSelector } from '@selectors';
import './styles.scss';

export type Props = {
  message: MessageTypes;
  showTimeStamp?: boolean;
  reply?: boolean;
  reaction?: boolean;
  className: string;
  children?: React.ReactNode;
}

function Message({ message, showTimeStamp, reply, reaction, className, children }: Props) {
  const locale = useSelector(({ messages }) => messages?.statusLocale);

  return (
    <Status message={message} showTimeStamp={!!showTimeStamp} locale={locale} showStatus>
      <Toolbar message={message} reply={reply} reaction={reaction}>
        <div className={`rcw-message-custom ${className}`}>
          {children}
        </div>
      </Toolbar>
    </Status>
  );
}

export default Message;
