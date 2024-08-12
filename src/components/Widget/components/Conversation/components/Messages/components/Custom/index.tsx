import { MessageTypes } from '@types';

import './styles.scss';
import React from 'react';
import Status from '../Status';

export type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  children?: React.ReactNode;
}

function Message({ message, showTimeStamp, children }: Props) {
  return (
    <Status message={message} showTimeStamp={showTimeStamp} showStatus>
      <div className="rcw-message-custom">
        {children}
      </div>
    </Status>
  );
}

export default Message;
