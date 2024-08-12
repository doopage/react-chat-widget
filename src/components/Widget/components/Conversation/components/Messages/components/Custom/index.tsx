import { MessageTypes } from '@types';

import './styles.scss';
import React from 'react';
import Status from '../Status';

export type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  className: string;
  children?: React.ReactNode;
}

function Message({ message, showTimeStamp, className, children }: Props) {
  return (
    <Status message={message} showTimeStamp={showTimeStamp} showStatus>
      <div className={`rcw-message-custom ${className}`}>
        {children}
      </div>
    </Status>
  );
}

export default Message;
