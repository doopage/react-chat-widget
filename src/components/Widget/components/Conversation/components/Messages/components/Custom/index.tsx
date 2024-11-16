import { MessageTypes } from '@types';

import './styles.scss';
import React from 'react';
import Status from '../Status';
import { useSelector } from '@selectors';

export type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  className: string;
  children?: React.ReactNode;
}

function Message({ message, showTimeStamp, className, children }: Props) {
  const locale = useSelector(({ messages }) => messages?.statusLocale);

  return (
    <Status message={message} showTimeStamp={showTimeStamp} locale={locale} showStatus>
      <div className={`rcw-message-custom ${className}`}>
        {children}
      </div>
    </Status>
  );
}

export default Message;
